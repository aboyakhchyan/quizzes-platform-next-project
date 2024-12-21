import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { IUser } from "@/app/_helpers/types";
import { checkPassTest } from "@/app/_helpers/model";

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

    const check = await checkPassTest(user.id, id)

    if(check) {
        return Response.json({status: 'error', message: 'You have already completed this test'})
    }

    return Response.json({status: 'ok'})
}