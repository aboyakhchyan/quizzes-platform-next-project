"use client"

import localFont from "next/font/local";
import "./globals.css";
import { Context } from "@/app/_helpers/context";
import { IState } from "@/app/_helpers/types";
import { useReducer } from "react";
import reducer from "@/app/_helpers/reducer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 

  const initialState: IState = {
    test:  {
      title: '',
      questions: []
    },
    passTest: null,
    resultTest: null,
    scoresTest: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        <Context.Provider value={{state, dispatch}}>
          <main className="relative min-h-screen">
            {children}
          </main>
        </Context.Provider>
      </body>
    </html>
  );
}
