import { IQuestion } from "../types"
import { CreateAnswerItem } from "./create-answer-item"

interface IProps {
    question: IQuestion
}

export const CreateAnswerList = ({question}: IProps) => {
    return (
        <div className="space-y-4">
            {
                question.options.map(opt => <CreateAnswerItem
                                        key={opt.id}
                                        option={opt}
                                        questId={question.id}
                                    />)
            }
        </div>
    )
}