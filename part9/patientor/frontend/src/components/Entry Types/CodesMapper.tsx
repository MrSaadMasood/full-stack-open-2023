import { Diagnosis } from "../../types"
interface MapperProps{
    codes : Array<Diagnosis["code"]>;
    getCodeDetails : (value : string)=>string | undefined;
}
export default function CodeMapper({ getCodeDetails, codes } : MapperProps){
    return (
        codes.map((code, index)=>{
            return <div key={index}>
                <p>
                    code : {code}
                </p>
                <p>
                    code Detail : {getCodeDetails(code)}
                </p>
            </div>
        })
    )
}