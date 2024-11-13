'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Skull, Swords, BirdIcon as Dragon, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type ErrorType = {
  status: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const errorTypes: ErrorType[] = [
  { 
    status: 404, 
    title: "Lost in the Crypts of Winterfell", 
    description: "The page you seek is as elusive as Arya Stark. Perhaps it's wearing a different face?", 
    icon: Skull 
  },
  { 
    status: 500, 
    title: "The Server Kinda Forgot", 
    description: "Our ravens encountered a storm worse than the one that sunk Daenerys' fleet. We're working on it!", 
    icon: Dragon 
  },
  { 
    status: 403, 
    title: "The Night's Watch Stands Guard", 
    description: "You shall not pass! This resource is more protected than the Wall itself.", 
    icon: Swords 
  }
]

const defaultError: ErrorType = { 
  status: 0, 
  title: "Winter Came for Our Servers", 
  description: "An unknown error has occurred. Our maesters are consulting the ancient scrolls to find a solution.", 
  icon: Shield 
}

export default function GlobalExceptionPage({ status = 0 }: { status?: number }) {
  const [currentError, setCurrentError] = useState<ErrorType>(defaultError)
  const [backgroundImage, setBackgroundImage] = useState('/assets/winterfell_castle.jpg')

  useEffect(() => {
    const error = errorTypes.find(e => e.status === status) || defaultError
    setCurrentError(error)
  }, [status])

  useEffect(() => {
    const images = [
      '/assets/winterfell_castle.jpg',
      '/assets/Kings_Landing.jpg',
      '/assets/dragonstone.jpg',
      '/assets/The_wall.jpg',
      '/assets/Winterfell_North.jpeg'
    ]
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length
      setBackgroundImage(images[currentIndex])
    }, 10000) // Change background every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-black bg-opacity-70 p-10 rounded-xl shadow-2xl relative overflow-hidden border border-gray-700"
      >
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <currentError.icon className="h-20 w-20 text-red-500" />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            {currentError.title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            {currentError.description}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <AnimatePresence>
            <motion.div
              key={currentError.status}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-md bg-gray-800 p-4">
                <div className="flex">
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-gray-300">Error Code: {currentError.status || 'Unknown'}</p>
                    <p className="mt-3 text-sm md:mt-0 md:ml-6">
                      <Link href="/" className="whitespace-nowrap font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200">
                        Return to the Great Hall
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-red-500 rounded-full opacity-20 blur-2xl"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center relative z-10"
        >
          <Link href="/login" className="inline-flex items-center text-sm text-gray-400 hover:text-gray-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}