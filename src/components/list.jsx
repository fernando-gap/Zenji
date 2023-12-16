"use client"
import Collapsible from "@/components/collapsible"

export default function JoyoList(props) {
    const kanjiData = props.data;

    function countKanji(grade) {
        let count = 0;

        Object.keys(kanjiData[grade]).forEach(radical => {
            count += Object.keys(kanjiData[grade][radical]).length;
        })
        return count;
    }

    return (
        <>
            {
                Object.keys(kanjiData).map((grade, index) =>
                    <Collapsible 
                        key={grade + index} 
                        topic={"Grade - " + grade} 
                        name="grade" 
                        value={grade} 
                        quantity={countKanji(grade)} 
                        data={kanjiData}
                    />
                )
            }
        </>
    )
}