import { getQuestionsByTestId, getScoresTest, getTestById, getUserById } from "@/app/_helpers/model";
import { IQuestion, IScore, ITest } from "@/app/_helpers/types";
import { NextRequest } from "next/server";

interface IProps {
    params: {id: number}
}

export const GET = async (req: NextRequest, {params}: IProps) => {
    const {id} = await params

    const test = await getTestById(id) as ITest
    const questions = await getQuestionsByTestId(test.id) as IQuestion[]

    const scores = await getScoresTest(test.id) as IScore[]

    const newScores = await Promise.all(
        scores.map(async (score) => {
            const user = await getUserById(score.user_id)

            return {
                ...score,
                user_login: user?.login
            }
        })
    )

    const result = {
        scores: newScores,
        test: test,
        questions: questions
    }

    return Response.json({status: 'ok', payload: result})
}