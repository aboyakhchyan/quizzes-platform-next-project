"use client"

import { useContext, useRef, useState } from "react"
import { Context } from "../_helpers/context"
import { IContext } from "../_helpers/types";
import { CreateQuestionList } from "../_helpers/components/create-question-list";
import { createTestApi } from "../_helpers/api";
import { useRouter } from "next/navigation";

export default function TestAdd() {

    const { state, dispatch } = useContext(Context) as IContext
    const [fieldError, setFieldError] = useState<string>('')
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [fileImage, setFileImage] = useState<File | null>(null)
    const router = useRouter()

    const image = useRef<HTMLInputElement | null>(null)

    if (!state) {
        throw new Error('Context must be used within a Context.Provider')
    }

    const validateTest = () => {
        if (!state.test.title.trim()) {
            setFieldError('Every test must have a name')
            return false
        }

        if(state.test.questions.length <= 0) {
            setFieldError('Each test must have at least one question')
            return false
        }

        const questionText = new Set()
    
        for (let i = 0; i < state.test.questions.length; ++i) {
            const quest = state.test.questions[i]
    
            if (!quest.text.trim()) {
                setFieldError('All fields must be filled in')
                return false
            }

            if(questionText.has(quest.text.trim())) {
                setFieldError('Two questions cannot have the same question')
                return false
            }
            questionText.add(quest.text.trim());

            if (quest.options.length < 2) {
                setFieldError('Every question must have at least two answers')
                return false
            }
    
            let hasCorrectOption = false;
            for (let j = 0; j < quest.options.length; ++j) {
                const option = quest.options[j]
    
                if (!option.text.trim()) {
                    setFieldError('All fields must be filled in')
                    return false
                }
    
                if (option.isCorrect) {
                    hasCorrectOption = true
                }
            }
    
            if (!hasCorrectOption) {
                setFieldError('Every question must have a correct answer')
                return false
            }
        }
    
        setFieldError('')
        return true
    }

    const handleUploadImage = () => {
        if(image.current) {
            const file = image.current.files?.[0]

            if(file) {
                setPreviewImage(URL.createObjectURL(file))
                setFileImage(file)
            }
        }
    }


    const handleCreateTest = () => {
        if(validateTest()) {
            const form = new FormData()
            form.append('test', JSON.stringify(state.test))
            if(fileImage) {
                form.append('image', fileImage)
            }
            createTestApi(form)
            .then(response => {
                if(response.status == 'ok') {
                    router.push('/profile')
                }
            })
        }
    }


    return (
        <>
            <h1 className="select-none text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-600 to-blue-300 shadow-lg ">
                Quizzes Platform
            </h1>
    
        <main className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg max-w-3xl mt-5  mx-auto py-8 px-4">
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5 text-center">
                Create Test
            </h2>

            <input 
                type="file"
                ref={image}
                onChange={handleUploadImage}
                className="hidden"
            />

            <button
                onClick={() => image.current?.click()}
                className="w-full p-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md 
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                        transition duration-200"
            >
                Upload Image
            </button>

            {previewImage && (
                    <div className="m-3">
                        <img
                            src={previewImage}
                            alt="Uploaded Preview"
                            className="w-full h-auto max-h-60 object-contain border border-gray-300 rounded-lg"
                        />
                    </div>
                )}

                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Test Name
                </label>
                <input
                    type="text"
                    className="w-full p-3 border rounded bg-white text-gray-900 placeholder-gray-400 
                    dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 
                    border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 dark:focus:ring-blue-400 mb-4"
                    placeholder="Enter test name"
                    value={state.test.title}
                    onChange={(e) => dispatch({ type: "test/name", payload: e.target.value })}
                />

            <div className="space-y-4 mb-4">
                <CreateQuestionList />
            </div>

            <button 
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                onClick={handleCreateTest}
            >
                Create
            </button>

            {fieldError && <p className="bg-red-500 m-2 p-3">{fieldError}</p>}
        </main>
        </>
    )
}
