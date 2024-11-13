"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scroll,
  Feather,
  Flame,
  Snowflake,
  Sun,
  Cloud,
  Calendar,
} from "lucide-react";
import { AppConstants } from "../constants/app.constants";
import axios from "axios";
import { Notice } from "../model/notice.model";
import GlobalExceptionPage from "../global-exception-page/pages";

const houses = {
  Stark: { icon: Snowflake, color: "text-blue-400", bgColor: "bg-blue-900" },
  Lannister: { icon: Sun, color: "text-yellow-400", bgColor: "bg-red-900" },
  Targaryen: { icon: Flame, color: "text-red-400", bgColor: "bg-black" },
  Baratheon: { icon: Cloud, color: "text-gray-400", bgColor: "bg-yellow-900" },
  Other: { icon: Feather, color: "text-green-400", bgColor: "bg-gray-900" },
};

export default function QuirkyNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHouse, setSelectedHouse] = useState<
    keyof typeof houses | "All"
  >("All");

  useEffect(() => {
    const fetchNotices = async () => {

      // Simulating API call
      axios
        .get(AppConstants.ROOT_URL + AppConstants.NOTICES_API_URL)
        .then((response) => {
          const noticeResponse: Notice[] = response.data;
          setNotices(noticeResponse);
        }).catch(error => {
            console.log("Error occured while fetching notices due to : " + error);
            return <GlobalExceptionPage status={500} />
        })

      setIsLoading(false);
    };
    fetchNotices();
  }, []);

  const filteredNotices =
    selectedHouse === "All"
      ? notices
      : notices.filter((notice) => notice.houseAffiliation === selectedHouse);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Ravens from the Realm
        </h1>

        <div className="mb-8 flex justify-center">
          <select
            value={selectedHouse}
            onChange={(e) =>
              setSelectedHouse(e.target.value as keyof typeof houses | "All")
            }
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Houses</option>
            {Object.keys(houses).map((house) => (
              <option key={house} value={house}>
                {house}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Scroll className="w-16 h-16 text-blue-400" />
            </motion.div>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNotices.map((notice) => {
                const house =
                  houses[notice.houseAffiliation as keyof typeof houses] ||
                  houses.Other;
                const Icon = house.icon;

                return (
                  <motion.div
                    key={notice.noticeId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-gray-800 rounded-lg shadow-xl overflow-hidden border-t-4 ${house.bgColor}`}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Icon className={`w-8 h-8 ${house.color} mr-3`} />
                        <h2 className="text-xl font-semibold">
                          {notice.noticeSummary}
                        </h2>
                      </div>
                      <p className="text-gray-300 mb-4">
                        {notice.noticeDetails}
                      </p>
                      <div className="flex items-center text-sm text-gray-400 mb-6">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Issued: {notice.issuedDate}</span>
                      </div>
                      <Link
                        href="/contact"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        Send a Raven <Feather className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
