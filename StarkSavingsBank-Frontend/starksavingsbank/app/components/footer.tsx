'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Shield, Sword, Castle, Scroll } from 'lucide-react'
import { motion } from 'framer-motion'

const footerLinks = [
  { 
    title: 'Royal Treasury', 
    links: [
      { name: 'Iron Vaults', href: '/accounts' },
      { name: 'Lannister Loans', href: '/loans' },
      { name: 'Dragon Hoards', href: '/savings' },
      { name: 'Valyrian Investments', href: '/investments' }
    ]
  },
  { 
    title: 'The Small Council', 
    links: [
      { name: 'Our Saga', href: '/about' },
      { name: 'Join the Kingsguard', href: '/careers' },
      { name: 'Raven Scrolls', href: '/press' },
      { name: 'Maester\'s Musings', href: '/blog' }
    ]
  },
  { 
    title: 'Realm Support', 
    links: [
      { name: 'Grand Maester\'s Aid', href: '/help' },
      { name: 'Send a Raven', href: '/contact' },
      { name: 'Secrets of the Citadel', href: '/privacy' },
      { name: 'Laws of the Land', href: '/terms' }
    ]
  },
]

const socialLinks = [
  { name: 'Facebook', icon: Shield, href: '#', houseColor: 'hover:text-blue-400' },
  { name: 'Twitter', icon: Sword, href: '#', houseColor: 'hover:text-blue-300' },
  { name: 'Instagram', icon: Castle, href: '#', houseColor: 'hover:text-pink-400' },
  { name: 'LinkedIn', icon: Scroll, href: '#', houseColor: 'hover:text-blue-500' },
]

const houseWords = [
  "Winter is Coming",
  "Hear Me Roar",
  "Fire and Blood",
  "Ours is the Fury",
  "Growing Strong",
  "We Do Not Sow",
  "Family, Duty, Honor",
  "As High as Honor",
  "Unbowed, Unbent, Unbroken"
]

export default function Footer() {
  const [motto, setMotto] = useState(houseWords[0])

  const changeMotto = () => {
    const newMotto = houseWords[Math.floor(Math.random() * houseWords.length)]
    setMotto(newMotto)
  }

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative w-12 h-12"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="https://a0.anyrgb.com/pngimg/1464/1846/stark-logo-catelyn-stark-bran-stark-prince-of-winterfell-eddard-stark-silver-shield-winter-is-coming-house-stark-sigil-stark-thumbnail.png"
                  alt="StarkSavingsBank"
                  layout='fill'
                  className="rounded-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-blue-500 rounded-full opacity-0"
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.div>
              <span className="text-xl font-semibold tracking-wider">StarkSavingsBank</span>
            </Link>
            <p className="text-sm text-gray-300">Securing your gold through the longest of winters.</p>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-gray-400 ${link.houseColor} transition duration-300`}
                >
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </motion.div>
          </div>
          {footerLinks.map((column, index) => (
            <motion.div 
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <motion.a
                        className="text-sm text-gray-300 hover:text-white transition duration-300"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.name}
                      </motion.a>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} StarkSavingsBank. All rights reserved in the Seven Kingdoms.
          </p>
          <div className="mt-4 sm:mt-0">
            <Link href="/privacy">
              <motion.a
                className="text-sm text-gray-400 hover:text-white transition duration-300 mr-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Privacy Policy
              </motion.a>
            </Link>
            <Link href="/terms">
              <motion.a
                className="text-sm text-gray-400 hover:text-white transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Terms of Service
              </motion.a>
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-lg font-semibold mb-2">House Words of the Day</p>
          <motion.p 
            className="text-xl text-blue-300 italic"
            key={motto}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            &quot;{motto}&quot;
          </motion.p>
          <motion.button
            onClick={changeMotto}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Change House Words
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}