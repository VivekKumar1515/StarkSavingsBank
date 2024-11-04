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
} from "lucide-react";
import Image from "next/image";
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
  const [isRedirecting, setIsRedirecting] = useState(false);
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
        axios
          .get(
            `${AppConstants.ROOT_URL + AppConstants.ACCOUNT_API_URL}?id=${
              authInfo?.userDetails.id
            }`,
            {
              headers: {
                Authorization: authInfo?.jwtToken,
              },
            }
          )
          .then((response) => {
            const accountDetails: Account = response.data;
            const userDetails = authInfo?.userDetails;
            setAccountDetails({
              accountNumber: accountDetails.accountNumber.toString(),
              accountType: accountDetails.accountType,
              branchAddress: accountDetails.branchAddress,
              name: userDetails?.name,
              email: userDetails?.email,
              mobileNumber: userDetails?.mobileNumber,
              houseAffiliation: userDetails?.houseAffiliation,
            });
            setCurrentHouse(authInfo.userDetails.houseAffiliation)
            setLoading(false);
          })
          .catch((error) => {
            console.log(
              "An error occured while fetching account details due to :" + error
            );

            setLoading(false);
          });
      } else {
        setLoading(false);
        redirect();
      }
    }
  };
  

  useEffect(() => {
    console.log(loading);

    fetchAccountDetails();

  }, [authInfo?.loading]);

  function redirect() {
    setIsRedirecting(true);
    setTimeout(() => {
      router.push("/login");
    }, 10000);
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">
          Hold tight! The ravens are flying to fetch your account details.
          Please wait while we summon the maesters!
        </div>
      </div>
    );
  }

  // If the user is not authenticated
  if (!authInfo?.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse text-center p-5 ">
          Alas, brave traveler! You cannot cross the Wall without a Night&apos;s
          Watch pass. Seek the wisdom of the Iron Bank to gain entry. The winds
          are shifting, and in a heartbeat, you shall be whisked away to the
          Iron Bank&apos;s doorstep. Hold fast!
        </div>
      </div>
    );
  }

  const currentHouseData =
    houses.find((h) => h.name === currentHouse) || houses[0];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentHouseData.color} transition-all duration-1000`}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold text-center text-white mb-8 font-medieval"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Realm of Wealth
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {loading ? (
              <motion.div
                className="col-span-full flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Crown className="w-16 h-16 text-white animate-pulse" />
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg"
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
                </motion.div>

                <motion.div
                  className="relative bg-gray-800 p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Image overlay for background */}
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      backgroundImage: `url('/assets/House_${accountDetails?.houseAffiliation}.jpeg')`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      opacity: 0.15, // Adjusts only the image's opacity
                    }}
                  />

                  {/* Content goes above the background */}
                  <div className="relative">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Shield className="mr-2" /> Account Sigil
                    </h2>
                    <p className="text-gray-300 text-lg">
                      {accountDetails?.accountNumber}
                    </p>
                    <p className="text-gray-300 text-lg">
                      {accountDetails?.houseAffiliation}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg"
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
                </motion.div>

                <motion.div
                  className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Castle className="mr-2" /> Stronghold Location
                  </h2>
                  <p className="text-gray-300 text-lg">
                    {accountDetails?.branchAddress}
                  </p>
                  <div className="mt-4 relative">
                    <motion.div
                      className="w-42 h-32 bg-gray-700 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src="/assets/Winterfell_Map.jpeg"
                        alt="Map of Winterfell"
                        layout="fill"
                        objectFit="cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {!loading && (
          <motion.div
            className="mt-8 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <Scroll className="mr-2" /> Royal Decrees
            </h2>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <Sword className="inline-block mr-2" /> Your gold is as safe as
                a Valyrian steel vault.
              </li>
              <li className="text-gray-300">
                <Shield className="inline-block mr-2" /> We offer protection
                against White Walkers and financial winter.
              </li>
              <li className="text-gray-300">
                <Crown className="inline-block mr-2" /> Our interest rates are
                fit for kings and queens.
              </li>
            </ul>
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 flex space-x-2">
        {houses.map((house) => (
          <motion.button
            key={house.name}
            onClick={() => setCurrentHouse(house.name)}
            className={`p-2 rounded-full ${
              house.name === currentHouse ? "bg-gray-300" : "bg-gray-700"
            } transition-colors duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {house.sigil}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
