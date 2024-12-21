"use client"

import { getScoresTestApi } from "@/app/_helpers/api"
import { LoadingSpinner } from "@/app/_helpers/components/loding-spinner"
import { ScoresTestItem } from "@/app/_helpers/components/scroes-test-item"
import { Context } from "@/app/_helpers/context"
import { IContext } from "@/app/_helpers/types"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function ScoresTest() {
    const params = useParams()
    const { id } = params
    const { state, dispatch } = useContext(Context) as IContext
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getScoresTestApi(Number(id)).then((response) => {
            if (response.status === "ok") {
                dispatch({ type: "scores/test", payload: response.payload })
                setIsLoading(false)
            }
        })
    }, [])

    return (
        <>
            <h1 className="select-none text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-600 to-blue-300 shadow-lg my-8 dark:from-blue-600 dark:via-purple-800 dark:to-blue-600">
                Quizzes Platform
            </h1>

            <main className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg dark:bg-gray-900 dark:shadow-2xl">
                {isLoading && <LoadingSpinner />}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
                    {state.scoresTest?.test.title || "Test Title"}
                </h2>

                <div className="flex justify-center mb-8">
                    {
                        state.scoresTest?.test.img_url ? (
                        <img
                        src={`../images/${state.scoresTest?.test.img_url}`}
                        alt="Test"
                        className="w-64 h-64 object-cover rounded-lg shadow-md"
                        />
                        ) : (
                        <h3 className="text-6xl text-center mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-700 to-blue-300 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <span className="block">Quizzes</span>
                            <span className="block">Platform</span>
                        </h3>
                        )
                    }
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300 dark:border-gray-700 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                <th className="px-6 py-4 text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700">
                                    Login
                                </th>
                                <th className="pl-12 px-6 py-4 text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700">
                                    Correct answers
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.scoresTest?.scores.map((score) => (
                                <ScoresTestItem
                                    key={score.id}
                                    score={score}
                                    questionLength={state.scoresTest?.questions.length}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}
