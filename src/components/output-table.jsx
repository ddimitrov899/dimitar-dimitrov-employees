import React from 'react'
import '../styles/output.css'
const OutputTable = ({employees}) => {

    const renderEmployeesOnSameDate = () => {
        return employees.map((employee, key) => {
            return (<tr key={key}>
                <td>{employee.emp1}</td>
                <td>{employee.emp2}</td>
                <td>{employee.projId}</td>
                <td>{employee.days}</td>
            </tr>)
        })
    };

    return (
        <div id="output">
            {employees.length > 0? <table>
                <thead>
                <tr>
                    <th>Employee ID #1</th>
                    <th>Employee ID #2</th>
                    <th>Project ID</th>
                    <th>Days worked</th>
                </tr>
                </thead>
                <tbody>
                    {renderEmployeesOnSameDate()}
                </tbody>
            </table> : <h3>No Employees found</h3>}
        </div>)
}
export default OutputTable
