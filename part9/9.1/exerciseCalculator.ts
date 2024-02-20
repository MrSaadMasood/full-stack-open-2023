import { argumentParserExcercise } from "./argumentParser"
export interface result {
    periodLength : number,
    trainingDays : number,
    success : boolean,
    rating : number,
    ratingDescription : string,
    target : number,
    average : number,
}
export default function calculateExcercises(array : number[] , target : number) : result | undefined {
    const sum = array.reduce((accumulator, value)=>{
        return accumulator + value
    })
    const periodLength = array.length
    const trainingDays = array.filter(item=> item !== 0).length
    const average = sum/array.length
    const rating = Math.floor((average / target) * 3)
    const success = average >= target ? true : false
    let ratingDescription : string | undefined;
    if(rating <= 1) ratingDescription = "this is too bad"
    else if (rating > 1 && rating <= 2 ) ratingDescription = "this is average performace"
    else if (rating > 2) ratingDescription = "excellent training"

    if(ratingDescription){

    return {
        periodLength,
        trainingDays,
        average,
        target,
        rating,
        success,
        ratingDescription : ratingDescription 
    }
    }else {
        return
    }

}


try {
    const objectParsed = argumentParserExcercise(process.argv)
    calculateExcercises(objectParsed.list, objectParsed.target)
} catch (error) {
    
}