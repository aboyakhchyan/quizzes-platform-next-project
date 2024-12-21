import { ITest, ITestReq, IUser } from "@/app/_helpers/types";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { insertAnswer, insertQuestion, insertTest } from "@/app/_helpers/model";
import { createWriteStream } from "fs";

export const POST = async (req: NextRequest) => {
    
    const form = await req.formData()
    const test = await JSON.parse(form.get('test') as string) as ITest
    const file = await form.get('image') as File
    
    let filename = file ? Date.now().toString() + '.' + file.name.split('.').at(-1) : null

    if(file) {
        const stream = createWriteStream('public/images/' + filename)
        const buffer = await file.arrayBuffer()
        stream.write(Buffer.from(buffer))
    }

    const token = (await cookies()).get('auth')?.value as string
    const user = jwt.verify(token, process.env.SECRET_KEY as string) as IUser

    const resultTest = await insertTest(test.title, user.id, filename)

    if(!resultTest.changes) {
        return Response.json({status: 'error', message: 'Internal server error'})
    }


    for(let i = 0; i < test.questions.length; ++i) {
        const quest = test.questions[i]
        const resultQuest = await insertQuestion(quest.text, resultTest.lastInsertRowid as number)

        if(!resultQuest.changes) {
            return Response.json({status: 'error', message: 'Internal server error'})
        }


        for(let j = 0; j < quest.options.length; ++j) {
            const answer = quest.options[j]
            const resultAnswer = await insertAnswer(answer.text, Number(answer.isCorrect), resultQuest.lastInsertRowid)

            if(!resultAnswer.changes) {
                return Response.json({status: 'error', message: 'Internal server error'})
            }
        }

    }

    return Response.json({status: 'ok', payload: test})
}