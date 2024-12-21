import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

export const GET = async () => {
    try{
        const token = (await cookies()).get('auth')?.value

        if(!token) {
        return Response.json({status: 'error', message: 'Token not found'})
        }

        const payload = jwt.verify(token, process.env.SECRET_KEY as string)

        if(payload) {
            return Response.json({status: 'ok', payload: payload})
        }
    }catch (_) {
        return Response.json({status: 'error', message: ' Internal server errror'})
    }
}

export const POST = async () => {
    ;(await cookies()).delete('auth')

    return Response.json({status: 'ok'})
}