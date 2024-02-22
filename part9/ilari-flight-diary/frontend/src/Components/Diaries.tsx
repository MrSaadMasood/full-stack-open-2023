import { DiaryEntry } from "../types"

interface DiariesProps{
    diaryEnteries : DiaryEntry[]
}

export default function Diaries({ diaryEnteries }: DiariesProps ){
    return (
        <div>
            <h1>Diary Enteries</h1>
            {diaryEnteries.map((entry : DiaryEntry)=>{
                return (
                    <div key={entry.id}>
                        <h3>
                            {entry.date}
                        </h3>
                        <p>
                            visibility : {entry.visibility}
                        </p>
                        <p>
                            weather : {entry.weather}
                        </p>

                    </div>
                )
            })}
        </div>
    )
}