import { useRouter } from "next/navigation";
import { ITest } from "../types";
import { checkPassTestApi } from "../api";

interface IProps {
    test: ITest
    setIsOpen: (state: boolean) => void
}

export const TestItem = ({ test, setIsOpen }: IProps) => {
    const router = useRouter()

    const handleCheckPassTest = () => {
        checkPassTestApi(test.id)
        .then(response => {
            if(response.status == 'error' && response.message) {
                setIsOpen(true)
            }else if(response.status == 'ok'){
                router.push(`pass-test/${test.id}`)
            }
        })
    }

    return (
        <div className="flex flex-col items-center gap-1 p-6 bg-indigo-900 text-white rounded-3xl shadow-lg w-64 h-72 transform hover:scale-105 transition-transform duration-300">
            {
                test.img_url ? (
                    <img 
                    src={`./images/${test.img_url}`} 
                    alt={test.title}
                    className="w-25 h-24 object-cover rounded-lg mb-4"
                />
                ) : (
                    <h3 className="text-4xl text-center mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-700 to-blue-300 shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Quizzes Platform
                    </h3>
                )
            }
            <p className="text-lg font-bold text-center">{test.title}</p>
            <small className="text-sm text-gray-300 mb-4">Author: <strong>{test.user_login}</strong></small>
            
            <div className="flex gap-2">
                <button 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
                    onClick={handleCheckPassTest}
                >
                    Pass
                </button>
                <button 
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                    onClick={() => router.push(`/scores-test/${test.id}`)}
                >
                    Scores
                </button>
            </div>
        </div>
    );
};
