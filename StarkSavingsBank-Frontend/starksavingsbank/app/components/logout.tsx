'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sword, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [quirkySaying, setQuirkySaying] = useState('')
  const router = useRouter()
  const {isAuthenticated, setIsAuthenticated} = useAuth();

  const quirkySayings = [
    "The North remembers... your session!",
    "A Lannister always pays his debts, but you're all paid up!",
    "You know nothing, Jon Snow oh, you're just logging out.",
    "Hodor! (That means 'Goodbye' in Hodor)",
    "Valar morghulis... but first, valar log-outis!",
    "Winter is coming... time to log out and put on a sweater!",
    "Dracarys! (Don't worry, we're just burning your session tokens)",
  ]

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setQuirkySaying(quirkySayings[Math.floor(Math.random() * quirkySayings.length)])

    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 3000))

    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("userdetails");
    sessionStorage.removeItem("XSRF-TOKEN");
    setIsAuthenticated(false);    
    
    router.push('/home')

  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-xl shadow-2xl relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: "url('/placeholder.svg?height=400&width=400')" }}
        ></div>
        <div className="relative">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Prepare to Ride South
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Are you sure you want to leave Winterfell?
          </p>
        </div>
        
        {!isLoggingOut ? (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-center">
              <Sword className="h-16 w-16 text-blue-500 mr-4" />
              <Shield className="h-16 w-16 text-blue-500" />
            </div>
            <button
              onClick={handleLogout}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Logout (Ride South)
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-white text-center">{quirkySaying}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}