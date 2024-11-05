"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sword, Shield, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [quirkySaying, setQuirkySaying] = useState("");
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, checkAuth } = useAuth();

  const quirkySayings = [
    "The North remembers... your session!",
    "A Lannister always pays his debts, but you're all paid up!",
    "You know nothing, Jon Snow oh, you're just logging out.",
    "Hodor! (That means 'Goodbye' in Hodor)",
    "Valar morghulis... but first, valar log-outis!",
    "Winter is coming... time to log out and put on a sweater!",
    "Dracarys! (Don't worry, we're just burning your session tokens)",
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setQuirkySaying(
      quirkySayings[Math.floor(Math.random() * quirkySayings.length)]
    );

    // Simulate logout process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("userdetails");
    sessionStorage.removeItem("XSRF-TOKEN");
    setIsAuthenticated(false);
    checkAuth();

    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-black bg-opacity-50 p-10 rounded-xl shadow-2xl relative overflow-hidden border border-gray-700"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/assets/Godswood_winterfell.jpeg')" }}
        ></div>
        <div className="relative">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Prepare to Ride South
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Are you sure you want to leave Winterfell?
          </p>
        </div>

        <AnimatePresence>
          {!isLoggingOut ? (
            <motion.div
              key="logout-options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="flex items-center justify-center">
                <Sword className="h-16 w-16 text-blue-500 mr-4" />
                <Shield className="h-16 w-16 text-blue-500" />
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Logout (Ride South)
              </button>
              <div className="flex justify-center mt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center py-2 px-4 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <ArrowLeft className="mr-2" />
                  Return to the Great Hall
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-white text-center">{quirkySaying}</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
