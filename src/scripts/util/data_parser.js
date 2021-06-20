export default () => {
  
  let byYear = {};
  let byArea = {};

  d3.csv("./Gross_Earnings_Salmon_Summary_By_AREA.csv", d => {

    byYear[d["Year"]] ||= {};
    byYear[d["Year"]][d["Salmon Area Name"]] ||= [];
    byYear[d["Year"]][d["Salmon Area Name"]]
      .push({
        species: d["Species Code"],
         pounds: parseInt(d["Pounds"]),
        value: parseInt(d["Estimated Exvessel Value (Nominal)"]),
        numFish: parseInt(d["Number Of Fish"])
      })

    byArea[d["Salmon Area Name"]] ||= {};
    byArea[d["Salmon Area Name"]][d["Year"]] ||= {};
    byArea[d["Salmon Area Name"]][d["Year"]][d["Species Code"]] = {
      pounds: d["Pounds"],
      value: d["Estimated Exvessel Value (Nominal)"],
      numFish: d["Number Of Fish"]
    }
    

  
    
    // byArea[d["Salmon Area Name"]] ||= [];
    // byArea[d["Salmon Area Name"]][d["Year"]] ||= {};
    // byArea[d["Salmon Area Name"]][d["Year"]].push({
    //   year: d["Year"],
    //   chinook: d["Species Code"]
      // ["Pounds"],
      // chum: d["Chum"]["Pounds"],
      // coho: d["Coho"]["Pounds"],
      // pink: d['Pink']["Pounds"],
      // sockeye: d["Sockeye"]["Pounds"]
    // })
    // byArea[d["Salmon Area Name"]][d["Year"]][d["Species Code"]] ||= [];
    
    // byArea[d["Salmon Area Name"]].push({
    //   pounds: d["Pounds"],
    //   fishCount: d["Number of Fish"],
    //   value: d["Estimated Exvessel Value (Nominal)"]
    // })
    
    // byArea[d["Salmon Area Name"]] ||= {};
    // byArea[d["Salmon Area Name"]][d["Year"]] ||= {};
    // byArea[d["Salmon Area Name"]][d["Year"]][d["Species Code"]] ||= [];
    // byArea[d["Salmon Area Name"]][d["Year"]][d["Species Code"]].push({
    //   pounds: d["Pounds"],
    //   fishCount: d["Number of Fish"],
    //   value: d["Estimated Exvessel Value (Nominal)"]
    // })

  })

  console.log(byArea, "byArea")
  console.log(byYear, "byYear")

  return {byYear, byArea}
}