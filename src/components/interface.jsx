"use client"
import { useState } from "react";
import JoyoList from "./list";
import Selectable from "./selectable";
import Typing from "./typing";

export default function Interface(props) {
    const [isTypingMode, setTypingMode] = useState({
        enabled: false,
        data: {}
    });

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {
            grade: formData.get("grade"),
            reading: formData.get("reading"),
            okurigana: false,
            kanjis: []
        };

        if (formData.get("okurigana") !== null) {
            data.okurigana = true;
        }

        const radicals = []
        for (const radical of formData.keys()) {
            if (radical.startsWith("radical-")) {
                radicals.push(formData.get(radical))
            }
        }

        if (data.okurigana) {
            for (const radical of radicals) {
                for (const [kanji, kanjiPros] of Object.entries(props.data[data.grade][radical])) {
                    for (const reading of kanjiPros.kun.okurigana) {
                        data.kanjis.push({
                            kanji: kanji + reading.okurigana,
                            reading: [reading.base + reading.okurigana, kanji + reading.okurigana],
                            meaning: kanjiPros.keyword
                        })
                    }
                }
            }

        } else if (data.reading === "kun") {
            for (const radical of radicals) {
                for (const [kanji, kanjiPros] of Object.entries(props.data[data.grade][radical])) {
                    let r = kanjiPros.kun.main;

                    if (r.length <= 0) {
                        r = kanjiPros.on.main
                    }

                    data.kanjis.push({
                        kanji: kanji,
                        reading: r,
                        meaning: kanjiPros.keyword
                    })
                }
            }
        } else {
            /* on reading */
            for (const radical of radicals) {
                for (const [kanji, kanjiPros] of Object.entries(props.data[data.grade][radical])) {
                    let r = kanjiPros.on.main;

                    if (r.length <= 0) {
                        r = kanjiPros.kun.main
                    }

                    data.kanjis.push({
                        kanji: kanji,
                        reading: r,
                        meaning: kanjiPros.keyword
                    })
                }
            }
        }

        data.kanjis = data.kanjis.sort(() => Math.random() - 0.5);

        setTypingMode({
            enabled: true,
            ...data
        })
    }

    const mainInterface = <form action="/practice" method="post" onSubmit={handleSubmit}>
        <Selectable/> 
            <JoyoList data={props.data}/> 
            <button className="shadow-lg text-white ml-2 mt-10 mb-10 px-10 py-2 rounded border  border-solid border-indigo-900 bg-indigo-500">
                Study
            </button>
        </form>

    return (
        <>
            {isTypingMode.enabled 
                ? <Typing data={isTypingMode.kanjis} 
                    reading={isTypingMode.reading === "on" ? "オン" : "くん"}
                /> 
                : mainInterface }
        </>
    )
}