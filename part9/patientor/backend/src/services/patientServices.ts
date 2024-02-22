import { Entry, NonSensitivePatient, Patients} from "../../types";
import patientsData from "../../data/patientsData"

const getAllPatients = () : NonSensitivePatient[] =>{

    return patientsData.map(({ id, name, gender, occupation, dateOfBirth})=>({
        id,
        name,
        occupation,
        gender,
        dateOfBirth
    }))
}

const getPatientSpecific = (id : string ): Patients | undefined => {
    const findIndex = patientsData.findIndex((patient)=>{
        return patient.id === id
    })
    
    if(findIndex >= 0 ) return patientsData[findIndex]
    else return
}

const addPatient = ( object : Patients): Patients =>{
    patientsData.push(object)
    return object
}

const addNewEntryForPatient = (id : string ,object : Entry) : Entry =>{
    const findIndex = patientsData.findIndex(patient=>{
        return patient.id === id
    })
    if(findIndex >=0){
        patientsData[findIndex].entries.concat(object)
        return object
    }else throw new Error("the id given was not found in the patient")
}
export default {
    getAllPatients,
    addPatient,
    getPatientSpecific,
    addNewEntryForPatient
}