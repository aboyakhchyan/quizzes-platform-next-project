import db from 'better-sqlite3'
import { IAnswer, InputUser, IQuestion, IResult, IScore, ITest, IUser } from "./types";

const sql = new db('data.db')

export const getUserByLogin = async (login: string): Promise<IUser | null> => {
    const user = sql.prepare(`SELECT * FROM users WHERE login = ?`).get(login)

    if(user) {
        return user as IUser
    }
    return null
}

export const insertUser = (user:  InputUser): db.RunResult => {
    return sql.prepare(`INSERT INTO users(name, surname, login, password)
                        VALUES(@name, @surname, @login, @password)
        `).run(user)
}

export const getUserById = async (id: number | bigint): Promise<IUser | null> => {
    const user = sql.prepare('SELECT * FROM users WHERE id = ?').get(id) as IUser

    if(user) {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            login: user.login,
        } as IUser
    }
    return null
}

export const insertTest = async (name: string, userId: number, filename: string | null): Promise<db.RunResult> => {
    return sql.prepare(`INSERT INTO tests(title, user_id, img_url)
                        VALUES(@title, @user_id, @img_url)
            `).run({title: name, user_id: userId, img_url: filename})
}

export const insertQuestion = async (text: string, testId: number): Promise<db.RunResult> => {
    return sql.prepare(`INSERT INTO questions(text, test_id)
                        VALUES(@text, @test_id)
            `).run({text: text, test_id: testId})
}


export const insertAnswer = async (text: string, isCorrect: number, questId: number | bigint): Promise<db.RunResult> => {
    return sql.prepare(`INSERT INTO answers(option, correct_answer, question_id)
                        VALUES(@option, @correct_answer, @question_id)
            `).run({option: text, correct_answer: isCorrect, question_id: questId})
}

export const getAllTests = async (): Promise<ITest[] | []> => {
    const tests = sql.prepare(`SELECT * FROM tests`).all() as ITest[]

    if(!tests) {
        return []
    }

    return tests
}

export const getAllQuestions = async (): Promise<IQuestion[] | []> => {
    const questions = sql.prepare(`SELECT * FROM questions`).all() as IQuestion[]

    if(!questions){ 
        return []
    }

    return questions
}
 
export const getAllAnswers = async (): Promise<IAnswer[] | []> => {
    const answers = sql.prepare(`SELECT * FROM answers`).all() as IAnswer[]

    if(!answers) {
        return []
    }

    return answers
}

export const getTestById = async (id: number): Promise<ITest | null> => {
    const test = sql.prepare(`SELECT * FROM tests WHERE id = ?`).get(id) as ITest

    if(!test) {
        return null
    }
    return test
}

export const getQuestionsByTestId = async (testId: number | undefined): Promise<IQuestion[] | []> => {
    const questions = sql.prepare(`SELECT * FROM questions WHERE test_id = ?`).all(testId) as IQuestion[]

    if(!questions) {
        return []
    }

    return questions
}

export const getAnswersByQuestionId = async (questId: number | undefined): Promise<IAnswer[] | []> => {
    const answers = sql.prepare(`SELECT * FROM answers WHERE question_id = ?`).all(questId) as IAnswer[]

    if(!answers) {
        return []
    }

    return answers
}

export const insertResultQuestion = async(userId: number, questId: number | undefined, selected_answer: string | undefined): Promise<db.RunResult> => {
    return sql.prepare(`INSERT INTO results(quest_id, user_id, selected_answer)
                        VALUES(@quest_id, @user_id, @selected_answer)
        `).run({quest_id: questId, user_id: userId, selected_answer})
}

export const insertTestScores = async(userId: number, testId: number, scores: string): Promise<db.RunResult> => {
    return sql.prepare(`INSERT INTO scores(result, user_id, test_id)
                        VALUES(@result, @user_id, @test_id)
        `).run({result: scores, user_id: userId, test_id: testId})
}

export const getResultByQuestAndUserId =  async (user_id: number , quest_id: number | undefined): Promise<IResult | null> => {
    const result = sql.prepare(`SELECT * FROM results WHERE quest_id = ? AND user_id = ?`).get(quest_id, user_id) as IResult

    if(!result) {
        return null
    }

    return result
}

export const getScoreByTestAndUserId = async (user_id: number | undefined, test_id: number | undefined): Promise<IScore | null> => {
    const score = sql.prepare(`SELECT * FROM scores WHERE test_id = ? AND user_id = ?`).get(test_id, user_id) as IScore

    if(!score) {
        return null
    }

    return score
}

export const checkPassTest = async (user_id: number, test_id: number): Promise<IScore | null> => {
    const score = sql.prepare(`SELECT * FROM scores WHERE user_id = ? AND test_id = ?`).get(user_id, test_id) as IScore

    if(!score) {
        return null
    }

    return score
}

export const getScoresTest = async (test_id: number | undefined): Promise<IScore[] | []> => {
    const scores = sql.prepare(`SELECT * FROM scores WHERE test_id = ?`).all(test_id) as IScore[]

    if(!scores) {
        return []
    }

    return scores
}