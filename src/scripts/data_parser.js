export default () => {
  
  let byYear = {};
  let byArea = {};
  d3.csv("../../Gross_Earnings_Salmon_Summary_By_AREA.csv", d => {

    byYear[d["Year"]] ||= {};
    byYear[d["Year"]][d["Salmon Area Name"]] ||= [];
    // byYear[d["Year"]][d["Salmon Area Name"]][d["Species Code"]] ||= [];
    byYear[d["Year"]][d["Salmon Area Name"]]
      .push({
        species: d["Species Code"],
         pounds: parseInt(d["Pounds"])
      })

    byArea[d["Salmon Area Name"]] ||= {};
    byArea[d["Salmon Area Name"]][d["Year"]] ||= {};
    byArea[d["Salmon Area Name"]][d["Year"]][d["Species Code"]] ||= [];
    byArea[d["Salmon Area Name"]][d["Year"]][d["Species Code"]].push({
      pounds: d["Pounds"],
      fishCount: d["Number of Fish"],
      value: d["Estimated Exvessel Value (Nominal)"]
    })
    // byYear[d["Year"]] ||= {};
    // byYear[d["Year"]][d["Salmon Area Name"]] ||= {};
    // byYear[d["Year"]][d["Salmon Area Name"]][d["Species Code"]] ||= [];
    // byYear[d["Year"]][d["Salmon Area Name"]][d["Species Code"]].push({
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
  return {byYear, byArea}
}