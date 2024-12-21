import { IScore } from "../types"

interface IProps {
    score: IScore
    questionLength: number | undefined
}

export const ScoresTestItem = ({ score, questionLength }: IProps) => {
    return (
        <tr className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <td className="px-6 py-3 border-b border-gray-300 dark:border-gray-600 text-center">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {score.user_login}
                </p>
            </td>
            <td className="px-6 py-3 border-b border-gray-300 dark:border-gray-600 text-center">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-md inline-block">
                    {`${score.result} / ${questionLength}`}
                </p>
            </td>
        </tr>
    )
}
