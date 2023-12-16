"use client"
import { useEffect, useState } from "react"

export function CollapsibleKanji(props) {
    const [isEnabled, setEnabled] = useState(false)
    return (
        <div>
            <div className="mt-1 ml-6 rounded p-1 text-gray-900 bg-indigo-400 flex flex-row max-w-sm">
                <div className="flex-grow pl-2">{props.topic}</div>
                <div className="text-xs">Freq: {props.frequency}</div>
            </div>
            {isEnabled && props.children}
        </div>
    )

}

export function CollapsibleChildren(props) {
    const [isEnabled, setEnabled] = useState(false)
    return (
        <div>
            <div className="rounded bg-indigo-200 mt-1 ms-2 px-1 py-1 shadow-sm flex flex-row max-w-lg">
                <input className="m-2 px-4" type="checkbox" name={props.name} value={props.value}/>
                <label className="flex-grow" onClick={() => setEnabled(!isEnabled)}><strong>{props.topic}</strong></label>
                <div className="text-xs pe-3">Freq: {props.frequency}</div>
                <div className="text-xs">Qty: {props.quantity}</div>
            </div>
            {isEnabled && props.children}
        </div>
    )
}

export default function Collapsible(props) {
    const [isEnabled, setEnabled] = useState(false)
    const [isChecked, setChecked] = useState(false);
    const kanjiData = props.data;

    function sortComponentsByFrequency(components) {
        return components.sort((a, b) => a.props.frequency - b.props.frequency)
    }

    function calculateAverageRadicalFrequency(grade, radical) {
        const divisor = countKanjiByRadical(grade, radical);
        const frequencySum = Object.keys(kanjiData[grade][radical]).reduce((prev, kanji) => kanjiData[grade][radical][kanji].frequency + prev, 0);
        const mean = frequencySum / divisor;
        return mean.toFixed(2);
    }

    function countKanjiByRadical(grade, radical) {
        return Object.keys(kanjiData[grade][radical]).length;
    }

    function handleChange(e) {
        setChecked(!isChecked)
    }

    useEffect(() => {
        if (isChecked) {
            for (const grade of Object.keys(props.data)) {
                const checkboxes = document.querySelectorAll(`#radical${grade} > div > div > input[type=checkbox]`)

                if (grade !== props.value) {
                    for (const checkbox of checkboxes) {
                        checkbox.checked = false;
                    }
                } else {
                    for (const checkbox of checkboxes) {
                        checkbox.checked = true;
                    }
                }
            }
            setChecked(!isChecked)
        }
    }, [isChecked])

    return (
        <div>
            <div className="shadow-lg px-2 py-3 ms-2 mt-4 rounded bg-indigo-600 text-white flex flex-row max-w-lg">
                <label>
                    <input className="m-2 px-4" type="radio" id={props.value} name={props.name} value={props.value} onChange={handleChange}/>
                </label>
                <div className="flex-grow ms-2" onClick={() => setEnabled(!isEnabled)}><strong>{props.topic}</strong></div>
                <div className="text-xs"> Qt. {props.quantity}</div>
            </div>
            <div id={"radical" + props.value} style={{display: isEnabled ? "block" : "none"}}>
                {sortComponentsByFrequency(
                        Object.keys(kanjiData[props.value]).map((radical, index) =>
                            <CollapsibleChildren key={radical + index} topic={"Radical - " + radical} name={"radical-" + radical} value={radical} quantity={countKanjiByRadical(props.value, radical)} frequency={calculateAverageRadicalFrequency(props.value, radical)} checked={isChecked}>
                                {Object.keys(kanjiData[props.value][radical]).map(k =>
                                    <CollapsibleKanji key={props.value + radical + k} topic={k} frequency={kanjiData[props.value][radical][k].frequency.toFixed(2)}>
                                    </CollapsibleKanji>
                                )}
                            </CollapsibleChildren>
                        )
                    ).map(component => component)
            }
            </div>
        </div>
    )
}