"use client"

import { getResultTestApi } from "@/app/_helpers/api"
import { LoadingSpinner } from "@/app/_helpers/components/loding-spinner"
import { ResultQuestionItem } from "@/app/_helpers/components/result-question-item"
import { Context } from "@/app/_helpers/context"
import { IContext } from "@/app/_helpers/types"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function ResultTest () {
    
    const {state, dispatch} = useContext(Context) as IContext
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const router = useRouter()
    const params = useParams()
    const {user, id} = params 

    if(!state) {
        throw new Error('throw new Error("Context must be used within a Context.Provider")')
    }

    useEffect(() => {
        if(user) {
            getResultTestApi(user as string, Number(id))
            .then(response => {
                dispatch({type: 'result/test', payload: response.payload})
                setIsLoading(false)
            })
        }
    }, [])

    return (
        <>
            <h1 className="select-none text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-600 to-blue-300 shadow-lg my-8">
                Quizzes Platform
            </h1>
                <main className="max-w-4xl mx-auto bg-gray-800 shadow-md rounded-lg p-6 mt-6">
                    {isLoading && <LoadingSpinner />}
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {state.resultTest?.test_title}
                    </h2>

                    <p className="text-lg text-gray-300 mb-4">
                        Correct answers: 
                        <strong className="text-green-400">
                            {`${state.resultTest?.result} / ${state.resultTest?.questions.length}`}
                        </strong>
                    </p>

                    <div className="space-y-4">
                        {state.resultTest?.questions.map(question => (
                            <ResultQuestionItem
                                key={question.id}
                                question={question}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button 
                            className="px-6 py-2  bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:via-purple-700 hover:to-blue-600 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
                            onClick={() => router.push('/profile')}
                        >
                            Profile
                        </button>
                    </div>


                </main>
        </>
    )
}