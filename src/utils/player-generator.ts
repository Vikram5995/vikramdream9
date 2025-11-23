import { Player } from '../types/player'

/**
 * Synchronously read playerList.csv (Node only) and return an array of Player objects.
 * If count > 0, returns at most `count` players; otherwise returns all players found.
 *
 * NOTE: This function is synchronous and will throw if run in a browser environment.
 */
export function generatePlayers(count: number): Player[] {
  if (typeof window !== 'undefined') {
    throw new Error(
      'generatePlayers is synchronous and only supported in Node. Use generatePlayersAsync in browser environments.'
    )
  }

  // Dynamically require Node modules so bundlers don't try to include them for browser builds
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require('path')

  const csvPath = path.resolve(__dirname, '../../playerList.csv')
  try {
    const content: string = fs.readFileSync(csvPath, 'utf8')
    return parseCsvAndBuildPlayers(content, count)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Unable to read ${csvPath}:`, err)
    return []
  }
}

/**
 * Asynchronously read playerList.csv and return an array of Player objects.
 * Works in both Node and browser environments:
 *  - Node: reads from filesystem relative to repo root
 *  - Browser: fetches /playerList.csv (ensure the CSV is served from your public root)
 */
export async function generatePlayersAsync(count: number): Promise<Player[]> {
  // Browser environment: use fetch
  if (typeof window !== 'undefined' && typeof fetch === 'function') {
    try {
      // Attempt to fetch from public root. Adjust path if your hosting serves it elsewhere.
      const response = await fetch('/playerList.csv')
      if (!response.ok) {
        // If not found at root, try relative path
        const fallback = await fetch('./playerList.csv')
        if (!fallback.ok) {
          // eslint-disable-next-line no-console
          console.error('playerList.csv not found via fetch at /playerList.csv or ./playerList.csv')
          return []
        }
        const fallbackText = await fallback.text()
        return parseCsvAndBuildPlayers(fallbackText, count)
      }
      const text = await response.text()
      return parseCsvAndBuildPlayers(text, count)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error fetching playerList.csv in browser:', err)
      return []
    }
  }

  // Node environment: use fs.promises
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fsPromises = require('fs').promises
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require('path')

  const csvPath = path.resolve(__dirname, '../../playerList.csv')
  try {
    const content: string = await fsPromises.readFile(csvPath, 'utf8')
    return parseCsvAndBuildPlayers(content, count)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Unable to read ${csvPath}:`, err)
    return []
  }
}

/**
 * Shared CSV parsing and Player building logic.
 */
function parseCsvAndBuildPlayers(content: string, count: number): Player[] {
  const lines = content.split(/\r?\n/).filter((l) => l.trim() !== '')
  if (lines.length === 0) return []

  // Remove header
  lines.shift()

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
    const type: Player['type'] =
      typeRaw === 'bowler' ? 'bowler' : typeRaw === 'allrounder' ? 'allrounder' : 'batter'

    return {
      id: idx + 1,
      name,
      price,
      gender,
      type,
    } as Player
  })

  if (count > 0) {
    return players.slice(0, count)
  }
  return players
}
