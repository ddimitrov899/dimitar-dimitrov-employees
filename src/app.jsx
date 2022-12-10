import React, {useState} from 'react'
import InputForm from './components/input-form'
import OutputTable from './components/output-table'
import ReadCSVFile from "./helpers/read-csv-file.helper";

export default function App() {
    const [employees, setEmployees] = useState(null)
    const readFile = (file) => {
        ReadCSVFile.readFile(file, (err, res) => {
            if(!err) {
                setEmployees(res)
            }
        })
    }
    return (
        <main>
            <InputForm readFile={readFile}/>
            {employees ? <OutputTable employees={employees}/>  : null}
        </main>
    )
}
