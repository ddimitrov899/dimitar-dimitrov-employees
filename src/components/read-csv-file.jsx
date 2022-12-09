const ReadCSVFile = {
  readFile: (fileCSV) => {
    const reader = new FileReader()
    reader.onload = () => {
      let results = reader.result.split(/\s+/g).filter(Boolean)
      results = ReadCSVFile.getCurrentProjectWorks(results).filter(Boolean)
      if(results.length) {
        document.getElementById('output').innerHTML = results
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

export default ReadCSVFile;