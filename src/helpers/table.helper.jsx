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
            const [firstEmpId, firstProjectId, firstDateFrom, firstDateTo] = employees[coupleProject[0]].split(';')
            const [secondEmpId, secondProjectId, secondDateFrom, secondDateTo] = employees[coupleProject[1]].split(';')
            if ((Date.parse(secondDateFrom) >= Date.parse(firstDateFrom) ||
                Date.parse(firstDateTo) <= Date.parse(secondDateTo))) {
                sameDates.push({
                    firstEmpId,
                    firstProjectId,
                    firstDateFrom,
                    firstDateTo,
                    secondEmpId,
                    secondProjectId,
                    secondDateFrom,
                    secondDateTo
                })
            }
        })
        return sameDates
    },
    calculateDaysOnSame: (sameDates) => {
        const proj = []
        sameDates.map(sameDate => {
            if (isNaN(new Date(sameDate.firstDateTo).getTime()) || isNaN(new Date(sameDate.secondDateTo).getTime())) {
                proj.push({
                    emp1: sameDate.firstEmpId,
                    emp2: sameDate.secondEmpId,
                    projId: sameDate.firstProjectId,
                    days: 1
                })
            } else if (new Date(sameDate.firstDateTo).getTime() > new Date(sameDate.secondDateTo).getTime()) {
                proj.push({
                    emp1: sameDate.firstEmpId,
                    emp2: sameDate.secondEmpId,
                    projId: sameDate.firstProjectId,
                    days: TableHelper.dateCalculator(
                        (new Date(sameDate.secondDateFrom) >= new Date(sameDate.firstDateFrom) ?
                            new Date(sameDate.secondDateFrom) :
                            new Date(sameDate.firstDateFrom)),
                        new Date(sameDate.secondDateTo))
                })
            }
        })
        return proj
    },
    dateCalculator: (startDate, endDate) => {
        let days = 0
        for (let i = startDate; i <= endDate; new Date(startDate.setDate(startDate.getDate() + 1))) {
            days++;
        }
        return days
    },

    getUniquesArr: (arr) => {
        const unique = []
        for (let i = 1; i < arr.length; i+=2) {
            let uniqueCounter = 0
            for (let j = 0; j < arr[i].length; j++) {
                if(arr[i][j] === arr[i - 1][j]) {
                    uniqueCounter++
                }
                if(uniqueCounter >= 2) {
                    unique.push(arr[i])
                    uniqueCounter = 0
                }
            }
        }
        return unique
    }
}

export default TableHelper
