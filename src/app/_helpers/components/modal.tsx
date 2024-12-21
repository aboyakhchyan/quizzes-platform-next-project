"use client"

import ReactDOM from "react-dom"

interface IProps {
    isOpen: boolean,
    setIsOpen: (state: boolean) => void
}

export const Modal = ({isOpen, setIsOpen}: IProps) => {
    if (!isOpen) return null

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4 text-white">You have already completed this test</h3>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}
