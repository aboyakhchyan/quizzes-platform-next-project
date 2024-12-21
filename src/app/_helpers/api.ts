import axios from "axios";
import { ILoginUser, InputUser, IPassTest, IResopnse, ITest} from "./types";

const Axios = axios.create({
    url: 'http://localhost:3000',
    withCredentials: true
})

export const registrationUserApi = async (data: InputUser): Promise<IResopnse> => {
    const response = await Axios.post(`/register-page/api`, data)

    return response.data
}

export const loginUserApi = async (data: ILoginUser): Promise<IResopnse> => {
    const response = await Axios.post(`/login-page/api`, data)

    return response.data
}

export const verifyUserApi = async (): Promise<IResopnse> => {
    const response = await Axios.get(`/profile/api`)

    return response.data
}

export const logoutUserApi = async (): Promise<IResopnse> => {
    const response = await Axios.post(`/profile/api`)

    return response.data
}

export const createTestApi = async (form: FormData): Promise<IResopnse> => {
    const response = await Axios.post(`/add-test/api`, form)

    return response.data
}

export const getAllTestsApi = async (): Promise<IResopnse> => {
    const response = await Axios.get(`/profile/api/tests`)

    return response.data
}

export const getPassTestApi = async (id: number): Promise<IResopnse> => {
    const response = await Axios.get(`/pass-test/api/${id}`)

    return response.data
}

export const saveResultTestApi = async (userLogin: string | undefined, data: IPassTest | null): Promise<IResopnse> => {
    const response = await Axios.post(`/result-test/api/${userLogin}/${data?.id}`, data)

    return response.data
}

export const getResultTestApi = async (userLogin: string, id: number): Promise<IResopnse> => {
    const response = await Axios.get(`/result-test/api/${userLogin}/${id}`)

    return response.data
}

export const checkPassTestApi = async (testId: number | undefined): Promise<IResopnse> => {
    const response = await Axios.get(`/profile/api/tests/${testId}`)

    return response.data
}

export const getScoresTestApi = async (testId: number): Promise<IResopnse> => {
    const response = await Axios.get(`/scores-test/api/${testId}`)

    return response.data
}