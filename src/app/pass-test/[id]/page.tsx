"use client";

import { checkPassTestApi, getPassTestApi, saveResultTestApi } from "@/app/_helpers/api";
import { LoadingSpinner } from "@/app/_helpers/components/loding-spinner";
import { PassQuestionItem } from "@/app/_helpers/components/pass-question-item";
import { Context } from "@/app/_helpers/context";
import { IContext } from "@/app/_helpers/types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export default function PassTest() {
  const { state, dispatch } = useContext(Context) as IContext
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [validateError, setValidateError] = useState<string>('')
  const [timer, setTimer] = useState<number>(119)
  const timeoutRef = useRef<number | null>(null)
  const router = useRouter()
  const questions = state.passTest?.questions
  const minute = Math.floor(timer / 60)
  const second = timer % 60

  if (!state) {
    throw new Error("Context must be used within a Context.Provider")
  }


  const params = useParams()
  const id = params.id

  useEffect(() => {
    if (id) {
      getPassTestApi(Number(id))
      .then((response) => {
        dispatch({ type: "pass/test", payload: response.payload })
        setIsLoading(false)
    });
    }
  }, [id])

  useEffect(() => {
    if(!isLoading) {
      timeoutRef.current = window.setInterval(() => {
        setTimer(prevTimer => {
          if(prevTimer <= 1) {
              if(timeoutRef.current) clearInterval(timeoutRef.current)
              return 0
          }
          return prevTimer - 1
      })
      }, 1000)
    }
      return () => {
        if(timeoutRef.current) clearInterval(timeoutRef.current)
      }
  }, [isLoading])

  const validateResult = () => {
      if(state.passTest) {
        for(let i = 0; i < state.passTest.questions.length; ++i) {
            const quest = state.passTest.questions[i]
              if(!quest.selected_answer) {
                  setValidateError('All questions must be marked')
                  return false
              }
        }
      }

      setValidateError('')
      return true
  }

  const handleSavePassResult = () => {
    if(validateResult() && state.passTest?.user_login) {
        checkPassTestApi(state.passTest.id)
        .then(response => {
          if(response.status == 'error' && response.message) {
              setValidateError('You have already passed this test')
          }else {
              setValidateError('')
              saveResultTestApi(state.passTest?.user_login, state.passTest)
              router.push(`/result-test/${state.passTest?.user_login}/${state.passTest?.id}`)
          }
        })
    }
  }


  return (
    <>
      <h1 className="select-none text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-600 to-blue-300 shadow-lg my-8">
        Quizzes Platform
      </h1>

      <main className="relative max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">  
        {timer ? (
          <div className="absolute top-4 right-4 bg-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow-md">
            {minute < 10 ? `0${minute}` : minute}:{second < 10 ? `0${second}` : second}
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-md">
            00:00
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          {state.passTest?.test_title || "Test Title Not Available"}
        </h2>

        <div className="flex justify-center mb-8">
          {state.passTest?.img_url ? (
            <img
              src={`../images/${state.passTest?.img_url}`}
              alt="Test"
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
          ) : (
            <h3 className="text-6xl text-center mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-700 to-blue-300 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="block">Quizzes</span>
              <span className="block">Platform</span>
            </h3>
          )}
        </div>

        {isLoading && <LoadingSpinner />}

        <div className="space-y-6">
          {questions?.map((question) => (
            <PassQuestionItem key={question.id} question={question} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button 
            disabled={timer <= 0 && true}
            style={timer <= 0 ? {background: 'red'} : {}}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            onClick={handleSavePassResult}
          >
            View results
          </button>
        </div>

        {validateError && <p className="bg-red-500 m-2 p-3">{validateError}</p>}
      </main>

    </>
  )
}
