"use client"

import { useState } from "react";
import styles from './register-page.module.css'
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/app/_helpers/yup";
import { InputUser } from "@/app/_helpers/types";
import { registrationUserApi } from "@/app/_helpers/api";
import { redirect } from "next/navigation";

export default function RegisterPage() {
    const [passwordType, setPasswordType] = useState<string>("password")
    const [serverError, setServerError] = useState<string>('')

    const togglePasswordVisibility = () => {
        setPasswordType(prevType => (prevType === "password" ? "text" : "password"))
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
      resolver: yupResolver(registerSchema)
    })

    const handleRegistrationUser = async (data: InputUser) => {
      const response = await registrationUserApi(data)
          if(response.status == 'error' && response.message) {
            setServerError(response.message)
          }else {
            setServerError('')
            reset()
            redirect('login-page')
          }
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="select-none text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-600 to-blue-300 shadow-lg transform hover:scale-105 transition-transform duration-300 mr-12">
                Quizzes Platform
        </h1>
        <form 
            className="bg-gray-800 p-10 rounded-lg shadow-lg w-96 max-w-md space-y-6 transform -translate-y-10"
            onSubmit={handleSubmit(handleRegistrationUser)}
        >
          <h2 className="text-2xl font-semibold text-center text-white">Sign Up</h2>
  
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </label>
            <input 
              type="text"
              placeholder="Enter name"
              {...register('name')}
              name="name"
              className="mt-2 p-3 w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              style={errors.name && {border: '1px solid red'}}
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="surname" className="block text-sm font-medium text-gray-300">Surname
                {errors.surname && <p className="text-red-600">{errors.surname.message}</p>}
            </label>
            <input 
              type="text"
              placeholder="Enter surname"
              {...register('surname')}
              name="surname"
              className="mt-2 p-3 w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              style={errors.surname && {border: '1px solid red'}}
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="login" className="block text-sm font-medium text-gray-300">Login
              {errors.login && <p className="text-red-600">{errors.login.message}</p>}
            </label>
            <input 
              type="text" 
              placeholder="Enter login"
              {...register('login')}
              name="login"
              className="mt-2 p-3 w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              style={errors.login && {border: '1px solid red'}}
            />
          </div>
  
          <div className="mb-6 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                <input 
                    type={passwordType} 
                    placeholder="Enter password"
                    {...register('password')}
                    name="password"
                    className="mt-2 p-3 w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all pr-10" 
                    style={errors.password && {border: '1px solid red'}}
                />
                <img 
                    src="./images/eyes.png" 
                    alt="Toggle Password Visibility"
                    className={styles.eyesPassword}
                    onClick={togglePasswordVisibility}
                />
           </div>

           {errors.password && <p className="text-red-600">{errors.password.message}</p>}
           {(errors.name || errors.login || errors.surname || errors.password || serverError) &&
            <p className="text-red-600">{serverError}</p> }

          <div>
            <button 
              type="submit"
              className="w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2  transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center">
          <Link 
            href='/login-page'
            className="text-indigo-400 hover:text-indigo-600 transition-colors duration-300"
          >
            Do you already have an account?
          </Link>
        </div>
        </form>
      </div>
    );
  }
  