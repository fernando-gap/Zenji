import Interface from "@/components/interface";

export default async function Home() {
    const kanji = await fetch("http://localhost:3000/kanji.json");
    const kanjiData = await kanji.json();

    return (
        <Interface data={kanjiData}/>
    )
}
