import diagnosesData from "../../data/diagnoses"
import { type Diagnosis } from "../../types"


const getAllDiagnoses = () : Diagnosis[] =>{
    return diagnosesData
}

export default {
    getAllDiagnoses
}