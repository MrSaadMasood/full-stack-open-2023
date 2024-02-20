interface BMIargs {
    height : number,
    weight : number
}
export function argumentParserBMI(array : string[]) : BMIargs{
    if(array.length < 4) throw new Error("need both height and weight")
    if(array.length > 4) throw new Error("extra values provided need only height and weight")
    const height = Number(array[2])
    const weight = Number(array[3])
    return {
        height,
        weight
    }
}

interface Excercise {
    list : number[],
    target : number,
}

export function argumentParserExcercise(array : string[]) : Excercise {
    if(array.length < 4) throw new Error("insufficient data provided")
    const target = Number(array[2])
    const stringList = array.slice(3 , array.length)
    const list = stringList.map(item=> Number(item))
    return {
        list,
        target
    }
}
