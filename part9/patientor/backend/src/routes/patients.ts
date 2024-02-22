import express from "express";
import patientServices from "../services/patientServices";
import newPatientEntry, { verifyNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res)=>{
    const result = patientServices.getAllPatients()
    res.json({data : result})
})

router.get("/:id", (req, res)=>{
    const id = req.params.id
    try {
        const patientData = patientServices.getPatientSpecific(id)
        if(!patientData) throw new Error("the id provide is not orrect")
        res.json(patientData)
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error : error.message})
        } 
    }
})

router.post("/:id/enteries", (req, res)=>{
    const { id } = req.params
    try {
        const newEntryVerify = verifyNewEntry(req.body)
        const addedEntry = patientServices.addNewEntryForPatient(id, newEntryVerify)
        res.json(addedEntry)
    } catch (error) {
        if(error instanceof Error){
            res.status(400).json(error)
        }
    }
})

router.post("/", (req, res)=>{
    try {
        const patientDataVerified = newPatientEntry(req.body)
        const addedEntry = patientServices.addPatient(patientDataVerified)
        res.json(addedEntry)
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
            res.status(400).json({error : error.message})
        }
    }
})

export default router