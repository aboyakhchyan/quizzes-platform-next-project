import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { IAnswer, IPassTest, IQuestion, IResult, IScore, ITest, IUser } from "@/app/_helpers/types";
import { getAnswersByQuestionId, getQuestionsByTestId, getResultByQuestAndUserId, getScoreByTestAndUserId, getTestById, insertResultQuestion, insertTestScores } from "@/app/_helpers/model";

interface IProps {
    params: {user: string, id: number}
}

export const POST = async (req: NextRequest, {params}: IProps) => {
    const resultTest = await req.json() as IPassTest
    const token = (await cookies()).get('auth')?.value
    
    if(!token) {
        return Response.json({message: 'Token is not exist'})
    }

    const user = jwt.verify(token, process.env.SECRET_KEY as string) as IUser
    let correctCount = 0

    for(let i = 0; i < resultTest.questions.length; ++i) {
        const quest = resultTest.questions[i]
        const resultQuest = await insertResultQuestion(user.id, quest.id, quest.selected_answer)
        if(!resultQuest.changes) {
            return Response.json({status: 'error', message: 'Internal server error'})
        }
        
        for(let j = 0; j < quest.options.length; ++j) {
            const option = quest.options[j]
            if((quest.selected_answer === option.option) && Number(option.correct_answer) === 1) {
                console.log(quest.selected_answer, ":", option.option, ":", Number(option.correct_answer))
                ++correctCount
            }
        }
    }

    const testScores = await insertTestScores(user.id, resultTest.id, String(correctCount))

    if(!testScores.changes) {
        return Response.json({status: 'error', message: 'Internal server error'})
    }

    return Response.json({status: 'ok', payload: resultTest})
}


export const GET = async(req: NextRequest, {params}: IProps) => {
    const {id} = await params
    const token = (await cookies()).get('auth')?.value
    if(!token) {
        return Response.json({message: 'Token is not exist'})
    }
 
    const user = jwt.verify(token, process.env.SECRET_KEY as string) as IUser
    const test = await getTestById(Number(id)) as ITest

    const questions = await getQuestionsByTestId(test.id) as IQuestion[]
    const score = await getScoreByTestAndUserId(user.id, test.id) as IScore

    const newQuestion = await Promise.all(
        questions.map(async (question) => {
            const result = await getResultByQuestAndUserId(user.id, question.id) as IResult
            const answers = await getAnswersByQuestionId(question.id) as IAnswer[]

            return {
                ...question,
                selected_answer: result.selected_answer,
                options: answers,
            }
        })
    )
    const result = {
        id: test.id,
        test_title: test.title,
        result: score.result,
        questions: newQuestion
    }

    return Response.json({status: 'ok', payload: result})
}