import { getAnswersByQuestionId, getQuestionsByTestId, getTestById } from "@/app/_helpers/model";
import { IQuestion, ITest, IUser } from "@/app/_helpers/types";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

interface IProps {
    params: {id: number}
}

export const GET = async (req: NextRequest, {params}: IProps) => {
    const {id} = await params
    
    const token = (await cookies()).get('auth')?.value

    if(!token) {
    return Response.json({status: 'error', message: 'Token not found'})
    }

    const user = jwt.verify(token, process.env.SECRET_KEY as string) as IUser

    if(!user) {
        return Response.json({status: 'error', message: 'User not found'})
    }

    const test = await getTestById(id) as ITest
    const questions = await getQuestionsByTestId(id) as IQuestion[]


    const updateQuestions = await Promise.all(
      questions.map(async (question) => {
        const answers = await getAnswersByQuestionId(question.id) 

        return {
            ...question,
            options: answers,
        }
    })
  )

  const result = {
    id: test.id,
    test_title: test.title,
    img_url: test.img_url,
    questions: updateQuestions,
    user_login: user.login
  }
    
    
    return Response.json({status: 'ok', payload: result})
}