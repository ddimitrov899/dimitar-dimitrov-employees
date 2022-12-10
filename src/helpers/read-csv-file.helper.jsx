import TableHelper from "./table.helper";

const ReadCsvFileHelper = {
  readFile: (fileCSV, callback) => {
    const reader = new FileReader()
    reader.onload = () => {
      let results = reader.result.split(/\s+/g).filter(Boolean)
      results = ReadCsvFileHelper.getCurrentProjectWorks(results).filter(Boolean)
      if(results.length) {
        const coupleProjects = TableHelper.iterationProjects(results)
        results = TableHelper.getProjectWorksOnSameDays(coupleProjects, results)
        callback(null, results)
      }
    }
    reader.readAsBinaryString(fileCSV)
  },

  getCurrentProjectWorks: (results) => {
    return results.map(result => {
      if(!isNaN(result[0])) {
        return result
      }
    })
  },

}

export default ReadCsvFileHelper;
