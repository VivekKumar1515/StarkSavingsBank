'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { name: 'Home', href: '/home' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Notices', href: '/notices' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAuthenticated = useAuth();

  return (
    <header className="bg-gradient-to-r from-gray-800 to-blue-900 text-gray-100 shadow-lg relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ backgroundImage: "url('https://media.istockphoto.com/id/1343795923/photo/stone-wall-texture-background.jpg?s=612x612&w=0&k=20&c=49dhmVYXxyuT2v5GCFj3SevDMDAg2k31D9dqx1lHGnE=')" }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex sm:flex-col">
              <div className="relative w-12 h-12 transform transition-transform duration-300 group-hover:scale-110 ml-3">
                <Image
                  src="https://a0.anyrgb.com/pngimg/1464/1846/stark-logo-catelyn-stark-bran-stark-prince-of-winterfell-eddard-stark-silver-shield-winter-is-coming-house-stark-sigil-stark-thumbnail.png"
                  alt="StarkSavingsBank"
                  layout='fill'
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="ml-3 text-xl font-semibold tracking-wider hidden sm:inline-block">StarkSavingsBank</span>
            </Link>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <Link
                  href="/logout"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100 hover:bg-white transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                href="/logout"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-300 ease-in-out"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}