import { useContext } from "react"
import { IAnswer, IContext, IQuestion } from "../types"
import { Context } from "../context"

interface IProps {
    answer: IAnswer
    question: IQuestion
}

export const PassAnswerItem = ({ answer, question }: IProps) => {

    const {dispatch} = useContext(Context) as IContext

    return (
        <div 
            className="p-3 bg-gray-700 rounded-md shadow-md text-white hover:bg-gray-600 cursor-pointer transition-colors"
            style={(question.selected_answer && question.selected_answer == answer.option) ? {background: 'indigo'} : {}}
            onClick={() => dispatch({type: 'add/select-answer', payload: {optText: answer.option, questId: question.id}})}
        >
            <p>{answer.option}</p>
        </div>
    )
}
