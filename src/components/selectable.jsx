"use client"
import { useState } from "react"

export default function Selectable() {
    const [isDisabled, setDisabled] = useState(true);

    return (
        <div className="shadow-lg rounded-lg p-4 mb-10 mt-5 ml-2 bg-sky-500 max-w-xs text-white">
            <input 
                type="radio" 
                id="on-reading" 
                name="reading" 
                value="on" 
                defaultChecked={true}
                onChange={() => setDisabled(!isDisabled)}
            />
            <label htmlFor="on-reading" className="mr-2 p-1">ON</label>
            <input 
                type="radio" 
                id="kun-reading" 
                name="reading" 
                value="kun"
                onChange={() => setDisabled(!isDisabled)}
            />
            <label htmlFor="kun-reading" className="mr-2 p-1">KUN</label>
            <input 
                type="checkbox" 
                id="okurigana-reading" 
                name="okurigana" 
                disabled={isDisabled}
            />
            <label htmlFor="okurigana-reading" className="mr-2 p-1">OKUGIRANA</label>
        </div>
    )
}
