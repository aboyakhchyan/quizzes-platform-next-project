import { useContext } from "react";
import { IContext, IQuestion } from "../types";
import { Context } from "../context";
import { CreateAnswerList } from "./create-answer-list";

interface IProps {
    question: IQuestion;
    index: number;
}

export const CreateQuestionItem = ({ question, index }: IProps) => {
    const { dispatch } = useContext(Context) as IContext;

    return (
        <div className="flex flex-col space-y-4 p-4 border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600">
            <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-gray-100">
                Question number {index}
            </h3>

            <div className="flex justify-between items-center">
                <button
                    className="text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => dispatch({ type: "quest/delete", payload: question.id })}
                >
                    Delete question
                </button>

                <button
                    className="text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => dispatch({ type: "quest/duplicate", payload: question })}
                >
                    Add a duplicate
                </button>
            </div>

            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-500"
                placeholder="Enter question text"
                value={question.text}
                onChange={(e) =>
                    dispatch({ type: "quest/text", payload: { text: e.target.value, id: question.id } })
                }
            />

                <CreateAnswerList question={question} />

            
            <div className="flex justify-center items-center">
                <button
                    className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => dispatch({ type: "add/option", payload: question.id })}
                >
                    +
                </button>
            </div>
        </div>
    );
};
