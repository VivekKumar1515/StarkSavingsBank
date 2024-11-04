'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Scroll, Castle, Sword, Shield, Snowflake, Feather, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Contact } from '../model/contact.model'
import { AppConstants } from '../constants/app.constants'
import axios from 'axios'

type ContactFormData = {
  contactName: string
  contactEmail: string
  subject: string
  message: string
  house: string
}

const houses = [
  'Stark',
  'Lannister',
  'Targaryen',
  'Baratheon',
  'Greyjoy',
  'Tyrell',
  'Martell',
  'Tully',
  'Arryn',
  'Bolton',
  'Frey'
]

const houseColors = {
  Stark: 'from-gray-700 to-blue-900',
  Lannister: 'from-red-900 to-yellow-600',
  Targaryen: 'from-red-800 to-black',
  Baratheon: 'from-yellow-900 to-black',
  Greyjoy: 'from-teal-900 to-gray-900',
  Tyrell: 'from-green-900 to-yellow-700',
  Martell: 'from-orange-900 to-red-700',
  Tully: 'from-blue-900 to-red-700',
  Arryn: 'from-blue-800 to-gray-200',
  Bolton: 'from-red-700 to-black',
  Frey: 'from-gray-500 to-blue-800'
}

export default function QuirkyContact() {
  const [contactId, setContactId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>()
  const [positions, setPositions] = useState<number[]>([])

  useEffect(() => {
    const newPositions = Array.from({ length: 20 }, () => Math.random() * 100)
    setPositions(newPositions)
  }, [])

  const selectedHouse = watch('house')

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    const contactData = new Contact(
      undefined,
      data.contactName,
      data.contactEmail,
      data.house,
      data.subject,
      data.message
    )

    try {
      const response = await axios.post(
        `${AppConstants.ROOT_URL}${AppConstants.CONTACT_API_URL}`,
        contactData
      )
      setContactId(`${response.data.house.toUpperCase()}-${response.data.contactId}`)
    } catch (error) {
      console.error('Something went wrong, try again!', error)
    }

    setIsLoading(false)
    reset()
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`min-h-screen ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
        <AnimatePresence>
          {positions.map((left, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute ${isDarkMode ? 'text-blue-200' : 'text-yellow-400'}`}
              initial={{ top: -20, left: `${left}%` }}
              animate={{ top: '100vh' }}
              exit={{ opacity: 0 }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              {isDarkMode ? <Snowflake size={16} /> : <Sun size={16} />}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl font-bold text-center mb-8 font-medieval"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Send a Raven to the Realm
          </motion.h1>

          <motion.div 
            className={`rounded-lg shadow-xl p-8 relative overflow-hidden ${
              isDarkMode ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-80'
            } border-4 ${selectedHouse ? houseColors[selectedHouse] : 'border-gray-700'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {selectedHouse && (
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={`/assets/House_${selectedHouse}.jpeg`}
                  alt={`${selectedHouse} Castle`}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-20"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center space-x-4 transform hover:scale-105 transition-transform"
                  whileHover={{ x: 10 }}
                >
                  <Sword className="h-8 w-8 text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold">Raven&apos;s Call</h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>+7 KINGDOMS 925 89</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-4 transform hover:scale-105 transition-transform"
                  whileHover={{ x: 10 }}
                >
                  <Scroll className="h-8 w-8 text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold">Scroll Delivery</h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>raven@starksavings.west</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-4 transform hover:scale-105 transition-transform"
                  whileHover={{ x: 10 }}
                >
                  <Castle className="h-8 w-8 text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold">Winterfell Citadel</h2>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Beyond the Wall, 10030</p>
                  </div>
                </motion.div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <AnimatePresence>
                  {contactId && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-green-400 text-center p-4 bg-green-900 bg-opacity-50 rounded"
                    >
                      Your raven has taken flight! Scroll ID: {contactId}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <input
                    {...register('contactName', {
                      required: 'Your name is required, even if you\'re No One',
                    })}
                    className={`w-full rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base outline-none py-2 px-4 leading-8 transition-colors duration-200 ease-in-out placeholder-gray-500`}
                    placeholder="Your Name (or alias)"
                    disabled={isLoading || !imageLoaded}
                  />
                  {errors.contactName && (
                    <span className="text-red-500 text-sm">{errors.contactName.message}</span>
                  )}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <input
                    {...register('contactEmail', {
                      required: 'A raven needs to know where to return',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Even a Three-Eyed Raven couldn\'t find this email',
                      },
                    })}
                    className={`w-full rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base outline-none py-2 px-4 leading-8 transition-colors duration-200 ease-in-out placeholder-gray-500`}
                    placeholder="Raven's Return Address (Email)"
                    disabled={isLoading || !imageLoaded}
                  />
                  {errors.contactEmail && (
                    <span className="text-red-500 text-sm">{errors.contactEmail.message}</span>
                  )}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <select
                    {...register('house', { required: 'Choose your allegiance' })}
                    className={`w-full rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base outline-none py-2 px-4 leading-8 transition-colors duration-200 ease-in-out`}
                    disabled={isLoading}
                  >
                    <option value="">Choose Your House</option>
                    {houses.map((house) => (
                      <option key={house} value={house}>
                        {house}
                      </option>
                    ))}
                  </select>
                  {errors.house && (
                    <span className="text-red-500 text-sm">{errors.house.message}</span>
                  )}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <input
                    {...register('subject', { required: 'What is the nature of your raven?' })}
                    className={`w-full rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base outline-none py-2 px-4 leading-8 transition-colors duration-200 ease-in-out placeholder-gray-500`}
                    placeholder="Subject of Your Scroll"
                    disabled={isLoading || !imageLoaded}
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-sm">{errors.subject.message}</span>
                  )}
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <textarea
                    {...register('message', { required: 'Your scroll seems to be blank' })}
                    className={`w-full rounded border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-500 h-32 text-base outline-none py-2 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out placeholder-gray-500`}
                    placeholder="Inscribe your message here..."
                    disabled={isLoading || !imageLoaded}
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm">{errors.message.message}</span>
                  )}
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={isLoading || !imageLoaded}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${
                    isLoading || !imageLoaded ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Shield className="animate-bounce mr-2" />
                      Raven in Flight...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Feather className="mr-2" />
                      Release the Raven
                    </span>
                  )}
                </motion.button>
              </form>
            </div>
          
          </motion.div>

          <motion.div 
            className={`mt-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="font-medieval text-lg italic">
              &quot;From the shadows of Winterfell, we forge our fortune, for in
              every raven&apos;s call lies the promise of honor and the wealth
              of the North.&quot; - StarkSavingsBank motto
            </p>
          </motion.div>

          <motion.button
            onClick={toggleDarkMode}
            className={`fixed bottom-4 right-4 p-2 rounded-full ${
              isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
        </div>
      </div>
    </div>
  )
}