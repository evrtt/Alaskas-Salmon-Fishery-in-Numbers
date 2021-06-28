export default (species) => {
  switch (species) {
    case "Chinook":
      return "#BF9AC4";
    case "Chinook (King)":
      return "#BF9AC4";
    case "Chum":
      return "#9AC4A8";
    case "Chum (Dog)":
      return "#9AC4A8";
    case "Coho":
      return "#A0A0A0";
    case "Coho (Silver)":
      return "#A0A0A0";
    case "Pink":
      return "#ECCECE";
    case "Pink (Humpy)":
      return "#ECCECE";
    case "Sockeye":
      return "#E28989";
    case "Sockeye (Red)":
      return "#E28989";
    default:
      return null
  }
}