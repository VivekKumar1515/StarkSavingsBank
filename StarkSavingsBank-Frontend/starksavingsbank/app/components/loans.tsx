"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  Flame,
  Castle,
  Shield,
  Mail,
  Hammer,
  Landmark,
  Snowflake,
  Flag,
  ShieldCheck,
  GraduationCap,
  Award,
  Magnet,
  Ship,
  Building2,
  Sword,
  Scroll,
  ArrowLeft
} from "lucide-react"; 
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AppConstants } from "../constants/app.constants";
import GlobalExceptionPage from "../global-exception-page/pages";

type Loan = {
  startDt: string;
  loanType: string;
  totalLoan: number;
  amountPaid: number;
  outstandingAmount: number;
};

export default function LoanDetails() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHouse, setCurrentHouse] = useState("Lannister");
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

  const fetchLoans = async () => {
    
    if(!authInfo?.loading) {
      if(authInfo?.isAuthenticated) {
        axios.get(`${AppConstants.ROOT_URL+AppConstants.LOANS_API_URL}?id=${authInfo.userDetails.id}`, {
          headers: {
            "Authorization": authInfo.jwtToken
          }
        }).then(response => {
            setLoans(response.data)
            setCurrentHouse(authInfo.userDetails.houseAffiliation)
            setLoading(false)
        }).catch(error => {
          console.log("An error occured while fetching account details due to : " + error)
          setLoading(false)
          return <GlobalExceptionPage status={500} />
        })
      } else {
        setLoading(false)
        redirect();
      }
    }
  };

  function revampLoanType(loanType: string): string {
    const strings: string[] = loanType.split("_");
    const newString = strings.map(str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(" ");
    return newString;
  }
  
  function convertToGotDate(currentDateStr: string): string {
    // Parse the string to extract the year and month
    const [year, month] = currentDateStr.split('-').map(Number);

    // Mapping the current year to a fictional GoT timeline starting at 1 AC
    const startAcYear = 1;
    const gotYear = startAcYear + (year - 1); // Assuming "1 AC" starts at the year 1

    // Construct the date in the GoT format
    const gotDate = `${gotYear} AC, ${month} Moon`;
    return gotDate;
}

  useEffect(() => {
    
    fetchLoans();

  }, [authInfo?.loading]);

  function redirect() {
    setIsRedirecting(true);
    setTimeout(() => {
      router.push("/login");
    }, 10000);
  }

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} Gold Dragons`;
  };

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
          Watch pass. Seek the wisdom of the Stark Bank to gain entry. The winds
          are shifting, and in a heartbeat, you shall be whisked away to the
          Stark Bank&apos;s doorstep. Hold fast!
        </div>
      </div>
    );
  }

  const currentHouseData =
    houses.find((h) => h.name === currentHouse) || houses[0];
  const totalOutstandingBalance = loans.reduce(
    (sum, loan) => sum + loan.outstandingAmount,
    0
  );

  const getLoanIcon = (loanType: string) => {
    switch (loanType) {
      case "Iron Bank Loan":
        return <Coins className="w-6 h-6 mr-2" />;
      case "Wildfire Production":
        return <Flame className="w-6 h-6 mr-2" />;
      case "Dragon Egg Acquisition":
        return <Castle className="w-6 h-6 mr-2" />;
      case "Winterfell Reconstruction":
        return <Shield className="w-6 h-6 mr-2" />;
      case "Raven Message Service":
        return <Mail className="w-6 h-6 mr-2" />;
      case "Valyrian Steel Smithing":
        return <Hammer className="w-6 h-6 mr-2" />;
      case "The Wall Defense Fund":
        return <Landmark className="w-6 h-6 mr-2" />;
      case "White Walker Research":
        return <Snowflake className="w-6 h-6 mr-2" />;
      case "House Banners Production":
        return <Flag className="w-6 h-6 mr-2" />;
      case "Knighthood Upgrade":
        return <ShieldCheck className="w-6 h-6 mr-2" />;
      case "Maester Training Fund":
        return <GraduationCap className="w-6 h-6 mr-2" />;
      case "Tourney Sponsorship":
        return <Award className="w-6 h-6 mr-2" />;
      case "Dothraki Magnet Trade":
        return <Magnet className="w-6 h-6 mr-2" />;
      case "Essos Trading Expedition":
        return <Ship className="w-6 h-6 mr-2" />;
      case "Kingslanding Redevelopment":
        return <Building2 className="w-6 h-6 mr-2" />;
      default:
        return <Sword className="w-6 h-6 mr-2" />;
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
          The Debts of the Seven Kingdoms
        </motion.h1>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <Scroll className="mr-2" /> Outstanding Debts to the Stark Savings
            Bank
          </h2>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-4xl mr-4">{currentHouseData.sigil}</span>
                <h3 className="text-4xl font-bold">
                  {loading ? (
                    <span className="animate-pulse">
                      Counting gold dragons...
                    </span>
                  ) : (
                    formatCurrency(totalOutstandingBalance)
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
            <Scroll className="mr-2" /> Scrolls of Debt
          </h2>
          <div className="bg-black bg-opacity-50 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto" style={{ maxHeight: "400px" }}>
              <table className="w-full">
                <thead className="bg-gray-800 sticky top-0">
                  <tr>
                    <th className="p-3 text-left">Start Date</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-right">Total Loan</th>
                    <th className="p-3 text-right">Amount Paid</th>
                    <th className="p-3 text-right">Outstanding Amt</th>
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
                            The maesters are fetching the loan scrolls...
                          </span>
                        </td>
                      </motion.tr>
                    ) : (
                      loans.map((loan, index) => (
                        <motion.tr
                          key={index}
                          className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="p-3">{convertToGotDate(loan.startDt)}</td>
                          <td className="p-3 flex items-center">
                            {getLoanIcon(revampLoanType(loan.loanType))}
                            {revampLoanType(loan.loanType)}
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(loan.totalLoan)}
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(loan.amountPaid)}
                          </td>
                          <td className="p-3 text-right">
                            {formatCurrency(loan.outstandingAmount)}
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
            The Stark Bank will have its due. Winter is coming, and debts must be
            paid.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
