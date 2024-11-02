'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '../model/user.model'
import validateLoginDetails from '../services/loginService'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormData = {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();


  const onSubmit = async (data: FormData) => {
    setLoginError(null)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Login attempt:', data)
      // Add your login logic here
      

      const loginResponse = validateLoginDetails(data);
      loginResponse.then(response => {
        const user = new User(response.data.id, response.data.name, response.data.mobileNumber, response.data.email, response.data.password, response.data.role, response.data.statusCd, response.data.statusMsg, response.data.authStatus);


        user.authStatus = "AUTH";
        sessionStorage.setItem("userdetails", JSON.stringify(user))
        console.log("Successful Login inside LoginResponse")

        const xsrf = Cookies.get("XSRF-TOKEN");
        sessionStorage.setItem("XSRF-TOKEN", xsrf!);

        const authHeader = response.headers;
        if(authHeader) {
          console.log(authHeader["authorization"]);
          sessionStorage.setItem("Authorization", authHeader["authorization"])
        }

        router.push("http://localhost:3000/dashboard")

      }).catch(error => {
        setLoginError("Invalid email or password");
        console.log(error);
        
      })
      

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoginError('Failed to login. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-xl shadow-2xl relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10" 
          style={{ backgroundImage: "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZAZsfpUGQIlYM8OoAS1tTRTuS2nhsMV_3nLIidEPaUSMVfuYFmlrKcw35qjQZ5BPV7eo5jC1R35FyOzegmZOtxUnQRowkERRNux8DgjSNBIcFc4KzLtuaDzanSsleoo_G-lbL3GLvpts-/s1600/Stark+Castle.jpg')" }}
        ></div>
        <div className="relative">
        <div className="relative w-20 h-20 transform transition-transform duration-300 group-hover:scale-110 mx-auto">
                <Image
                  src="https://a0.anyrgb.com/pngimg/1464/1846/stark-logo-catelyn-stark-bran-stark-prince-of-winterfell-eddard-stark-silver-shield-winter-is-coming-house-stark-sigil-stark-thumbnail.png"
                  alt="StarkSavingsBank"
                  layout='fill'
                  className="rounded-full object-cover "
                />
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300">
              start your journey with StarkSavingsBank
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 5,
                    message: 'Password must be at least 5 characters long'
                  }
                })}
              />
            </div>
          </div>

          {(errors.email || errors.password || loginError) && (
            <div className="text-red-400 text-sm mt-2">
              {errors.email && <p>{errors.email.message}</p>}
              {errors.password && <p>{errors.password.message}</p>}
              {loginError && <p>{loginError}</p>}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}