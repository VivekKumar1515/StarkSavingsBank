'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { AppConstants } from '../constants/app.constants'

export default function Register() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await axios.post(AppConstants.ROOT_URL + "/send-registration", {
        email: email
      })
      if (response.status === 200) {
        setIsSubmitted(true)
      }
    } catch (error) {
      setError('Failed to send registration link. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-black bg-opacity-50 p-10 rounded-xl shadow-2xl relative overflow-hidden border border-gray-700"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" 
          style={{ backgroundImage: "url('/assets/Winterfell_Castle.jpeg')" }}
        ></div>
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

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="email-form"
              className="mt-8 space-y-6 relative z-10" 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Raven&apos;s Destination (Email Address)</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-800"
                    placeholder="Raven's Destination (Email Address)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                  </span>
                  {isSubmitting ? 'Sending Raven...' : 'Send Registration Raven'}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center relative z-10"
            >
              <p className="text-lg text-gray-100 mb-4">
                A raven has been dispatched with your registration scroll. Check your messages for further instructions to complete your oath to the realm.
              </p>
              <Link href="/login" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Return to the gates
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 relative z-10"
        >
          <Link href="/login" className="flex items-center justify-center text-sm text-gray-400 hover:text-gray-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to the Great Hall
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}