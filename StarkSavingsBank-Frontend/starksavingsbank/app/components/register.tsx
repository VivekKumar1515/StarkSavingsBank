'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Lock, ArrowLeft, Shield, Sword, Crown } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { AppConstants } from '../constants/app.constants'

const houses = [
  { name: "Stark", sigil: "🐺", color: "from-gray-700 to-blue-900" },
  { name: "Lannister", sigil: "🦁", color: "from-red-900 to-yellow-600" },
  { name: "Targaryen", sigil: "🐉", color: "from-red-800 to-black" },
  { name: "Baratheon", sigil: "🦌", color: "from-yellow-900 to-black" },
  { name: "Greyjoy", sigil: "🦑", color: "from-teal-900 to-gray-800" },
  { name: "Tyrell", sigil: "🌹", color: "from-green-700 to-yellow-400" },
  { name: "Martell", sigil: "☀️", color: "from-orange-700 to-red-900" },
  { name: "Tully", sigil: "🐟", color: "from-blue-800 to-red-600" },
  { name: "Arryn", sigil: "🦅", color: "from-blue-700 to-white" },
  { name: "Bolton", sigil: "❌", color: "from-red-900 to-pink-900" },
  { name: "Frey", sigil: "🏰", color: "from-gray-600 to-blue-900" },
]

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [houseAffiliation, setHouseAffiliation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isStepValid, setIsStepValid] = useState(true)
  const [token, setToken] = useState('')

  const [backgroundImage, setBackgroundImage] = useState('/assets/winterfell_castle.jpg')

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get('token')
    if (tokenParam && tokenParam?.length > 300) {
      setToken(tokenParam)
    } else {
      setError('Invalid or No token found. Please request a new registration link.')
    }
  }, [])

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const mobileRegex = /^[6-9]\d{9}$/
        setIsStepValid(name.trim() !== '' && emailRegex.test(email) && mobileRegex.test(mobileNumber))
        break
      case 1:
        setIsStepValid(password.length >= 8 && password === confirmPassword)
        break
      case 2:
        setIsStepValid(houseAffiliation !== '')
        break
      default:
        setIsStepValid(true)
    }
  }

  useEffect(() => {
    validateStep()
  }, [name, email, mobileNumber, password, confirmPassword, houseAffiliation, currentStep])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < formSteps.length - 1) {
      nextStep()
      return
    }
    setIsSubmitting(true)
    setError('')

    try {
      const response = await axios.post(AppConstants.ROOT_URL + "/register", {
        name,
        email,
        mobileNumber,
        password,
        confirmPassword,
        houseAffiliation
      }, {
        headers: {
          "Authorization" : token
        }
      })
      if (response.status === 201) {
        setIsSuccess(true)
      }
    } catch (error) {
      setError('Failed to register. Please try again.')
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formSteps = [
    { title: "Identity", icon: User, fields: ["name", "email", "mobileNumber"] },
    { title: "Secret Key", icon: Lock, fields: ["password", "confirmPassword"] },
    { title: "House Allegiance", icon: Crown, fields: ["house"] },
  ]

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

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
            <Shield className="h-20 w-20 text-blue-400" />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
            Join the Realm
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Pledge your allegiance to the Stark Savings Bank
          </p>
        </div>

        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center relative z-10"
          >
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <Link href="/login" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Return to the Great Hall
            </Link>
          </motion.div>
        ) : !isSuccess ? (
          <motion.form 
            className="mt-8 space-y-6 relative z-10" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between mb-4">
              {formSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className={`flex flex-col items-center ${index === currentStep ? 'text-blue-400' : 'text-gray-500'}`}
                  animate={{ scale: index === currentStep ? 1.1 : 1 }}
                >
                  <step.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs">{step.title}</span>
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="sr-only">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="email-address" className="sr-only">Email address</label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                        placeholder="Raven's Destination (Email Address)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="mobile-number" className="sr-only">Mobile Number</label>
                      <input
                        id="mobile-number"
                        name="mobileNumber"
                        type="tel"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                        placeholder="Raven's Whisper (Mobile Number)"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="sr-only">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                        placeholder="Your Secret Key"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                      <input
                        id="confirm-password"
                        name="confirmPassword"
                        type="password"
                        required
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                        placeholder="Confirm Your Secret Key"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <label htmlFor="house" className="block text-sm font-medium text-gray-300">Choose Your House</label>
                    <div className="grid grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                      {houses.map((h) => (
                        <motion.button
                          key={h.name}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setHouseAffiliation(h.name)}
                          className={`p-2 rounded-md flex flex-col items-center justify-center ${
                            houseAffiliation === h.name ? `bg-gradient-to-br ${h.color} text-white` : 'bg-gray-800 text-gray-300'
                          } transition-all duration-200`}
                        >
                          <span className="text-2xl mb-1">{h.sigil}</span>
                          <span className="text-xs">{h.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting || !isStepValid}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep < formSteps.length - 1 ? (
                  <>
                    Next
                    <ArrowLeft className="ml-2 h-4 w-4 transform rotate-180" />
                  </>
                ) : isSubmitting ? (
                  'Swearing Oath...'
                ) : (
                  <>
                    Swear Your Oath
                    <Sword className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
            >
              <Crown className="h-12 w-12 text-white" />
            </motion.div>
            <p className="text-lg text-gray-100 mb-4">
              Your oath has been sworn, and your name etched in the annals of the Stark Savings Bank. A raven will be dispatched with further instructions to complete your initiation into the realm.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 relative z-10"
        >
          <Link href="/home" className="flex items-center justify-center text-sm text-gray-400 hover:text-gray-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to the Realm
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}