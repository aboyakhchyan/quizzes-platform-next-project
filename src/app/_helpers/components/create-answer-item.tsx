import { useContext } from "react";
import { IAnswer, IContext, IPayload } from "../types";
import { Context } from "../context";

interface IProps {
    option: IAnswer
    questId: number | undefined
}

export const CreateAnswerItem = ({ option, questId }: IProps) => {

    const {dispatch} = useContext(Context) as IContext

    return (
        <div className="flex items-center space-x-4">
            <input
                type="text"
                placeholder="Enter answer"
                className="w-full p-2 border rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:border-gray-600"
                value={option.text}
                style={option.isCorrect ? {background: 'green'} : {}}
                onDoubleClick={() => dispatch({type: 'change/correct', payload: {questId: questId, optId: option.id}})}
                onChange={e => dispatch({type: 'answer/text', payload: {optId: option.id, questId: questId, text: e.target.value}})}
            />

            
            <button
                className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-400"
                onClick={() => dispatch({type: 'delete/answer', payload: {optId: option.id, questId: questId}})}
            >
                x
            </button>
        </div>
    );
};
