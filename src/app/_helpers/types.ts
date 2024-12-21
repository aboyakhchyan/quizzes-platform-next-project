import { NextRequest } from "next/server"
import { Dispatch } from "react"

export interface IUser {
    id: number
    name: string
    surname: string
    login: string
    password?: string
}

export type InputUser = Omit<IUser, 'id'>

export type ILoginUser = Omit<InputUser, 'name' | 'surname'>


export interface IState{
    test: ITest
    passTest: IPassTest | null
    resultTest: IResultTest | null
    scoresTest: IScoresTest | null
}

export interface IAnswer {
    id?: number
    text: string
    option?: string
    isCorrect: boolean
    question_id?: number
    correct_answer?: number
}

export interface IQuestion {
    id?: number
    text: string
    options: IAnswer[]
    test_id?: number
    test_title?: string
    selected_answer?: string
}

export interface ITest {
    id?: number
    title: string
    questions: IQuestion[]
    user_id?: number
    img_url?: string
    user_login?: string
} 

export interface IPassTest {
    id:number
    test_title: string
    img_url: string
    questions: IQuestion[]
    user_login?: string
}

export interface IAction {
    type: string
    payload?: unknown
}

export interface IPayload {
    text?: string
    id?: number
    optId?: number
    questId?: number
    optText: string
}

export interface IContext {
    state: IState
    dispatch: Dispatch<IAction>
}


export interface IResopnse {
    status: string
    message?: string
    payload?: unknown
}

export interface ITestReq {
    test: ITest
    form: FormData
}

export interface IResult {
    id: number
    quest_id: number
    user_id:number
    selected_answer: string
}

export interface IResultTest {
    id: number
    result: string
    test_title: string
    questions: IQuestion[]
}

export interface IScoresTest {
    scores: IScore[]
    test: ITest
    questions: IQuestion[]
}

export interface IScore {
    id: number
    test_id: number
    user_id: number
    result: string
    user_login?: string
}