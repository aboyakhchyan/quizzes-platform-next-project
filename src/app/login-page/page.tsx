"use client"

import { useState } from "react";
import styles from './page-login.module.css';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loignSchema } from "@/app/_helpers/yup";
import { ILoginUser } from "@/app/_helpers/types";
import { loginUserApi } from "@/app/_helpers/api";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [passwordType, setPasswordType] = useState<string>('password')
  const [serverError, setServerError] = useState<string>('')

  const togglePasswordVisibility = () => {
    setPasswordType(prevType => (prevType === 'password' ? 'text' : 'password'))
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(loignSchema)
  })

  const handleLoginUser = async (data: ILoginUser) => {
      const response = await loginUserApi(data)
          if(response.status == 'error' && response.message) {
              setServerError(response.message)
          }else {
              setServerError('')
              reset()
              redirect('profile')
          }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">

        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-600 to-blue-300 shadow-lg transform hover:scale-105 transition-transform duration-300 mr-12 select-none">
                Quizzes Platform
        </h1>
      <form 
          className="bg-gray-800 p-10 rounded-lg shadow-lg w-96 max-w-md space-y-6 transform -translate-y-10"
          onSubmit={handleSubmit(handleLoginUser)}
      >
        <h2 className="text-2xl font-semibold text-center text-white">Sign In</h2>

        <div className="mb-6">
          <label htmlFor="login" className="block text-sm font-medium text-gray-300">Login
            {errors.login && <p className="text-red-600">{errors.login.message}</p>}
          </label>
          <input 
            type="text" 
            placeholder="Enter login"
            {...register('login')}
            style={errors.login && {border: '1px solid red'}}
            name="login"
            className="mt-2 p-3 w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password
          </label>
          <input 
            type={passwordType} 
            placeholder="Enter password"
            {...register('password')}
            style={errors.password && {border: '1px solid red'}}
            name="password"
            className="mt-2 p-3 w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all pr-10"
          />
          <img 
            src="./images/eyes.png" 
            alt="Toggle Password Visibility"
            className={styles.eyesPassword}
            onClick={togglePasswordVisibility}
          />
        </div>

        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        {(errors.login || errors.password || serverError) &&
          <p className="text-red-600">{serverError}</p>}

        <div>
          <button 
            type="submit"
            className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
        </div>

        <div className="text-center">
          <Link
            href='/register-page'
            className="text-indigo-400 hover:text-indigo-600 transition-colors duration-300"
          >
            Register an account
          </Link>
        </div>
      </form>
    </div>
  )
}
