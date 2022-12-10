import React from 'react'
import ReadCSVFile from './../helpers/read-csv-file.helper'

export default function InputForm({readFile}) {
    return (
        <input type="file" name="employees" id="csv" accept=".csv" onChange={(e) => readFile(e.target.files[0])}/>
    )
}
