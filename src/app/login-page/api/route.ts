import { getUserByLogin } from "@/app/_helpers/model"
import { ILoginUser} from "@/app/_helpers/types"
import { NextRequest } from "next/server"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"

export const POST = async (req: NextRequest) => {
    const user = await req.json() as ILoginUser
    const {login, password} = user

    if(!login.trim() || !password?.trim()) {
        return Response.json({status: 'error', message: 'Please fill all the fields'})
    }

    const found = await getUserByLogin(login) 
    if(!found) {
        return Response.json({status: 'error', message: 'Wrong credentials'})
    }

    const match = await bcrypt.compare(password, found.password as string)
    if(!match) {
        return Response.json({status: 'error', message: 'Wrong credentials'})
    }

    const token = jwt.sign({
        id: found.id,
        name: found.name,
        surname: found.surname,
        login: found.login
        },
        process.env.SECRET_KEY as string,
        {expiresIn: '1h'}
    )

    ;(await cookies()).set('auth', token)

    return Response.json({status: 'ok'})
}