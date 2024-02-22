import { HospitalEntry } from "../../types"
import CodeMapper from "./CodesMapper"

interface HospitalProps {
    entry : HospitalEntry,
    getCodeDetails : (value : string)=>string | undefined;
}
export default function Hospital({ entry, getCodeDetails } : HospitalProps){
    return (
        <div>
            <h4>discharge date : {entry.discharge.date}</h4>
            <h4>criteria : {entry.discharge.date}</h4>
            <h4>specialist : {entry.specialist}</h4>
            {entry.diagnosisCodes && <CodeMapper codes={entry.diagnosisCodes} getCodeDetails={getCodeDetails} />}
        </div>
    )
}