import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, EntryWithoutId, Gender, Patient, SickLeave } from "../../types";
import Hospital from "../Entry Types/Hospital";
import HealthCheck from "../Entry Types/HealthCheck";
import OccupationalHealthcare from "../Entry Types/OccupationCheck";



export default function PatientData(){

    const [ patientData , setPatientData] = useState<Patient>({
        id: "",
        name : "",
        occupation : "",
        gender : Gender.Other,
        entries : [],
    })
    const [ diagnoses, setDiagnoses] = useState<Diagnosis[]>()
    const [ addButtonClicked, setAddButtonClicked] = useState(false)
    const [ formData, setFormData ] = useState<EntryWithoutId>({
        description : "",
        date : new Date().toLocaleDateString(),
        specialist : "",
        diagnosisCodes : [""],
        type : "Hospital",
        discharge : { criteria : "", date : new Date().toLocaleDateString()}
    })
    const [ sickLeave, setSickLeave ] = useState<SickLeave>({
        startDate : "",
        endDate : ""
    })
    const [error , setError ] = useState("")
    const { id } = useParams()
    console.log("the form data is", formData);
    
    
    useEffect(()=>{

        axios.get<Patient>(`http://localhost:3000/api/patients/${id}`)
            .then(res=>{
                console.log(res.data);
                setPatientData(res.data)
            })
            .catch(error=> console.log(error))

        axios.get<Diagnosis[]>("http://localhost:3000/api/diagnoses")
            .then(res=>{
                setDiagnoses(res.data)
            })
            .catch(error=>{
                if(axios.isAxiosError(error)){
                    console.log(error);
                    
                }
            })
    },[id])

    function getDiagnosis(value : string) : string | undefined{
        const findIndex = diagnoses?.findIndex((item=>{
            return item.code === value
        }))
        if(findIndex && findIndex >= 0 ) {
            return diagnoses![findIndex].name
        }
        else {
            return
        }
    }

    function conditionalRender(object : Entry): JSX.Element {
        switch (object.type) {
            case "Hospital":
                return <Hospital entry={object} getCodeDetails={getDiagnosis}  />
            case "HealthCheck":
                return <HealthCheck entry={object} getCodeDetails={getDiagnosis} />
            case "OccupationalHealthcare":
                return <OccupationalHealthcare entry={object} getCodeDetails={getDiagnosis} />
            default:
                exceptionalCase(object)
        }
    }

    function exceptionalCase(value : never) : never{
        throw new Error(`the value does not exists, ${value}`)
    }
    function handleChange(e : React.SyntheticEvent) {
        const { name , value, id } = e.target as HTMLInputElement
        setFormData((prevForm):EntryWithoutId =>{
            if(prevForm.type === "Hospital" && id === "discharge"){
                return {
                    ...prevForm,
                    discharge : {
                        ...prevForm.discharge,
                        [name] : value
                    }
                }
            }
 
            else {
                return {
                    ...prevForm,
                    [name] : value
                }
            }
        })
    }
    async function handleSubmit(e : React.SyntheticEvent){
        e.preventDefault()
        if(formData.type === "OccupationalHealthcare") formData.sickLeave = sickLeave
        try {
            const response = await axios.post(`http://localhost:3000/api/patients/${id}/enteries`, formData)
            setPatientData((prevData): Patient=>{
                const newArray = prevData?.entries.concat(response.data)
                return {
                    ...prevData,
                    entries : [...newArray as Entry[]]
                }
            })
            setAddButtonClicked(false)
        } catch (error) {
           if(axios.isAxiosError(error)){
                setError(error.message)
           } 
        }
    }
    return (
        patientData && 
        <div>
            <h2>{patientData?.name}</h2>
            <h3>{patientData?.ssn}</h3>
            <h3>{patientData?.occupation}</h3>
            {!addButtonClicked &&
                <button style={{ width : "50px", height : "50px", borderRadius : "100%"}} onClick={()=>setAddButtonClicked(true)}>
                    Add+
                </button>
            }
            <h2>Enteries</h2>
            {error && 
                <div>
                    {error}
                </div>
            }
            {addButtonClicked &&
                <div style={{
                    width : "80vh", height : "60vh", backgroundColor : "#c9e7db", border : "4px",
                    borderColor : "black"
                }}>
                    <form className=" bg-red-600" onSubmit={handleSubmit}>
                        <label htmlFor="date">Enter Date:</label>
                        <br />
                        <input type="date" name="date" id="date" required onChange={handleChange} value={formData.date} />
                        <br />
                        <label htmlFor="description">Description</label>
                        <br />
                        <input type="text" name="description" id="description" placeholder="Enter Description"
                        onChange={handleChange} value={formData.description} required />
                        <br />
                        <label htmlFor="specialist">Specialist</label>
                        <br />
                        <input onChange={handleChange} required value={formData.specialist} type="text" name="specialist" id="specialist" placeholder="Enter Specialist" />
                        <br />
                        <label htmlFor="diagnosisCodes">Diagnosis Codes</label>
                        <br />
                        <input onChange={handleChange} required value={formData.diagnosisCodes} type="text" name="diagnosisCodes" id="DiagnosisCodes" placeholder="Enter Codes" />
                        <br />
                        <select name="type" id="type" required onChange={handleChange} value={formData.type}>
                            <option value="Hospital">Hospital</option>
                            <option value="HealthCheck">Health Check</option>
                            <option value="OccupationalHealthcare">OccupationalHealthcare</option>
                        </select>
                            <br />
                        {formData.type === "Hospital" && 
                           <div>

                            <label >Enter Discharge Info</label>
                            <br />
                            <input onChange={handleChange} required type="date" name="date" id="discharge" disabled={formData.type !== "Hospital"}  />

                            <br />
                            <input onChange={handleChange} required value={formData.discharge.criteria} type="text" name="criteria" id="discharge" disabled={formData.type !== "Hospital"} />
                           </div> 
                        }
                        <br />
                        {formData.type === "HealthCheck" &&
                            <div>
                                <label>Select Health Check Rating</label>
                                <br />
                                <select onChange={handleChange} required value={formData.healthCheckRating} name="healthCheckRating" id="healthCheckRating" disabled={formData.type !== "HealthCheck"}>
                                    <option value="0">Healthy</option>
                                    <option value="1">Low Risk</option>
                                    <option value="2">HighRisk</option>
                                    <option value="3">Critical Risk</option>
                                </select>
                            </div> 
                        }
                        <br />
                        {formData.type === "OccupationalHealthcare" &&
                            <div>
                                <label htmlFor="employerName">Enter employer name</label>
                                <br />
                                <input onChange={handleChange} value={formData.employerName} type="text" name="employerName" id="employerName" required />
                                <br />
                                <label htmlFor="sickLeave">Enter Sick Leave</label>
                                <br />
                                <label htmlFor="startDate">StartDate</label>
                                <br />
                                <input onChange={(e : React.SyntheticEvent )=>setSickLeave((prevData): SickLeave =>{
                                    return {
                                        ...prevData,
                                        startDate : (e.target as HTMLInputElement).value
                                    }
                                })} type="date" name="startDate" id="occupation" value={formData.sickLeave?.startDate } required />
                                <br />
                                <label htmlFor="endDate">end date</label>
                                <br />
                                <input onChange={(e : React.SyntheticEvent )=>setSickLeave((prevData): SickLeave =>{
                                    return {
                                        ...prevData,
                                        endDate : (e.target as HTMLInputElement).value
                                    }
                                })} type="date" name="endDate" id="occupation" value={formData.sickLeave?.endDate} required />

                            </div> 
                        }
                        <button type="submit">Submit</button>
                    </form>
                </div>
            }
            {patientData.entries.map(entry=>{
                return <div key={entry.id} style={{ margin : "10px" ,padding : "4px" ,border : "4px", borderColor : "red", backgroundColor : "gray"}}>
                    <h3>{entry.date}</h3>
                    <h3>{entry.description}</h3>
                    <h3>{conditionalRender(entry)}</h3>
                </div>
            })}
        </div>
        
    )
}