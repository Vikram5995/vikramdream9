"use client"

import { useState, FormEvent, useEffect } from 'react'
import { Player } from '@/types/player'
import PlayerList from '@/components/player-list'
import SelectedTeam from '@/components/selected-team'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { generatePlayers } from '@/utils/player-generator'
import { submitTeam } from '@/app/actions'
import { BirdIcon as Cricket } from 'lucide-react'

export default function Dream11Clone() {
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([])
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setAvailablePlayers(generatePlayers(66))
  }, [])

  const totalPrice = selectedPlayers.reduce((sum, player) => sum + player.price, 0)

  const handleSelectPlayer = (player: Player) => {
    if (selectedPlayers.length >= 9) {
      toast({
        title: "Team Full",
        description: "You can only select up to 9 players.",
        variant: "destructive",
      })
      return
    }

    if (totalPrice + player.price > 20000) {
      toast({
        title: "Budget Exceeded",
        description: "Total price cannot exceed Rs 20000.",
        variant: "destructive",
      })
      return
    }

    const newSelectedPlayers = [...selectedPlayers, player]
    
    // Check team composition rules
    const femaleCount = newSelectedPlayers.filter(p => p.gender === 'female').length
    const maleBatterCount = newSelectedPlayers.filter(p => p.gender === 'male' && p.type === 'batter').length
    const maleBowlerCount = newSelectedPlayers.filter(p => p.gender === 'male' && p.type === 'bowler').length
    const maleAllrounderCount = newSelectedPlayers.filter(p => p.gender === 'male' && p.type === 'allrounder').length

    if (femaleCount < 2 && player.gender !== 'female' && newSelectedPlayers.length >= 8) {
      toast({
        title: "Team Composition",
        description: "You need at least 2 female players.",
        variant: "destructive",
      })
      return
    }

    if (maleBatterCount < 2 && player.type !== 'batter' && newSelectedPlayers.length >= 8) {
      toast({
        title: "Team Composition",
        description: "You need at least 2 male batters.",
        variant: "destructive",
      })
      return
    }

    if (maleBowlerCount < 2 && player.type !== 'bowler' && newSelectedPlayers.length >= 8) {
      toast({
        title: "Team Composition",
        description: "You need at least 2 male bowlers.",
        variant: "destructive",
      })
      return
    }

    if (maleAllrounderCount > 2 && player.type === 'allrounder' && player.gender === 'male') {
      toast({
        title: "Team Composition",
        description: "You can have a maximum of 2 male all-rounders.",
        variant: "destructive",
      })
      return
    }

    setSelectedPlayers(newSelectedPlayers)
    setAvailablePlayers((prevPlayers) => prevPlayers.filter(p => p.id !== player.id))
  }

  const handleRemovePlayer = (player: Player) => {
    setSelectedPlayers((prevPlayers) => prevPlayers.filter(p => p.id !== player.id))
    setAvailablePlayers((prevPlayers) => [...prevPlayers, player])
  }

  const handleSubmitTeam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedPlayers.length !== 9) {
      toast({
        title: "Invalid Team",
        description: "Please select exactly 9 players.",
        variant: "destructive",
      })
      return
    }

    // Check final team composition
    const femaleCount = selectedPlayers.filter(p => p.gender === 'female').length
    const maleBatterCount = selectedPlayers.filter(p => p.gender === 'male' && p.type === 'batter').length
    const maleBowlerCount = selectedPlayers.filter(p => p.gender === 'male' && p.type === 'bowler').length
    const maleAllrounderCount = selectedPlayers.filter(p => p.gender === 'male' && p.type === 'allrounder').length

    if (femaleCount < 2 || maleBatterCount < 2 || maleBowlerCount < 2 || maleAllrounderCount > 2) {
      toast({
        title: "Invalid Team Composition",
        description: "Please ensure your team meets all composition requirements.",
        variant: "destructive",
      })
      return
    }

    if (name.trim() === '') {
      toast({
        title: "Invalid Name",
        description: "Please enter your name.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await submitTeam(selectedPlayers, name, password)
      if (result.success) {
        toast({
          title: result.data.isNewTeam ? "Team Created" : "Team Updated",
          description: result.data.isNewTeam 
            ? "Your team has been successfully created!" 
            : "Your team has been successfully updated!",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Cricket className="w-12 h-12 text-blue-600 mr-2" />
          <h1 className="text-4xl font-bold text-blue-800">Risk-Tech Premier League</h1>
        </div>
        <p className="text-xl text-purple-700">Build Your Dream Team</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SelectedTeam 
          players={selectedPlayers} 
          onRemovePlayer={handleRemovePlayer}
          totalPrice={totalPrice}
        />
        <PlayerList players={availablePlayers} onSelectPlayer={handleSelectPlayer} />
      </div>
      <form onSubmit={handleSubmitTeam} className="mt-8 space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="mt-1"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1"
            />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
          Submit Team
        </Button>
      </form>
    </div>
  )
}

