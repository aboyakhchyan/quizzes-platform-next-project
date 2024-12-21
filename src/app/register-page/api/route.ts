import { getUserById, getUserByLogin, insertUser } from "@/app/_helpers/model";
import { InputUser } from "@/app/_helpers/types";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt'

export const POST = async (req: NextRequest) => {
    const user = await req.json() as InputUser
    const {name, surname, login, password} = user

    if(!name.trim() || !surname.trim() || !login.trim() || !password?.trim()) {
        return Response.json({status: 'error', message: 'Please fill all the fields'})
    }

    if(password.length < 8) {
        return Response.json({status: 'error', message: "Password is too short!!!" })
    }

    const found = await getUserByLogin(login)  
    if(found) {
        return Response.json({status: 'error', message: "Login is busy!"})
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const result = await insertUser({name, surname, login, password: passwordHash})
    if(result.changes) {
        const respUser = await getUserById(result.lastInsertRowid) 
        return Response.json({status: 'ok', payload: respUser})
    }else {
        return Response.json({status: 'error', message: 'Internal server error'})
    }
}