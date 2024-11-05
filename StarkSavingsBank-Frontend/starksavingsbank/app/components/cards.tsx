"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Sword,
  Crown,
  Flame,
} from "lucide-react";

import { Gem, Book, Key, Snowflake } from "lucide-react"; // Ensure these imports match available icons

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { AppConstants } from "../constants/app.constants";
import axios from "axios";

type CardInput = {
  cardNumber: string;
  cardType: string;
  totalLimit: number;
  amountUsed: number;
};

type Card = {
  cardNumber: string;
  cardType: string;
  totalLimit: number;
  amountUsed: number;
  availableAmount: number;
};

export default function CardDetails() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHouse, setCurrentHouse] = useState("Stark");
  const authInfo = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const houses = [
    { name: "Lannister", color: "from-red-900 to-yellow-600", sigil: "🦁" },
    { name: "Stark", color: "from-gray-700 to-blue-900", sigil: "🐺" },
    { name: "Targaryen", color: "from-red-800 to-black", sigil: "🐉" },
    { name: "Baratheon", color: "from-yellow-900 to-black", sigil: "🦌" },
  ];

  function calculateAvailableAmounts(cardsInput: CardInput[]): Card[] {
    return cardsInput.map((card) => {
      const availableAmount = card.totalLimit - card.amountUsed;
      const cardType = convertCardType(card.cardType);
      return {
        ...card,
        availableAmount,
        cardType,
      };
    });
  }

  function convertCardType(input: string): string {
    switch (input) {
      case "CROWN_JEWELS_CARD":
        return "Crown Jewels Card";
      case "DRAGONS_HOARD":
        return "Dragon's Hoard";
      case "DIREWOLF_PROTECTOR":
        return "Direwolf Protector";
      case "RAVEN_EXPRESS":
        return "Raven Express";
      case "WINTERS_RESERVE":
        return "Winter's Reserve";
      case "WARDENS_VAULT":
        return "Warden's Vault";
      case "HAND_OF_THE_KING":
        return "Hand of the King";
      case "KNIGHTS_OATH":
        return "Knight's Oath";
      case "MAESTERS_WISDOM":
        return "Maester's Wisdom";
      case "HEARTHFIRE_CARD":
        return "Hearthfire Card";
      default:
        return input.toString();
    }
  }

  const fetchCards = async () => {
    if (!authInfo?.loading) {
      if (authInfo?.isAuthenticated) {
        axios
          .get(
            `${AppConstants.ROOT_URL + AppConstants.CARDS_API_URL}?id=${
              authInfo.userDetails.id
            }`,
            {
              headers: {
                Authorization: authInfo.jwtToken,
              },
            }
          )
          .then((response) => {
            const cardsResponse: CardInput[] = response.data;
            setCards(calculateAvailableAmounts(cardsResponse));
            setCurrentHouse(authInfo.userDetails.houseAffiliation);
            setLoading(false);
          })
          .catch((error) => {
            console.log(
              "An error occured while fetching account details due to : " +
                error
            );
            setLoading(false);
          });
      } else {
        setLoading(false);
        redirect();
      }
    }
  };

  function redirect() {
    setIsRedirecting(true);
    setTimeout(() => {
      router.push("/login");
    }, 10000);
  }

  useEffect(() => {
    fetchCards();
  }, [authInfo?.loading]);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} Gold Flames`;
  };

  const currentHouseData =
    houses.find((h) => h.name === currentHouse) || houses[0];
  const totalDueAmount = cards.reduce((sum, card) => sum + card.amountUsed, 0);

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
          Watch pass. Seek the wisdom of the Stark Bank to gain entry. The winds
          are shifting, and in a heartbeat, you shall be whisked away to the
          Stark Bank&apos;s doorstep. Hold fast!
        </div>
      </div>
    );
  }

  const getCardIcon = (cardType: string) => {
    switch (cardType) {
      case "Crown Jewels Card":
        return <Crown className="w-6 h-6 mr-2" />; // Crown Jewels Card

      case "Dragon's Hoard":
        return <Gem className="w-6 h-6 mr-2" />; // Dragon's Hoard

      case "Direwolf Protector":
        return <Shield className="w-6 h-6 mr-2" />; // Direwolf Protector

      case "Raven Express":
        return <Shield className="w-6 h-6 mr-2" />; // Raven Express

      case "Winter's Reserve":
        return <Snowflake className="w-6 h-6 mr-2" />; // Winter's Reserve

      case "Warden's Vault":
        return <Key className="w-6 h-6 mr-2" />; // Warden's Vault

      case "Hand of the King":
        return <Crown className="w-6 h-6 mr-2" />; // Hand of the King

      case "Knight's Oath":
        return <Sword className="w-6 h-6 mr-2" />; // Knight's Oath

      case "Maester's Wisdom":
        return <Book className="w-6 h-6 mr-2" />; // Maester's Wisdom

      case "Hearthfire Card":
        return <Flame className="w-6 h-6 mr-2" />; // Hearthfire Card

      default:
        return <Shield className="w-6 h-6 mr-2" />; // Default icon
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentHouseData.color} text-gray-100 p-4 sm:p-8 transition-all duration-1000`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-5xl font-bold mb-8 text-center font-medieval"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          The Royal Treasury of {currentHouse}
        </motion.h1>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <CreditCard className="mr-2" /> Total Due to the Stark Bank
          </h2>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-4xl mr-4">{currentHouseData.sigil}</span>
                <h3 className="text-4xl font-bold">
                  {loading ? (
                    <span className="animate-pulse">Counting debts...</span>
                  ) : (
                    formatCurrency(totalDueAmount)
                  )}
                </h3>
              </div>
              <div className="text-xl">House {currentHouse}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2" /> Royal Credit Scrolls
          </h2>
          <div className="bg-black bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
              <table className="w-full">
                <thead className="bg-gray-800 sticky top-0">
                  <tr>
                    <th className="p-3 text-left">Scroll Number</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-right">Total Limit</th>
                    <th className="p-3 text-right">Amount Used</th>
                    <th className="p-3 text-right">Available Amt</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {loading ? (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td colSpan={5} className="p-3 text-center">
                          <span className="animate-pulse">
                            The maesters are fetching your credit scrolls...
                          </span>
                        </td>
                      </motion.tr>
                    ) : (
                      cards.map((card, index) => (
                        <motion.tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="p-3">{card.cardNumber}</td>
                          <td className="p-3 flex items-center">
                            {getCardIcon(card.cardType)}
                            {card.cardType}
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(card.totalLimit)}
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(card.amountUsed)}
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(card.availableAmount)}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors text-lg font-medieval"
          >
            <ArrowLeft className="mr-2" />
            Return to the Iron Throne
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>
            Remember, a Lannister always pays their debts, but a wise ruler
            knows how to use credit wisely.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
