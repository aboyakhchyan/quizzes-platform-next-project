import { IAction, IPassTest, IPayload, IQuestion, IResultTest, IScoresTest, IState, ITest } from "./types";

export default function reducer (state: IState, action: IAction) {
    switch(action.type) {
        case 'test/name': 
            return {
                ...state,
                test: {
                    ...state.test,
                    title: action.payload as string
                }
            }
        case 'quest/text': 
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: state.test.questions.map(quest =>
                        quest.id != (action.payload as IPayload).id ? quest :
                        {
                            ...quest,
                            text: (action.payload as IPayload).text || ''
                        }
                    )
                }
            }
        case 'add/quest':
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: [
                        ...state.test.questions,
                        {
                            id: Date.now(),
                            text: '',
                            options: []
                        }
                    ]
                }
            }
        case 'answer/text':
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: state.test.questions.map(quest =>
                        quest.id !== (action.payload as IPayload).questId ? quest :
                            {
                                ...quest,
                                options: quest.options.map(opt =>
                                    opt.id !== (action.payload as IPayload).optId ? opt :
                                        {
                                            ...opt,
                                            text: (action.payload as IPayload).text || ''
                                        }
                                )
                            }
                    )
                }
            }
        case 'quest/delete': 
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: state.test.questions.filter(quest => quest.id !== action.payload)
                }
            }
        case 'quest/duplicate':
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: [
                        ...state.test.questions,
                        {
                            ...action.payload as IQuestion,
                            id: Date.now()
                        }
                    ]
                }
            }
        case 'delete/answer':
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: state.test.questions.map(quest =>
                        quest.id !== (action.payload as IPayload).questId ? quest :
                            {
                                ...quest,
                                options: quest.options.filter(opt => opt.id !== (action.payload as IPayload).optId)
                            }
                    )
                }
            }
        case 'add/option': 
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: state.test.questions.map(quest =>
                        quest.id !== action.payload ? quest :
                            {
                                ...quest,
                                options: [
                                    ...quest.options,
                                    {
                                        text: '',
                                        isCorrect: false,
                                        id: Date.now()
                                    }
                                ]
                            }
                    )
                }
            }
        case 'change/correct': 
            return {
                ...state,
                test: {
                    ...state.test,
                    questions: state.test.questions.map(quest =>
                        quest.id !== (action.payload as IPayload).questId ? quest :
                            {
                                ...quest,
                                options: quest.options.map(opt => 
                                    opt.id !== (action.payload as IPayload).optId ?
                                        {
                                            ...opt,
                                            isCorrect: false
                                        } :
                                        {
                                            ...opt,
                                            isCorrect: true
                                        }
                                )
                            }
                    )
                }
            }
        case 'pass/test': 
            return {
                ...state,
                passTest: action.payload as IPassTest
            }
        case 'add/select-answer':
            return {
                ...state,
                passTest: state.passTest ? {
                    ...state.passTest,
                    questions: state.passTest?.questions.map(question => 
                        question.id !== (action.payload as IPayload).questId ? question :
                            {
                                ...question,
                                selected_answer: (action.payload as IPayload).optText
                            }
                    )
                } : null
            }
        case 'result/test': 
            return {
                ...state,
                resultTest: action.payload as IResultTest
            }
        case 'scores/test': 
            return {
                ...state,
                scoresTest: action.payload as IScoresTest
            }
        default:
            return state
    }
}