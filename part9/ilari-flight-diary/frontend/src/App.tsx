import axios from 'axios'
import { useEffect, useState } from 'react'
import { DiaryEntry } from './types';
import Diaries from './Components/Diaries';
import Form from './Components/Form';

function App() {
  const [ diaryEntries , setDiaryEnteries ] = useState<DiaryEntry[]>([])
  const [ error , setError] = useState("Could not add the Entry")
  const [ showErrorDiv, setShowErrorDiv ] = useState(false)
  useEffect(()=>{
    axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((res)=>{
        setDiaryEnteries(res.data)
      })
      .catch(error=>{
        console.error(error)
      });
  },[])
  function showError(value : string){
    setError(value)
    setShowErrorDiv(true)
  }
  function addNewData(value : DiaryEntry){
    setDiaryEnteries(diaryEntries.concat(value))
  }
  return (
    <div>
      {showErrorDiv && 
        <div>
          {error}
        </div>
      }
      <Form addNewData={addNewData} showError={showError} />
      <Diaries diaryEnteries={diaryEntries}  />
    </div>
  )
}

export default App
