"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Coins,
  Scroll,
  ArrowDownRight,
  ArrowUpRight,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { AppConstants } from "../constants/app.constants";
import { useRouter } from "next/navigation";

type Transaction = {
  transactionDt: string;
  transactionSummary: string;
  transactionType: "Deposit" | "Transfer" | "Withdrawal";
  transactionAmount: number;
  closingBalance: number;
};

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

export default function BalanceAndTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const authInfo = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const [currentHouse, setCurrentHouse] = useState("Stark");

  const fetchTransactions = async () => {
    if (!authInfo?.loading) {
      if (authInfo?.isAuthenticated) {
        console.log("Making db call to fetch transactions!");
        axios
          .get(
            `${AppConstants.ROOT_URL + AppConstants.BALANCE_API_URL}?id=${
              authInfo.userDetails.id
            }`,
            {
              headers: {
                Authorization: authInfo.jwtToken,
              },
            }
          )
          .then((response) => {
            const transactionDetails: Transaction[] = response.data;
            setTransactions(transactionDetails);
            setCurrentHouse(authInfo.userDetails.houseAffiliation);
            setLoading(false);
          })
          .catch((error) => {
            console.log(
              "An error occured while fetching balance details due to : " +
                error
            );
            setLoading(false);
          });
      } else {
        redirect();
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [authInfo?.loading]);

  function redirect() {
    setIsRedirecting(true);
    setTimeout(() => {
      router.push("/login");
    }, 10000);
  }

  function convertToGotDate(currentDateStr: string): string {
    const [year, month] = currentDateStr.split("-").map(Number);
    const startAcYear = 1;
    const gotYear = startAcYear + (year - 1);
    const gotDate = `${gotYear} AC, ${month} Moon`;
    return gotDate;
  }

  if (!authInfo?.loading && !authInfo?.isAuthenticated) {
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

  const formatCurrency = (amount: number) => {
    return `${Math.abs(amount).toLocaleString()} Gold Dragons`;
  };

  const currentHouseData =
    houses.find((h) => h.name === currentHouse) || houses[0];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentHouseData.color} text-gray-100 p-4 sm:p-8 transition-all duration-1000`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          The Ledger of Ice and Fire
        </motion.h1>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2" /> House Treasury
          </h2>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">
                {loading ? (
                  <span className="animate-pulse">Counting dragons...</span>
                ) : (
                  formatCurrency(transactions[0]?.closingBalance || 0)
                )}
              </h3>
              <div className="text-xl">
                House {authInfo.userDetails.houseAffiliation}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Scroll className="mr-2" /> Scrolls of Transactions
          </h2>
          <div className="bg-black bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
              <table className="w-full">
                <thead className="bg-black bg-opacity-50 sticky top-0">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Summary</th>
                    <th className="p-3 text-right">Amount</th>
                    <th className="p-3 text-right">Closing Balance</th>
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
                        <td colSpan={4} className="p-3 text-center">
                          <span className="animate-pulse">
                            The ravens are fetching your scrolls...
                          </span>
                        </td>
                      </motion.tr>
                    ) : (
                      transactions.map((transaction, index) => (
                        <motion.tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-black hover:bg-opacity-30 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="p-3">
                            {convertToGotDate(transaction.transactionDt)}
                          </td>
                          <td className="p-3">
                            {transaction.transactionSummary}
                          </td>
                          <td className="p-3 text-right">
                            <span
                              className={`flex items-center justify-end ${
                                transaction.transactionType === "Withdrawal" ||
                                transaction.transactionType === "Transfer"
                                  ? "text-red-400"
                                  : "text-green-400"
                              }`}
                            >
                              {transaction.transactionType === "Withdrawal" ||
                              transaction.transactionType === "Transfer" ? (
                                <ArrowDownRight className="mr-1 h-4 w-4" />
                              ) : (
                                <ArrowUpRight className="mr-1 h-4 w-4" />
                              )}
                              {formatCurrency(transaction.transactionAmount)}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(transaction.closingBalance)}
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
            className="inline-flex items-center px-6 py-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-md transition-colors text-lg"
          >
            <ArrowLeft className="mr-2" />
            Return to the Great Hall
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 text-center text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>
            Remember, a Lannister always pays their debts, but a wise Stark
            saves for winter.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
