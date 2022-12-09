import React from 'react'
import ReadCSVFile from './read-csv-file'

export default function InputForm() {
  return (
    <input type="file" name="employees" id="csv" accept=".csv" onChange={(e) => {
    ReadCSVFile.readFile(e.target.files[0]) 
    }}/>
 )
}
