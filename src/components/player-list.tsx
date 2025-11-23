import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Player } from '@/types/player'
import { Button } from '@/components/ui/button'
import { Users, BirdIcon as Cricket, CircleDot, BellIcon as Ball } from 'lucide-react'

interface PlayerListProps {
  players: Player[]
  onSelectPlayer: (player: Player) => void
}

export default function PlayerList({ players, onSelectPlayer }: PlayerListProps) {
  const femalePlayers = players.filter(p => p.gender === 'female').sort((a, b) => b.price - a.price)
  const maleBatters = players.filter(p => p.gender === 'male' && p.type === 'batter').sort((a, b) => b.price - a.price)
  const maleAllrounders = players.filter(p => p.gender === 'male' && p.type === 'allrounder').sort((a, b) => b.price - a.price)
  const maleBowlers = players.filter(p => p.gender === 'male' && p.type === 'bowler').sort((a, b) => b.price - a.price)

  const getPlayerIcon = (player: Player) => {
    if (player.gender === 'female') return <Users className="w-4 h-4 text-pink-500" />
    switch (player.type) {
      case 'batter': return <Cricket className="w-4 h-4 text-blue-500" />
      case 'allrounder': return <CircleDot className="w-4 h-4 text-purple-500" />
      case 'bowler': return <Ball className="w-4 h-4 text-green-500" />
    }
  }

  const renderPlayerSection = (sectionPlayers: Player[], title: string, icon: React.ReactNode, bgColor: string, minMax?: string) => (
    <div className={`mb-6 p-4 rounded-lg ${bgColor}`}>
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-xl font-semibold ml-2">{title}</h3>
      </div>
      {minMax && <p className="text-sm text-gray-600 mb-2">{minMax}</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price (Rs)</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sectionPlayers.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <div className="flex items-center">
                  {getPlayerIcon(player)}
                  <span className="ml-2">{player.name}</span>
                </div>
              </TableCell>
              <TableCell>{player.price}</TableCell>
              <TableCell>
                <Button onClick={() => onSelectPlayer(player)} size="sm" className="bg-blue-500 hover:bg-blue-600">Select</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Available Players</h2>
      <ScrollArea className="h-[600px] pr-4">
        {renderPlayerSection(femalePlayers, "Female Players", <Users className="w-6 h-6 text-pink-500" />, "bg-pink-50", "Min: 2")}
        {renderPlayerSection(maleBatters, "Batters", <Cricket className="w-6 h-6 text-blue-500" />, "bg-blue-50", "Min: 2")}
        {renderPlayerSection(maleAllrounders, "All-rounders", <CircleDot className="w-6 h-6 text-purple-500" />, "bg-purple-50", "Max: 2")}
        {renderPlayerSection(maleBowlers, "Bowlers", <Ball className="w-6 h-6 text-green-500" />, "bg-green-50", "Min: 2")}
      </ScrollArea>
    </div>
  )
}

