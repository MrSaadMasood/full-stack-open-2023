import React, { useState } from "react"
import { DataToSent, DiaryEntry } from "../types"
import axios from "axios"
interface FormProp {
    addNewData : (data : DiaryEntry)=> void,
    showError : ( value : string)=> void
}
export default function Form( { addNewData , showError }: FormProp){
    const [ selectedVisiblity , setSelectedVisibility] = useState<string>("great")
    const [ selectedWeather , setSelectedWeather] = useState("sunny")
    const [ comment , setComment ] = useState("")
    const [ date , setDate ] = useState(new Date().toLocaleDateString())

    function handleVisibility(e : React.SyntheticEvent){
        setSelectedVisibility((e.target as HTMLInputElement).value)
        
    }
    function handleWeather(e : React.SyntheticEvent){
        setSelectedWeather((e.target as HTMLInputElement).value)
    }
    async function handleSubmit(e : React.SyntheticEvent ){
        e.preventDefault()
        const data : DataToSent = { date, visibility : selectedVisiblity, weather : selectedWeather}
        if(comment){
            data.comment = comment
        }
        axios.post<DiaryEntry>("http://localhost:3000/api/diaries", data)
            .then(res=>{
                addNewData(res.data)
            })
            .catch(error=>{
                if(axios.isAxiosError(error)){

                    showError(error.response?.data)
                    console.log(error);

                }
            })
    }
    return (
        <form onSubmit={handleSubmit} >
            <h1>Add new Entery</h1>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" onChange={(e : React.SyntheticEvent)=>setDate((e.target as HTMLInputElement).value)} />
            <br />
            <label htmlFor="visibility">Visibility</label>
            <label><input type="radio" name="visibility" id="visibility" value={"great"} checked={selectedVisiblity === "great"} onChange={handleVisibility} />Great</label>
            <label><input type="radio" name="visibility" id="visibility" value={"good"}  onChange={handleVisibility}/>Good</label>
            <label><input type="radio" name="visibility" id="visibility" value={"ok"}  onChange={handleVisibility}/>ok</label>
            <label><input type="radio" name="visibility" id="visibility" value={"poor"}  onChange={handleVisibility}/>poor</label>
            <br />
            <label htmlFor="weather">Weather</label>
            <label><input type="radio" name="weather" id="weather" value={"sunny"} checked={selectedWeather === "sunny"} onChange={handleWeather} />sunny</label>
            <label><input type="radio" name="weather" id="weather" value={"rainy"} onChange={handleWeather}/>rainy</label>
            <label><input type="radio" name="weather" id="weather" value={"cloudy"} onChange={handleWeather}/>cloudy</label>
            <label><input type="radio" name="weather" id="weather" value={"stormy"} onChange={handleWeather}/>stormy</label>
            <label><input type="radio" name="weather" id="weather" value={"windy"} onChange={handleWeather}/>windy</label>
            <br />
            <input type="text" name="comment" id="comment" placeholder="add comment" required value={comment} onChange={(e : React.SyntheticEvent)=>setComment((e.target as HTMLInputElement).value)} />
            <br />
            <button type="submit">Add</button>
        </form>
    )
}