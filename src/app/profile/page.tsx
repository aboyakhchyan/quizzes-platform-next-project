"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { ITest, IUser } from "../_helpers/types";
import { getAllTestsApi, logoutUserApi, verifyUserApi } from "../_helpers/api";
import { useRouter } from "next/navigation";
import { TestItem } from "../_helpers/components/test-item";
import { LoadingSpinner } from "../_helpers/components/loding-spinner";
import { Modal } from "../_helpers/components/modal";
import { useDebounce } from "../_helpers/hooks/debounce";
import styles from './profile.module.css'

export default function Profile() {
    const [tests, setTests] = useState<ITest[]>([])
    const [searchTest, setSearchTest] = useState<string>('')
    const [user, setUser] = useState<IUser>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const debounce = useDebounce(searchTest, 500)
    const router = useRouter()

    useEffect(() => {
        setIsLoading(true)
        verifyUserApi()
            .then(response => {
                setUser(response.payload as IUser);

                if (response.status === 'error' && response.message) {
                    router.push('/login-page')
                }
            });

        getAllTestsApi(debounce)
            .then(response => {
                if (response.status === 'ok') {
                    setTests(response.payload as ITest[])
                } else {
                    setTests([])
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [debounce])

    const handleLogoutUser = () => {
        logoutUserApi()
    };

    const name = user && user.name.substring(0, 1).toUpperCase()
    const surname = user && user.surname.substring(0, 1).toUpperCase()

    return (
        <>
            <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
                <Link
                    href="/add-test"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition"
                >
                    Create
                </Link>

                <h1 className="select-none text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-600 to-blue-300 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Quizzes Platform
                </h1>

                <div className="flex items-center space-x-4">
                    <h4 className="text-blue-500 font-semibold dark:text-blue-300">
                        {user?.login}
                    </h4>
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 text-white dark:text-gray-200 font-bold flex items-center justify-center rounded-full">
                        {name} {surname}
                    </div>

                    <Link
                        href="/login-page"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition"
                        onClick={handleLogoutUser}
                    >
                        {'<<'} Logout
                    </Link>
                </div>
            </header>

            <main className="relative p-6">
            <div className="relative top-0 left-1/2 transform -translate-x-1/2 text-center mt-4">
                <div className="relative inline-block">
                    <input
                        type="text"
                        placeholder="Search for the preferred test..."
                        className="w-62 h-10 p-3 pr-10 text-wrap text-black border-2 border-blue-500 rounded-lg outline-none shadow-md transition-all duration-300 focus:border-blue-700 focus:shadow-lg focus:bg-blue-50"
                        value={searchTest}
                        onChange={e => {
                            setSearchTest(e.target.value)
                            setIsLoading(true)
                        }}
                    />
                    <img
                        src="./images/search.png"
                        alt="Search"
                        className="absolute bottom-2 right-3 w-5 h-5 pointer-events-none"
                    />
                </div>
            </div>



                {isLoading && <LoadingSpinner />}

                <div className="grid gap-10 mt-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
                    {tests.length > 0 ? (
                            tests.map(test => (
                                <TestItem
                                    key={test.id}
                                    test={test}
                                    setIsOpen={setIsOpen}
                                />
                        ))) : (
                            <p className="col-span-full text-center text-lg text-gray-500 dark:text-gray-300 mt-4">
                                The searched test does not exist
                            </p>
                        )
                    }
                </div>
            </main>

            
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </>
    )
}
