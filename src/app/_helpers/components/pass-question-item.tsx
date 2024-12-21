import { IQuestion } from "../types"
import { PassAnswerItem } from "./pass-answer-item"

interface IProps {
    question: IQuestion
}

export const PassQuestionItem = ({ question }: IProps) => {
    return (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-lg text-white">
            <p className="text-lg font-semibold mb-4">{question.text}</p>

            <div className="space-y-4">
                {question.options.map(opt => (
                    <PassAnswerItem
                        key={opt.id}
                        question={question}
                        answer={opt}
                    />
                ))}
            </div>
        </div>
    )
}
