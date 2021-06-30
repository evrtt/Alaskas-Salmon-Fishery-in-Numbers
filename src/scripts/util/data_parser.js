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
      species: d["Species Code"],
      pounds: d["Pounds"],
      value: d["Estimated Exvessel Value (Nominal)"],
      numFish: d["Number Of Fish"]
    }
  })

  return {byYear, byArea}
}