const TableHelper = {
    iterationProjects: (employees) => {
        let coupleProjects = []
        for (let i = 0; i < employees.length; i++) {
            const [firstEmpId, firstProjectId, firstDateFrom] = employees[i].split(';')
            for (let j = 1; j < employees.length; j++) {
                const [secondEmpId, secondProjectId, secondDateFrom] = employees[j].split(';')
                if (firstEmpId !== secondEmpId && !isNaN(new Date(firstDateFrom).getTime()) && !isNaN(new Date(secondDateFrom.toString()).getTime())) {
                    coupleProjects.push(TableHelper.getSameProjects(firstProjectId, secondProjectId, i, j))
                }
            }
        }
        return TableHelper.getUniquesArr(coupleProjects.filter(Boolean))
    },
    getSameProjects: (projectId1, projectId2, index, secIndex) => {

        if (Number(projectId1) === Number(projectId2)) {
            return [index, secIndex].sort()
        }
    },
    getProjectWorksOnSameDays: (coupleProjects, employees) => {
        const sameDates = []
        coupleProjects.map(coupleProject => {
            let [firstEmpId, firstProjectId, firstDateFrom, firstDateTo] = employees[coupleProject[0]].split(/[;,]]/g)
            let [secondEmpId, secondProjectId, secondDateFrom, secondDateTo] = employees[coupleProject[1]].split(/[;,]/g)
            if(isNaN(new Date(firstDateTo.toString()).getTime())) {
                firstDateTo = new Date(firstDateFrom).setDate(new Date(firstDateFrom).getDate() + 1)
            }
            if(isNaN(new Date(secondDateTo.toString()).getTime())) {
                secondDateTo = new Date(secondDateFrom).setDate(new Date(secondDateFrom).getDate() + 1)
            }
            let calcDays = TableHelper.dateCalculator((new Date(secondDateFrom) >= new Date(firstDateFrom) ?
                    new Date(secondDateFrom) : new Date(firstDateFrom)),
                new Date(secondDateTo) >= new Date(firstDateTo) ? new Date(firstDateTo) : new Date(secondDateTo))
            if(calcDays > 0) {
                sameDates.push({
                    emp1: firstEmpId,
                    emp2: secondEmpId,
                    projId: firstProjectId,
                    days: TableHelper.dateCalculator(
                        (new Date(secondDateFrom) >= new Date(firstDateFrom) ?
                            new Date(secondDateFrom) :
                            new Date(firstDateFrom)),
                        new Date(secondDateTo) >= new Date(firstDateTo) ? new Date(firstDateTo) : new Date(secondDateTo))
                })
            }
        })
        return sameDates
    },

    dateCalculator: (startDate, endDate) => {
        let days = 0
        for (let i = startDate; i < endDate; new Date(startDate.setDate(startDate.getDate() + 1))) {
            days++;
        }
        return days
    },

    getUniquesArr: (arr) => {
        const unique = []
        for (let i = 1; i < arr.length; i += 2) {
            let uniqueCounter = 0
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === arr[i - 1][j]) {
                    uniqueCounter++
                }
                if (uniqueCounter >= 2) {
                    unique.push(arr[i])
                    uniqueCounter = 0
                }
            }
        }
        return unique
    }
}

export default TableHelper
