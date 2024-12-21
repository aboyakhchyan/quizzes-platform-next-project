import { IQuestion } from "../types"
import { ResultAnswerItem } from "./result-answer-item"

interface IProps {
    question: IQuestion
}

export const ResultQuestionItem = ({ question }: IProps) => {
    return (
        <div className="bg-gray-700 dark:bg-gray-800 border border-gray-600 rounded-md p-4 mb-4 shadow-sm">
            <p className="text-lg font-semibold text-gray-200 dark:text-gray-300 mb-2">
                {question.text}
            </p>

            <ul className="space-y-2">
                {question.options.map(opt => (
                    <ResultAnswerItem
                        key={opt.id}
                        answer={opt}
                        selectedAnswer={question.selected_answer}
                    />
                ))}
            </ul>
        </div>
    )
}
