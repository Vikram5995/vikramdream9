import { Player } from '../types/player'
import fs from 'fs'
import path from 'path'

/**
 * Read playerList.csv (repo root) and return an array of Player objects.
 * If count > 0, returns at most `count` players; otherwise returns all players found.
 *
 * This function does synchronous file I/O so it remains a synchronous function
 * matching the original signature.
 */
export function generatePlayers(count: number): Player[] {
  const csvPath = path.resolve(__dirname, '../../playerList.csv')
  try {
    const content = fs.readFileSync(csvPath, 'utf8')
    const lines = content.split(/\r?\n/).filter((l) => l.trim() !== '')
    if (lines.length === 0) return []

    // Remove header
    const header = lines.shift() || ''

    // Helper: parse a CSV row handling quoted fields
    function parseCsvRow(row: string): string[] {
      const fields: string[] = []
      let cur = ''
      let inQuotes = false
      for (let i = 0; i < row.length; i++) {
        const ch = row[i]
        if (ch === '"') {
          // If double quote inside quoted field -> consume next quote as escaped quote
          if (inQuotes && row[i + 1] === '"') {
            cur += '"'
            i++
          } else {
            inQuotes = !inQuotes
          }
        } else if (ch === ',' && !inQuotes) {
          fields.push(cur)
          cur = ''
        } else {
          cur += ch
        }
      }
      fields.push(cur)
      return fields
    }

    const players: Player[] = lines.map((line, idx) => {
      const cols = parseCsvRow(line)
      // Expecting columns: name,price,gender,type
      const name = (cols[0] || '').trim()
      const price = parseInt((cols[1] || '').trim(), 10) || 0
      const genderRaw = (cols[2] || '')
      const typeRaw = (cols[3] || '')

      const gender = genderRaw === 'female' ? 'female' : 'male'
      const type: Player['type'] = typeRaw === 'bowler' ? 'bowler' : (typeRaw === 'allrounder' ? 'allrounder' : 'batter')

      return {
        id: idx + 1,
        name,
        price,
        gender,
        type
      } as Player
    })

    if (count > 0) {
      return players.slice(0, count)
    }
    return players
  } catch (err) {
    // If CSV can't be read, return an empty array to avoid breaking callers.
    // You can change this behaviour to throw or return a default list if desired.
    // eslint-disable-next-line no-console
    console.error(`Unable to read ${csvPath}:`, err)
    return []
  }
}
