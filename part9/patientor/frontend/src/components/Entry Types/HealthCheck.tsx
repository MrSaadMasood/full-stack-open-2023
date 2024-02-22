import { HealthCheckEntry } from "../../types"
import CodeMapper from "./CodesMapper";

interface CheckProp {
    entry : HealthCheckEntry
    getCodeDetails : (value : string)=>string | undefined;
}
export default function HealthCheck ({entry, getCodeDetails } : CheckProp){

    return (
        <div>
            <h4>specialist: {entry.specialist}</h4>
            <h5>health check rating: {entry.healthCheckRating}</h5>
            {entry.diagnosisCodes && <CodeMapper codes={entry.diagnosisCodes} getCodeDetails={getCodeDetails} />}
            
        </div>
    )
}