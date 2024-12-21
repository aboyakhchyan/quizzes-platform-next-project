import { getAllAnswers, getAllQuestions, getAllTests, getUserById } from "@/app/_helpers/model"
import { IAnswer, IQuestion, ITest, IUser } from "@/app/_helpers/types"

export const GET = async () => {
    const tests = await getAllTests() as ITest[]

    for(let i = 0; i < tests.length; i++) {
        let test = tests[i]
        const user = await getUserById(test.user_id as number) as IUser
        test.user_login = user.login
    }
    
    return Response.json({status: 'ok', payload: tests})
}