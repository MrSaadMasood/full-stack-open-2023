import { BaseEntry, Diagnosis, Entry, Gender, HealthCheckOmit, HealthCheckRating, HospitalOmit, OccupationalHealthcareOmit, Patients } from "../types";
import { v1 as uuid} from "uuid"

export default function newPatientEntry(object : unknown) : Patients {
    if(!object || typeof object !== "object"){
        throw new Error("invalid data provided")
    }
    if("name" in object && "occupation" in object && "gender" in object && "dateOfBirth" in object && "ssn" in object){
        const { name , occupation, gender, dateOfBirth, ssn} = object
        if(!stringValidator(name)){
            throw new Error("the name provided is not string")
        }

        if(!stringValidator(occupation)){
            throw new Error("the occupation is not correct")
        }
        if(!stringValidator(gender) || !genderValidator(gender)){
            throw new Error("the gender provided is not correct")
        }

        if(!stringValidator(ssn)){
            throw new Error("incorrect ssn provided")
        }
        if(!stringValidator(dateOfBirth)){
            throw new Error("date of birth provided is incorrect")
        }
        
        return {
            id : uuid(),
            name, 
            occupation,
            gender,
            dateOfBirth,
            ssn,
            entries : []
        }
    }
    else {
        throw new Error("the required properties does not exits")
    }
}

export function verifyNewEntry(object : unknown): Entry{
    if(typeof object !== "object" || !object || !("diagnosisCodes" in object) ){
        throw new Error("cannot verify the data sent")
    }
    
    if("description" in object && "date" in object && "specialist" in object && "diagnosisCodes" in object && "type" in object){
        const { description, date, specialist, diagnosisCodes, type} = object

        if(!stringValidator(description)) throw new Error("the description provided is not correct")
        if(!stringValidator(date)) throw new Error("the date provided is not correct")
        if(!stringValidator(specialist)) throw new Error("the spcialist provided is not correct")
        if(!stringValidator(diagnosisCodes)) throw new Error("the diagnois codes are not correct")
        if(!stringValidator(type)) throw new Error("the entry type is not correct")

        const diagnosisCodesArray : Array<Diagnosis["code"]> = diagnosisCodes.split(",")
        const baseVerified : BaseEntry = {
            id : uuid(),
            description,
            date,
            specialist,
            diagnosisCodes : diagnosisCodesArray,
        }
        
        if(object.type === "Hospital"){
            const  { discharge }  = object as HospitalOmit
            
            if(!stringValidator(discharge.criteria)) throw new Error("the discharge criteria is not correct")
            if(!stringValidator(discharge.date)) throw new Error("the discharge date is not correct")

            return{
                ...baseVerified,
                discharge : discharge,
                type : "Hospital"
            }
        }
        else if (object.type === "HealthCheck"){
            
            const  hospitalCheck  = object as HealthCheckOmit
            const rating = Number(hospitalCheck.healthCheckRating)
            if(isNaN(rating) || !healthCheckRatingValidator(rating)) throw new Error("the rating given is not correct")

            return{
                ...baseVerified,
                healthCheckRating : hospitalCheck.healthCheckRating,
                type : "HealthCheck"
            }
        }
        else if (object.type === "OccupationalHealthcare"){
            const { sickLeave, employerName} = object as OccupationalHealthcareOmit

            if(!stringValidator(employerName)) throw new Error("the employer provided is correct")
            if(!stringValidator(sickLeave?.endDate) || !stringValidator(sickLeave?.startDate)) throw new Error("the sick leave date is incorrect")

            return {
                ...baseVerified,
                sickLeave,
                employerName,
                type : "OccupationalHealthcare"
            }

        }
        else {
            throw new Error("the data provided was incorrect")
        }
    }
    else throw new Error("the enteries provided are not correct")
}

function stringValidator( text : unknown ) : text is string {
    return typeof text === "string" || text instanceof String
}

function genderValidator( gender : string ) : gender is Gender{
    return Object.values(Gender).map(value => value.toString()).includes(gender)
}

function healthCheckRatingValidator( rating : number) : rating is HealthCheckRating {
    return Object.values(HealthCheckRating).includes(rating)
}

