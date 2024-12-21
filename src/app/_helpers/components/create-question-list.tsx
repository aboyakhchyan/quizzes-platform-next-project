import { useContext } from "react"
import { Context } from "../context"
import { IContext } from "../types"
import { CreateQuestionItem } from "./create-question-item"

export const CreateQuestionList = () => {
    const { state, dispatch } = useContext(Context) as IContext

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
                {state.test.questions.map((item, index) => (
                    <CreateQuestionItem 
                        key={item.id}
                        index={index + 1}
                        question={item}
                    />
                ))}
            </div>
            
            <div className="flex justify-center mt-6">
                <button
                    className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => dispatch({type: 'add/quest', payload: null})}
                >
                    +
                </button>
            </div>
        </div>
    )
}
