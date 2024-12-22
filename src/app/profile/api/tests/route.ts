import { getAllTests, getUserById } from "@/app/_helpers/model"
import { ITest, IUser } from "@/app/_helpers/types"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    const url = new URL(req.url)
    const testTitle = url.searchParams.get('title')

    const tests = await getAllTests() as ITest[]

    const filteredTests = await Promise.all(testTitle 
    ? tests.filter(test => test.title.toLocaleLowerCase().startsWith(testTitle.toLocaleLowerCase()))
    : tests)

    console.log(filteredTests)

    if(Array.isArray(filteredTests) && filteredTests.length <= 0) {
        return Response.json({status: 'error', message: 'Test not a found'})
    }

    
    for(let i = 0; i < filteredTests.length; ++i) {
        let test = filteredTests[i]
        const user = await getUserById(test.user_id as number) as IUser
        test.user_login = user.login
    }
    
    return Response.json({status: 'ok', payload: filteredTests})
}