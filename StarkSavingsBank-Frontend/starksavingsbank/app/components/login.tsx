"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { User } from "../model/user.model";
import validateLoginDetails from "../services/loginService";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sword, Shield, Feather, Scroll, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

type FormData = {
  email: string;
  password: string;
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

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [quirkySaying, setQuirkySaying] = useState("");
  const [showDirewolf, setShowDirewolf] = useState(false);
  const [currentHouse, setCurrentHouse] = useState("Stark");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated, checkAuth } = useAuth();

  const quirkySayings = [
    "A Stark always pays their debts... to the Iron Bank!",
    "Valar Morghulis... but first, Valar Loginulis!",
    "The night is dark and full of... forgotten passwords?",
    "You know nothing, Jon Snow oh wait, you're not Jon.",
    "Hold the door... while we verify your credentials!",
    "Winter is coming... but your account access is here!",
    "By the old gods and the new, grant me... login access!",
    "A Lannister always pays their debts, but do they remember their passwords?",
    "Dracarys! ...is not a valid password, Khaleesi.",
    "The Citadel's archives are vast, but your login is simple!",
  ];

  useEffect(() => {
    const randomSaying =
      quirkySayings[Math.floor(Math.random() * quirkySayings.length)];
    setQuirkySaying(randomSaying);

    const houseInterval = setInterval(() => {
      setCurrentHouse((prevHouse) => {
        const currentIndex = houses.findIndex((h) => h.name === prevHouse);
        return houses[(currentIndex + 1) % houses.length].name;
      });
    }, 10000); // Change house every 10 seconds for a more subtle transition

    return () => clearInterval(houseInterval);
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoginError(null);
    setShowDirewolf(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const loginResponse = validateLoginDetails(data);
      loginResponse
        .then((response) => {
          const user = new User(
            response.data.id,
            response.data.name,
            response.data.mobileNumber,
            response.data.email,
            response.data.password,
            response.data.role,
            response.data.statusCd,
            response.data.statusMsg,
            response.data.authStatus,
            response.data.houseAffiliation
          );

          user.authStatus = "AUTH";
          sessionStorage.setItem("userdetails", JSON.stringify(user));

          const xsrf = Cookies.get("XSRF-TOKEN");
          sessionStorage.setItem("XSRF-TOKEN", xsrf!);

          const authHeader = response.headers;
          if (authHeader) {
            sessionStorage.setItem(
              "Authorization",
              authHeader["authorization"]
            );
          }

          setIsAuthenticated(true);
          checkAuth();

          router.push("http://localhost:3000/dashboard");
        })
        .catch((error) => {
          setLoginError(
            "The ravens couldn't verify your credentials. Please try again."
          );
          console.log(error);
          setShowDirewolf(false);
        });
    } catch (error) {
      setLoginError(
        "The maesters are having trouble with the login scrolls. Please try again."
      );
      setShowDirewolf(false);
      console.log(error);
    }
  };

  const currentHouseData =
    houses.find((h) => h.name === currentHouse) || houses[0];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-700 to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-1000`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-black bg-opacity-50 p-10 rounded-xl shadow-2xl relative overflow-hidden border border-gray-700"
      >
        <div className="relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-4 group">
            <Image
              src="/assets/stark_sigil.png"
              alt="StarkSavingsBank"
              layout="fill"
              className="rounded-full object-cover transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50"
            />
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white font-medieval">
            Enter the Realm of StarkSavingsBank
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{" "}
            <Link
              href="/register"
              className="font-medium text-blue-400 hover:text-blue-300 transition duration-300"
            >
              join the Night&apos;s Watch (create an account)
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Raven&apos;s Address (Email)
              </label>
              <Scroll className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pl-10 transition-all duration-300"
                placeholder="Raven's Address (Email)"
                {...register("email", {
                  required:
                    "A raven without an address is like a knight without a sword",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Even wildlings know a proper raven's address",
                  },
                })}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Secret Valyrian Phrase (Password)
              </label>
              <Feather className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pl-10 pr-10 transition-all duration-300"
                placeholder="Secret Valyrian Phrase (Password)"
                {...register("password", {
                  required: "A Stark never forgets their secret phrase",
                  minLength: {
                    value: 5,
                    message:
                      "Your secret phrase must be longer than Tyrion Lannister",
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {(errors.email || errors.password || loginError) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-2 p-2 bg-red-900 bg-opacity-50 rounded"
              >
                {errors.email && <p>{errors.email.message}</p>}
                {errors.password && <p>{errors.password.message}</p>}
                {loginError && <p>{loginError}</p>}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-blue-400 hover:text-blue-300 transition duration-300"
              >
                Did the Three-Eyed Raven steal your memory?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isSubmitting ? (
                  <Shield
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400 animate-pulse"
                    aria-hidden="true"
                  />
                ) : (
                  <Sword
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                )}
              </span>
              {isSubmitting
                ? "Summoning the Banners..."
                : "Ride North (Sign In)"}
            </button>
          </div>
        </form>
        <AnimatePresence>
          {showDirewolf && (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="inline-block animate-bounce">
                <span role="img" aria-label="Direwolf" className="text-4xl">
                  {currentHouseData.sigil}
                </span>
              </div>
              <p className="text-white mt-2 font-medieval">{quirkySaying}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
