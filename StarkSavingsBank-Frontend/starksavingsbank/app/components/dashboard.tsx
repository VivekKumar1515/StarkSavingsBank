"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Coins,
  Scroll,
  Sword,
  Moon,
  CloudSnow,
  Snowflake,
  CloudLightning,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type User = {
  name: string;
  role: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [weather, setWeather] = useState<string>("Winter is coming");
  const [WeatherIcon, setWeatherIcon] = useState<React.ElementType>(CloudSnow);
  const adminRole =
    "You've ascended to the Stark Bank's highest seat as the Master of Coin Commander.";
  const userRole = "You've infiltrated StarkSavingsBank as a Faceless Banker";
  const authInfo = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const getWeather = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setWeatherIcon(Snowflake);
      return "Winter is coming";
    } else if (currentHour >= 12 && currentHour < 17) {
      setWeatherIcon(CloudLightning);
      return "A storm of swords approaches";
    } else if (currentHour >= 17 && currentHour < 21) {
      setWeatherIcon(Moon);
      return "The night is dark and full of interest rates";
    } else {
      setWeatherIcon(CloudSnow);
      return "Cloudy with a chance of dragons";
    }
  };

  function fetchUser() {
    if (!authInfo?.loading) {
      if (authInfo?.isAuthenticated) {
        setUser({
          name: authInfo?.userDetails.name,
          role: authInfo?.userDetails.role === "ADMIN" ? "admin" : "user",
        });
        setLoading(false);
      } else {
        setLoading(false);
        redirect();
      }
    }
  }

  useEffect(() => {
    fetchUser();

    setWeather(getWeather());

    const interval = setInterval(() => {
      setWeather(getWeather());
    }, 3600000);

    return () => clearInterval(interval);
  }, [authInfo?.loading]);

  function redirect() {
    setIsRedirecting(true);
    setTimeout(() => {
      router.push("/login");
    }, 10000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-900 flex items-center justify-center">
        <motion.div
          className="text-white text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Hold tight! The ravens are flying to fetch your account details.
          Please wait while we summon the maesters!
        </motion.div>
      </div>
    );
  }

  const dashboardItems = [
    {
      title: "Stark Vault",
      description: "View your treasure",
      icon: Shield,
      link: "/myaccount",
    },
    {
      title: "Golden Dragons",
      description: "Count your coins",
      icon: Coins,
      link: "/mybalance",
    },
    {
      title: "Lannister Debts",
      description: "Review your loans",
      icon: Scroll,
      link: "/myloans",
    },
    {
      title: "Valyrian Plastic",
      description: "Manage your cards",
      icon: Sword,
      link: "/mycards",
    },
  ];

  if (!authInfo?.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-900 flex items-center justify-center">
        <motion.div
          className="text-white text-2xl text-center p-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Alas, brave traveler! You cannot cross the Wall without a Night&apos;s
          Watch pass. Seek the wisdom of the Stark Bank to gain entry. The winds
          are shifting, and in a heartbeat, you shall be whisked away to the
          Stark Bank&apos;s doorstep. Hold fast!
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/assets/Jon_Snow_is_declared_King_in_The_North_Season_6_Episode_10_Preview.jpeg')] bg-cover bg-center">
      <div className="min-h-screen bg-black bg-opacity-70 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4 text-gray-300">
              Welcome to the Realm,{" "}
              <span className="text-blue-400">{user?.name}</span>
            </h1>
            <p className="text-xl mb-4">
              {user?.role === "admin" ? adminRole : userRole}
            </p>
            <div className="flex items-center justify-center space-x-2 text-lg italic">
              <WeatherIcon className="h-6 w-6 text-yellow-400" />
              <span>{weather}</span>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 pointer-events-none"></div>
            <div className="flex overflow-x-auto py-4 scrollbar-hide">
              <AnimatePresence>
                {dashboardItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex-none w-64 mx-4"
                  >
                    <Link href={item.link}>
                      <div className="bg-gray-800 bg-opacity-80 rounded-lg shadow-xl p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-100 border border-gray-700">
                        <div className="flex items-center mb-4">
                          <item.icon className="h-10 w-10 text-blue-400 mr-4" />
                          <h2 className="text-2xl font-semibold">
                            {item.title}
                          </h2>
                        </div>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            className="mt-12 bg-gray-900 bg-opacity-80 rounded-lg shadow-xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-center">
              Wisdom from the Stark Bank
            </h3>
            <div className="text-center">
              <p className="italic text-gray-300 text-lg">
                &quot;In finance, as in war, you must always be prepared for
                winter. Diversify your assets like the Lannisters diversify
                their schemes.&quot;
              </p>
              <p className="mt-4 text-gray-400">
                - Tywin Lannister, Chief Investment Officer
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-sm text-gray-500">
              Remember, the Stark Bank will have its due. Manage your accounts
              wisely.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
