"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Sword,
  Coins,
  Scroll,
  Castle,
  Crown,
  Mail,
  Phone,
  User,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { AppConstants } from "../constants/app.constants";
import { Account } from "../model/account.model";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

type AccountDetails = {
  accountNumber: string;
  accountType: string;
  branchAddress: string;
  name: string;
  email: string;
  mobileNumber: string;
  houseAffiliation: string;
};

export default function Dashboard() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [currentHouse, setCurrentHouse] = useState("Stark");
  const authInfo = useAuth();
  const router = useRouter();

  const houses = [
    { name: "Lannister", color: "from-red-900 to-yellow-600", sigil: "🦁" },
    { name: "Stark", color: "from-gray-700 to-blue-900", sigil: "🐺" },
    { name: "Targaryen", color: "from-red-800 to-black", sigil: "🐉" },
    { name: "Baratheon", color: "from-yellow-900 to-black", sigil: "🦌" },
    { name: "Greyjoy", color: "from-gray-800 to-yellow-600", sigil: "🐙" },
    { name: "Martell", color: "from-orange-700 to-red-900", sigil: "☀️" },
    { name: "Tyrell", color: "from-green-700 to-yellow-400", sigil: "🌹" },
    { name: "Arryn", color: "from-blue-700 to-white", sigil: "🦅" },
    { name: "Tully", color: "from-blue-800 to-red-600", sigil: "🐟" },
    { name: "Bolton", color: "from-red-700 to-black", sigil: "🚩" },
    { name: "Frey", color: "from-gray-500 to-blue-800", sigil: "🏰" },
  ];

  const fetchAccountDetails = async () => {
    if (!authInfo?.loading) {
      if (authInfo?.isAuthenticated) {
        try {
          const response = await axios.get(
            `${AppConstants.ROOT_URL + AppConstants.ACCOUNT_API_URL}?id=${
              authInfo?.userDetails.id
            }`,
            {
              headers: {
                Authorization: authInfo?.jwtToken,
              },
            }
          );
          const accountData: Account = response.data;
          const userDetails = authInfo?.userDetails;
          setAccountDetails({
            accountNumber: accountData.accountNumber.toString(),
            accountType: accountData.accountType,
            branchAddress: accountData.branchAddress,
            name: userDetails?.name,
            email: userDetails?.email,
            mobileNumber: userDetails?.mobileNumber,
            houseAffiliation: userDetails?.houseAffiliation,
          });
          setCurrentHouse(userDetails?.houseAffiliation);
          setLoading(false);
        } catch (error) {
          console.error(
            "An error occurred while fetching account details:",
            error
          );
          setLoading(false);
        }
      } else {
        setLoading(false);
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, [authInfo?.loading]);

  const currentHouseData =
    houses.find((h) => h.name === currentHouse) || houses[0];

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${currentHouseData.color} flex items-center justify-center transition-all duration-1000`}
      >
        <motion.div
          className="text-white text-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Crown className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          Hold tight! The ravens are flying to fetch your account details.
          <br />
          Please wait while we summon the maesters!
        </motion.div>
      </div>
    );
  }

  if (!authInfo?.isAuthenticated) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${currentHouseData.color} flex items-center justify-center transition-all duration-1000`}
      >
        <motion.div
          className="text-white text-2xl text-center p-5 max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Alas, brave traveler! You cannot cross the Wall without a Night&apos;s
          Watch pass. Seek the wisdom of the Stark Bank to gain entry. The winds
          are shifting, and in a heartbeat, you shall be whisked away to the
          Stark Bank&apos;s doorstep. Hold fast!
          <Link
            href="/login"
            className="block mt-6 text-blue-300 hover:text-blue-200 transition-colors"
          >
            Journey to the Stark Bank
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentHouseData.color} text-gray-100 p-4 sm:p-8 transition-all duration-1000`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-5xl font-bold mb-8 text-center font-medieval"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Realm of Wealth, {accountDetails?.name}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {[
              <motion.div
                key="noble-identity"
                className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <User className="mr-2" /> Noble Identity
                </h2>
                <p className="text-gray-300 text-lg mb-2">
                  {accountDetails?.name}
                </p>
                <p className="text-gray-300 flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> {accountDetails?.email}
                </p>
                <p className="text-gray-300 flex items-center mt-2">
                  <Phone className="mr-2 h-4 w-4" />{" "}
                  {accountDetails?.mobileNumber}
                </p>
              </motion.div>,

              <motion.div
                key="account-sigil"
                className="relative bg-black bg-opacity-50 p-6 rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `url('/assets/House_${accountDetails?.houseAffiliation}.jpeg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Shield className="mr-2" /> Account Sigil
                  </h2>
                  <p className="text-gray-300 text-lg">
                    {accountDetails?.accountNumber}
                  </p>
                  <p className="text-gray-300 text-lg mt-2">
                    {accountDetails?.houseAffiliation}
                  </p>
                </div>
              </motion.div>,

              <motion.div
                key="treasury-type"
                className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Coins className="mr-2" /> Treasury Type
                </h2>
                <p className="text-gray-300 text-lg">
                  {accountDetails?.accountType}
                </p>
                <div className="mt-4 flex justify-center">
                  <motion.div
                    className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Coins className="w-12 h-12 text-yellow-300" />
                  </motion.div>
                </div>
              </motion.div>,

              <motion.div
                key="stronghold-location"
                className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg col-span-full lg:col-span-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Castle className="mr-2" /> Stronghold Location
                </h2>
                <p className="text-gray-300 text-lg mb-4">
                  {accountDetails?.branchAddress}
                </p>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/assets/Winterfell_Map.jpeg"
                    alt="Map of Winterfell"
                    width={800}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </div>
              </motion.div>,
            ]}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-8 bg-black bg-opacity-50 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Scroll className="mr-2" /> Royal Decrees
          </h2>
          <ul className="space-y-2">
            {[
              { icon: Sword, text: "Your gold is as safe as a Valyrian steel vault." },
              { icon: Shield, text: "We offer protection against White Walkers and financial winter." },
              { icon: Crown, text: "Our interest rates are fit for kings and queens." },
            ].map((decree, index) => (
              <li key={index} className="text-gray-300">
                <decree.icon className="inline-block mr-2" /> {decree.text}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors text-lg font-medieval"
          >
            <ArrowLeft className="mr-2" />
            Return to the Great Hall
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

