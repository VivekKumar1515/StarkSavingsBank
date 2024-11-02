"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Scroll,
  Castle,
  Sword,
  Shield,
  Snowflake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Contact } from "../model/contact.model";
import { AppConstants } from "../constants/app.constants";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

type ContactFormData = {
  contactName: string;
  contactEmail: string;
  subject: string;
  message: string;
  house: string;
};

const houses = [
  "Stark",
  "Lannister",
  "Targaryen",
  "Baratheon",
  "Greyjoy",
  "Tyrell",
  "Martell",
  "Tully",
  "Arryn",
];

const winterConfig = {
  icon: Snowflake,
  color: "text-blue-200",
  bg: "from-blue-900 to-gray-900",
};

export default function QuirkyContact() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>();
  const [positions, setPositions] = useState<number[]>([]);
  const {xsrf} = useAuth();

  useEffect(() => {
    const newPositions = Array.from({ length: 20 }, () => Math.random() * 100);
    setPositions(newPositions);
  }, []);

  const selectedHouse = watch("house");


  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    console.log(data);
    const contactData = new Contact(undefined, data.contactName, data.contactEmail, data.house, data.subject, data.message)

    await axios.post(`${AppConstants.ROOT_URL}${AppConstants.CONTACT_API_URL}`, contactData, {
      withCredentials: true,
      headers: {
        "X-XSRF-TOKEN" : xsrf
      }
    }).then(response => {
      setContactId(`${response.data.house.toUpperCase()}-${response.data.contactId}`)
    }).catch(error => {
      console.log("Something went wrong, try again!")
      console.log(error);
    });

    setIsLoading(false);
    reset();
  };

  const WinterIcon = winterConfig.icon;

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${winterConfig.bg} transition-all duration-1000 ease-in-out`}
    >
      <div className="min-h-screen bg-black bg-opacity-50 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <AnimatePresence>
        {positions.map((left, i) => (
          <motion.div
            key={`snowflake-${i}`}
            className={`absolute ${winterConfig.color}`}
            initial={{ top: -20, left: `${left}%` }}
            animate={{ top: "100vh" }}
            exit={{ opacity: 0 }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <WinterIcon size={16} />
          </motion.div>
        ))}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center mb-8 font-medieval">
            Send a Raven to the Realm
          </h1>

          <div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-xl p-8 border border-gray-700 relative overflow-hidden">
            {selectedHouse && (
              <div className="inset-0 flex items-center justify-center opacity-15 relative">
                <Image 
                src={`/assets/House_${selectedHouse}.jpeg`}
                layout="fill"
                alt={selectedHouse}
                className="object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 transform hover:scale-105 transition-transform">
                  <Sword className="h-8 w-8 text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold">Raven&apos;s Call</h2>
                    <p className="text-gray-400">+7 KINGDOMS 925 89</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 transform hover:scale-105 transition-transform">
                  <Scroll className="h-8 w-8 text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold">Scroll Delivery</h2>
                    <p className="text-gray-400">raven@starksavings.west</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 transform hover:scale-105 transition-transform">
                  <Castle className="h-8 w-8 text-blue-400" />
                  <div>
                    <h2 className="text-xl font-semibold">
                      Winterfell Citadel
                    </h2>
                    <p className="text-gray-400">Beyond the Wall, 10030</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {contactId && (
                  <div className="text-green-400 text-center p-4 bg-green-900 bg-opacity-50 rounded animate-pulse">
                    Your raven has taken flight! Scroll ID: {contactId}
                  </div>
                )}
                <div>
                  <input
                    {...register("contactName", {
                      required: "Your name is required, even if you're No One",
                    })}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out placeholder-gray-500"
                    placeholder="Your Name (or alias)"
                  />
                  {errors.contactName && (
                    <span className="text-red-500 text-sm">
                      {errors.contactName.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    {...register("contactEmail", {
                      required: "A raven needs to know where to return",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message:
                          "Even a Three-Eyed Raven couldn't find this email",
                      },
                    })}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out placeholder-gray-500"
                    placeholder="Raven's Return Address (Email)"
                  />
                  {errors.contactEmail && (
                    <span className="text-red-500 text-sm">
                      {errors.contactEmail.message}
                    </span>
                  )}
                </div>
                <div>
                  <select
                    {...register("house", {
                      required: "Choose your allegiance",
                    })}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="">Choose Your House</option>
                    {houses.map((house) => (
                      <option key={house} value={house}>
                        {house}
                      </option>
                    ))}
                  </select>
                  {errors.house && (
                    <span className="text-red-500 text-sm">
                      {errors.house.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    {...register("subject", {
                      required: "What is the nature of your raven?",
                    })}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out placeholder-gray-500"
                    placeholder="Subject of Your Scroll"
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-sm">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    {...register("message", {
                      required: "Your scroll seems to be blank",
                    })}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 h-32 text-base outline-none text-gray-100 py-2 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out placeholder-gray-500"
                    placeholder="Inscribe your message here..."
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Shield className="animate-bounce mr-2" />
                      Raven in Flight...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Sword className="mr-2" />
                      Release the Raven
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-400">
            <p className="font-medieval text-lg">
              &quot;From the shadows of Winterfell, we forge our fortune, for in
              every raven&apos;s call lies the promise of honor and the wealth
              of the North.&quot; - StarkSavingsBank motto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
