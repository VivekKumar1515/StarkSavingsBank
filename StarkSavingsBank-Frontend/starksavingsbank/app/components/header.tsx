'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Sun, Moon, Snowflake, Wind } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'The Realm', href: '/home', authRequired: false },
  { name: 'War Room', href: '/dashboard', authRequired: true },
  { name: 'Raven Scrolls', href: '/notices', authRequired: false },
  { name: 'Send a Raven', href: '/contact', authRequired: false },
]

const seasonConfig = {
  summer: { icon: Sun, text: 'Summer', color: 'text-yellow-400' },
  winter: { icon: Snowflake, text: 'Winter', color: 'text-blue-300' },
  spring: { icon: Wind, text: 'Spring', color: 'text-green-400' },
  autumn: { icon: Moon, text: 'Autumn', color: 'text-orange-400' },
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSeason, setCurrentSeason] = useState<keyof typeof seasonConfig>('summer')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSeason(prev => {
        const seasons = Object.keys(seasonConfig) as (keyof typeof seasonConfig)[]
        const currentIndex = seasons.indexOf(prev)
        return seasons[(currentIndex + 1) % seasons.length]
      })
    }, 30000) // Change season every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const SeasonIcon = seasonConfig[currentSeason].icon

  return (
    <header className={`bg-gradient-to-r from-gray-900 to-blue-900 text-gray-100 shadow-lg relative transition-all duration-1000`}>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <motion.div 
                className="relative w-12 h-12"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/assets/stark_sigil.png"
                  alt="StarkSavingsBank"
                  layout='fill'
                  className="rounded-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-blue-500 rounded-full opacity-0"
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.div>
              <span className="ml-3 text-xl font-semibold tracking-wider hidden sm:inline-block">StarkSavingsBank</span>
            </Link>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-4">
                {navItems.map((item) => {
                  if (!isAuthenticated && item.authRequired) return null
                  return (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <motion.a
                          className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item.name}
                        </motion.a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SeasonIcon className={`h-6 w-6 ${seasonConfig[currentSeason].color}`} />
              <span className="text-sm font-medium">{seasonConfig[currentSeason].text} is coming</span>
            </motion.div>
            {isAuthenticated ? (
              <Link href="/logout">
                <motion.a
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ride South (Logout)
                </motion.a>
              </Link>
            ) : (
              <Link href="/login">
                <motion.a
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100 hover:bg-white transition duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enter the Realm (Login)
                </motion.a>
              </Link>
            )}
          </div>
          <div className="flex md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-lg">
              {navItems.map((item) => {
                if (!isAuthenticated && item.authRequired) return null
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.a
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.a>
                  </Link>
                )
              })}
              {isAuthenticated ? (
                <Link href="/logout">
                  <motion.a
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ride South (Logout)
                  </motion.a>
                </Link>
              ) : (
                <Link href="/login">
                  <motion.a
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Enter the Realm (Login)
                  </motion.a>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}