import { useState } from "react"

export default function Typing(props) {
    const [current, setCurrent] = useState(0)
    const [isReadingEnabled, setReadingEnabled] = useState(true)

    function handleCompositionChange(e) {
        const userkana = e.target.value

        for (const reading of props.data[current].reading) {
            if (userkana === reading) {
                if (current+1 < props.data.length)
                setCurrent(current+1);
                e.target.value = "";
                return;
            }
        }
    }

    function handleClick() {
        setReadingEnabled(!isReadingEnabled)
    }

    return (
        <div className="m-auto max-w-lg">
            <div>
                <div className="flex items-center mt-40 flex-col">
                    <div className="text-5xl cursor-pointer" onClick={handleClick}>
                        <ruby>
                            {props.data[current].kanji}
                            <rt style={{visibility: isReadingEnabled ? "visible" : "hidden"}}>
                                {props.data[current].reading[0]}
                            </rt>
                        </ruby>

                        <span className="text-gray-400 absolute ml-2 text-lg top-52">{current+1 < props.data.length && props.data[current+1].kanji}</span>
                    </div>
                    <div className="text-xs" style={{visibility: isReadingEnabled ? "visible" : "hidden"}}>
                        音訓： {props.data[current].reading.join(", ")}
                    </div>
                </div>
            </div>
            <div>
                <input
                    className="mt-1 px-4 p-1 border rounded-lg w-full shadow-sm outline-none"
                    placeholder={"カナ ー " + props.reading}
                    onCompositionEnd={handleCompositionChange}
                />
                <div className="flex justify-between text-xs mr-1 ml-1">
                    <div className="text-gray-400" style={{visibility: isReadingEnabled ? "visible" : "hidden"}}>{props.data[current].meaning}</div>
                    <div>{current+1}/{props.data.length}</div>
                </div>
            </div>
        </div>
    )
}