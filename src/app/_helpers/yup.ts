import * as Yup from 'yup'

export const registerSchema = Yup.object({
    name: Yup.string().required('Name is required').min(4, 'The name must be at least four letters long.'),
    surname: Yup.string().required('Name is required').min(6, 'The surname must be at least six letters long.'),
    login: Yup.string().required('Login is required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')  
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter') 
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Password is required')
})

export const loignSchema = Yup.object({
    login: Yup.string().required('Login is required'),
    password: Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters') 
})