import express from "express"
import BMICalculator from "./bmiCalculator";
import path from "path"
import calculateExcercises from "./exerciseCalculator";
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use(express.static("./index.html"))

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get("/bmi", (req, res)=>{
    const { height , weight } = req.query
    if(!height || !weight) res.status(400).send({ error : "malformatted parameters"})
    else{
        const bmi : string = BMICalculator(Number(height), Number(weight));
        res.send({
            weight,
            height,
            bmi
        })
}
})
app.get("/exercises", (_req, res)=>{
  res.sendFile(path.join(__dirname, "index.html"))
})
app.post("/exercises", (req, res)=>{
  
  const { daily_exercises, target} = req.body  
  if(!daily_exercises || !target) res.status(400).send({ error : "parameteres missing"})
  else if(isNaN(Number(target))){
    res.status(400).send({error : "malformatted parameters"})
  }else{
  const array: number[] = JSON.parse(daily_exercises)
  const result = calculateExcercises(array, Number(target))

  res.send({
    ...result
  })
}
})
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});