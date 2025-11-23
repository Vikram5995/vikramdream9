import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Player } from '@/types/player'
import { Button } from '@/components/ui/button'
import { Users, BirdIcon as Cricket, CircleDot, BellIcon as Ball } from 'lucide-react'

interface SelectedTeamProps {
  players: Player[]
  onRemovePlayer: (player: Player) => void
  totalPrice: number
}

export default function SelectedTeam({ players, onRemovePlayer, totalPrice }: SelectedTeamProps) {
  const sortedPlayers = [
    ...players.filter(p => p.gender === 'female').sort((a, b) => b.price - a.price),
    ...players.filter(p => p.gender === 'male' && p.type === 'batter').sort((a, b) => b.price - a.price),
    ...players.filter(p => p.gender === 'male' && p.type === 'allrounder').sort((a, b) => b.price - a.price),
    ...players.filter(p => p.gender === 'male' && p.type === 'bowler').sort((a, b) => b.price - a.price),
  ]

  const getPlayerIcon = (player: Player) => {
    if (player.gender === 'female') return <Users className="w-4 h-4 text-pink-500" />
    switch (player.type) {
      case 'batter': return <Cricket className="w-4 h-4 text-blue-500" />
      case 'allrounder': return <CircleDot className="w-4 h-4 text-purple-500" />
      case 'bowler': return <Ball className="w-4 h-4 text-green-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold p-4 border-b text-blue-800">Your Dream 9</h2>
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price (Rs)</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player) => (
              <TableRow key={player.id}>
                <TableCell>
                  <div className="flex items-center">
                    {getPlayerIcon(player)}
                    <span className="ml-2">{player.name}</span>
                  </div>
                </TableCell>
                <TableCell>{player.price}</TableCell>
                <TableCell>
                  <Button onClick={() => onRemovePlayer(player)} variant="destructive" size="sm">Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="p-4 border-t bg-blue-50">
        <p className="text-xl font-semibold text-blue-800">Total: Rs {totalPrice}</p>
        <p className="text-sm text-gray-600">
          {players.length} / 9 players selected
        </p>
      </div>
    </div>
  )
}

