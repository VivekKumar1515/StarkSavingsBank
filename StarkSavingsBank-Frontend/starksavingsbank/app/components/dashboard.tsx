'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Coins, Scroll, Sword, Moon, CloudSnow, Snowflake, CloudLightning } from 'lucide-react'

type User = {
  name: string
  role: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [weather, setWeather] = useState<string>('Winter is coming')
  const [WeatherIcon, setWeatherIcon] = useState<React.ElementType>(CloudSnow) // Use a capitalized name for components
  const adminRole = "You've ascended to the Iron Bank's highest seat as the Master of Coin Commander."
  const userRole = "You've infiltrated StarkSavingsBank as a Faceless Banker"

  const getWeather = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setWeatherIcon(Snowflake)
      return 'Winter is coming'
    } else if (currentHour >= 12 && currentHour < 17) {
      setWeatherIcon(CloudLightning)
      return 'A storm of swords approaches'
    } else if (currentHour >= 17 && currentHour < 21) {
      setWeatherIcon(Moon)
      return 'The night is dark and full of interest rates'
    } else {
      setWeatherIcon(CloudSnow)
      return 'Cloudy with a chance of dragons'
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(sessionStorage.getItem("userdetails")!)
      setUser({ name: user.name, role: user.role === "ADMIN" ? "admin" : "user" })
    }

    fetchUser()
    setWeather(getWeather())

    const interval = setInterval(() => {
      setWeather(getWeather())
    }, 3600000)

    return () => clearInterval(interval)
  }, [])

  const dashboardItems = [
    { title: 'Iron Vault', description: 'View your treasure hoard', icon: Shield, link: '/myaccount' },
    { title: 'Golden Dragons', description: 'Count your coins', icon: Coins, link: '/mybalance' },
    { title: 'Lannister Debts', description: 'Review your loans', icon: Scroll, link: '/myloans' },
    { title: 'Valyrian Plastic', description: 'Manage your cards', icon: Sword, link: '/mycards' },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">The ravens are en route...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
      <div className="min-h-screen bg-black bg-opacity-70 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 text-gray-300">
              Welcome to the Realm, <span className="text-blue-400">{user.name}</span>
            </h1>
            <p className="text-xl mb-4">{user.role === "admin" ? adminRole : userRole}</p>
            <div className="flex items-center justify-center space-x-2 text-lg italic">
              <WeatherIcon className="h-6 w-6 text-yellow-400" />
              <span>{weather}</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 pointer-events-none"></div>
            <div className="flex overflow-x-auto py-4 scrollbar-hide">
              {dashboardItems.map((item, index) => (
                <Link href={item.link} key={index} className="flex-none w-64 mx-4">
                  <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-100 border border-gray-700">
                    <div className="flex items-center mb-4">
                      <item.icon className="h-10 w-10 text-blue-400 mr-4" />
                      <h2 className="text-2xl font-semibold">{item.title}</h2>
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gray-900 bg-opacity-80 rounded-lg shadow-xl p-8 border border-gray-700">
            <h3 className="text-3xl font-semibold mb-6 text-center">Wisdom from the Iron Bank</h3>
            <div className="text-center">
              <p className="italic text-gray-300 text-lg">
                &quot;In finance, as in war, you must always be prepared for winter. Diversify your assets like the Lannisters diversify their schemes.&quot;
              </p>
              <p className="mt-4 text-gray-400">- Tywin Lannister, Chief Investment Officer</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Remember, the Iron Bank will have its due. Manage your accounts wisely.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}