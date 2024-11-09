'use client'

import { SetStateAction, useState } from 'react'
import { motion } from 'framer-motion'
import { Coins, Landmark, Building, MapPin, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AppConstants } from '../constants/app.constants'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const accountTypes = [
  { id: 'savings', name: 'Savings', icon: Coins, description: 'For the long winter' },
  { id: 'investment', name: 'Investment', icon: Landmark, description: 'Grow your wealth like a Lannister' },
  { id: 'checking', name: 'Checking', icon: Building, description: 'For your daily ravens and provisions' },
]

const branches = [
  { id: 'winterfell', name: 'Winterfell', address: 'The Great Keep, Winterfell, The North' },
  { id: 'kings-landing', name: "King's Landing", address: "The Red Keep, Aegon's Hill, King's Landing" },
  { id: 'casterly-rock', name: 'Casterly Rock', address: 'The Golden Gallery, Casterly Rock, Westerlands' },
  { id: 'riverrun', name: 'Riverrun', address: 'The Water Gardens, Riverrun, Riverlands' },
  { id: 'eyrie', name: 'The Eyrie', address: 'Sky Cells Tower, The Eyrie, The Vale' },
  { id: 'sunspear', name: 'Sunspear', address: 'Tower of the Sun, Sunspear, Dorne' },
  { id: 'pyke', name: 'Pyke', address: 'Sea Tower, Pyke, Iron Islands' },
]

export default function PostRegistration() {
  const [deposit, setDeposit] = useState('')
  const [accountType, setAccountType] = useState('')
  const [branch, setBranch] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!deposit || !accountType || !branch) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all fields before proceeding.",
        variant: "destructive",
      })
      return
    }

    try {
      // Here you would typically make an API call to save the account details
      // For demonstration, we'll just simulate a successful account creation
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      
      toast({
        title: "Account Created Successfully",
        description: "Welcome to the Stark Savings Bank!",
      })
      
      router.push('/dashboard') // Redirect to dashboard after successful account creation
    } catch (error) {
      toast({
        title: "Error Creating Account",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-2xl relative overflow-hidden border border-gray-700"
      >
        <div className="relative z-10">
          <h2 className="text-center text-3xl font-extrabold text-gray-100 mb-2">
            Welcome to the Stark Savings Bank
          </h2>
          <p className="text-center text-sm text-gray-400 mb-8">
            Let&apos;s set up your account in the realm
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deposit" className="text-gray-300">Initial Deposit (in Gold Dragons)</Label>
              <Input
                id="deposit"
                type="number"
                placeholder="Enter amount"
                value={deposit}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setDeposit(e.target.value)}
                className="bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Choose Your Branch</Label>
              <Select onValueChange={setBranch}>
                <SelectTrigger className="bg-gray-700 text-gray-100 border-gray-600">
                  <SelectValue placeholder="Select a branch" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                  {branches.map((b) => (
                    <SelectItem key={b.id} value={b.id} className="focus:bg-gray-700">
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{b.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {branch && (
                <p className="text-xs text-gray-400 mt-1">
                  {branches.find(b => b.id === branch)?.address}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Account Type</Label>
            <RadioGroup onValueChange={setAccountType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {accountTypes.map((type) => (
                <div key={type.id}>
                  <RadioGroupItem
                    value={type.id}
                    id={type.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={type.id}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-800 p-4 hover:bg-gray-700 hover:border-gray-600 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-900/20 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-900/20"
                  >
                    <type.icon className="mb-3 h-6 w-6 text-gray-400" />
                    <div className="font-semibold text-gray-200">{type.name}</div>
                    <div className="text-xs text-gray-400">{type.description}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Open Your Account
          </Button>
        </form>

        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
      </motion.div>
    </div>
  )
}