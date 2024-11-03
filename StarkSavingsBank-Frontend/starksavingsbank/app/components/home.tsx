'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Shield, Sword, Castle, Coins, Scroll, Book, Sun, Moon, Snowflake, Wind } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const houses = [
  { name: 'Stark', sigil: '🐺', color: 'from-gray-700 to-blue-900' },
  { name: 'Lannister', sigil: '🦁', color: 'from-red-900 to-yellow-600' },
  { name: 'Targaryen', sigil: '🐉', color: 'from-red-800 to-black' },
  { name: 'Baratheon', sigil: '🦌', color: 'from-yellow-900 to-black' },
]

const services = [
  { icon: Shield, name: 'Stark Shield Savings', description: 'Protect your gold like a Stark protects the North', house: 'Stark' },
  { icon: Sword, name: 'Valyrian Steel Investments', description: 'Rare and valuable, just like your portfolio', house: 'Targaryen' },
  { icon: Castle, name: 'Winterfell Mortgages', description: 'Your castle is your home, let us help you secure it', house: 'Stark' },
  { icon: Coins, name: 'Lannister Loans', description: 'A Lannister always pays their debts, and so will you', house: 'Lannister' },
  { icon: Scroll, name: 'Raven Retirement Plans', description: 'Ancient wisdom for your golden years', house: 'Stark' },
  { icon: Book, name: "Maester's Education Funding", description: "Invest in knowledge, it's the key to the Citadel", house: 'Baratheon' },
]

const seasonConfig = {
  summer: { icon: Sun, text: 'Summer', color: 'text-yellow-400', bg: 'from-yellow-600 to-red-800' },
  winter: { icon: Snowflake, text: 'Winter', color: 'text-blue-300', bg: 'from-blue-900 to-gray-900' },
  spring: { icon: Wind, text: 'Spring', color: 'text-green-400', bg: 'from-green-700 to-blue-800' },
  autumn: { icon: Moon, text: 'Autumn', color: 'text-orange-400', bg: 'from-orange-700 to-red-900' },
}

export default function Home() {
  const [currentSeason, setCurrentSeason] = useState<keyof typeof seasonConfig>('summer')
  const [currentHouse, setCurrentHouse] = useState(houses[0])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', description: '', house: '' })

  useEffect(() => {
    const seasonInterval = setInterval(() => {
      setCurrentSeason(prev => {
        const seasons = Object.keys(seasonConfig) as (keyof typeof seasonConfig)[]
        const currentIndex = seasons.indexOf(prev)
        return seasons[(currentIndex + 1) % seasons.length]
      })
    }, 30000) // Change season every 30 seconds

    const houseInterval = setInterval(() => {
      setCurrentHouse(prev => {
        const currentIndex = houses.indexOf(prev)
        return houses[(currentIndex + 1) % houses.length]
      })
    }, 30000) // Change house every 10 seconds

    return () => {
      clearInterval(seasonInterval)
      clearInterval(houseInterval)
    }
  }, [])

  const SeasonIcon = seasonConfig[currentSeason].icon

  return (
    <div className={`min-h-screen bg-gradient-to-br ${seasonConfig[currentSeason].bg} text-gray-100 relative transition-all duration-1000`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image
          src="https://static1.srcdn.com/wordpress/wp-content/uploads/2019/04/GoT-Winterfell-Castle.jpg"
          alt="Winterfell Castle"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl mb-4">
            <span className="block">StarkSavingsBank</span>
            <span className="block text-3xl mt-2">Where Your Coin Grows Stronger Than Valyrian Steel</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            In the game of loans, you win or you default. Choose wisely with StarkSavingsBank.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div 
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${houses.find(h => h.name === service.house)?.color} p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300`}
              onClick={() => {
                setModalContent({ title: service.name, description: service.description, house: service.house })
                setShowModal(true)
              }}
            >
              <service.icon className="h-10 w-10 mb-4 text-white" />
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-200">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black bg-opacity-50 p-8 rounded-lg shadow-xl mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">The Iron Bank Has Nothing on Us</h2>
          <p className="text-lg mb-6">
            At StarkSavingsBank, we understand that {currentSeason} is always coming. Our vaults are as secure as the Wall, our interest rates sharper than Valyrian steel, and our customer service more loyal than a direwolf.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 mr-4 text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold">Secure as the Wall</h3>
                <p className="text-gray-300">Protected by the Night&apos;s Watch of finance</p>
              </div>
            </div>
            <div className="flex items-center">
              <Scroll className="h-8 w-8 mr-4 text-green-400" />
              <div>
                <h3 className="text-xl font-semibold">Growth like a Weirwood</h3>
                <p className="text-gray-300">Your wealth, deeply rooted and ever-growing</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-2xl font-bold mb-4">The Realm&apos;s Current State</p>
          <div className="flex justify-center items-center space-x-8">
            <div>
              <p className="text-lg">Season</p>
              <div className="flex items-center justify-center mt-2">
                <SeasonIcon className={`h-10 w-10 ${seasonConfig[currentSeason].color}`} />
                <span className="ml-2 text-xl">{seasonConfig[currentSeason].text}</span>
              </div>
            </div>
            <div>
              <p className="text-lg">Ruling House</p>
              <div className="flex items-center justify-center mt-2">
                <span className="text-4xl mr-2">{currentHouse.sigil}</span>
                <span className="text-xl">{currentHouse.name}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-gradient-to-br ${houses.find(h => h.name === modalContent.house)?.color}`}
              >
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
                        {modalContent.title}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-300">
                          {modalContent.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}