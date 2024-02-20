import { argumentParserBMI } from "./argumentParser"
export default function BMICalculator(height: number, weight: number) : string{
    const meterSqure = (height * height ) / 10000
    const  BMI  = weight / meterSqure
    if (BMI < 16.0) {
        return "Underweight (Severe thinness)";
      } else if (BMI < 16.9) {
        return "Underweight (Moderate thinness)";
      } else if (BMI < 18.5) {
        return "Underweight (Mild thinness)";
      } else if (BMI < 25.0) {
        return "Normal (healthy weight)";
      } else if (BMI < 30.0) {
        return "Overweight (Pre-obese)";
      } else if (BMI < 35.0) {
        return "Obese (Class I)";
      } else if (BMI < 40.0) {
        return "Obese (Class II)";
      } else {
        return "Obese (Class III)";
      }
}
try {
    const objectParsed = argumentParserBMI(process.argv)
    BMICalculator(objectParsed.height, objectParsed.weight)
} catch (error : unknown) {
    if(error instanceof Error){
        console.error(error.message)
    }
}