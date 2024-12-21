import { IAnswer } from "../types"

interface IProps {
    answer: IAnswer
    selectedAnswer: string | undefined
}

export const ResultAnswerItem = ({ answer, selectedAnswer }: IProps) => {
    return (
        <li 
            className='p-3 rounded-md border list-none  bg-gray-700 border-gray-600 text-gray-200 dark:text-gray-300 shadow-sm'
            style={(selectedAnswer === answer.option) && Number(answer.correct_answer) ? {background: 'green'} : 
                   (selectedAnswer === answer.option) && !Number(answer.correct_answer) ? {background: 'red'} :
                   Number(answer.correct_answer) ? {background: 'green'} : {}
        }
        >
            <p className="text-base">
                {answer.option}
            </p>
        </li>
    )
}
