import { OccupationalHealthcareEntry } from "../../types"
import CodeMapper from "./CodesMapper";

interface CheckProp {
    entry : OccupationalHealthcareEntry;
    getCodeDetails : (value : string)=>string | undefined;
}
export default function OccupationalHealthcare({entry, getCodeDetails } : CheckProp){

    return (
        <div>
            <h5>employer : {entry.employerName}</h5>
            <h5>specialist : {entry.specialist}</h5>
            <h5>Sick Leave</h5>
            <h6>end Date {entry.sickLeave?.endDate}</h6>
            <h6>start Date {entry.sickLeave?.startDate}</h6>
            {entry.diagnosisCodes && <CodeMapper codes={entry.diagnosisCodes} getCodeDetails={getCodeDetails} />}
        </div>
    )
}