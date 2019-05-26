const axios = require("axios");
async function getFromGoogleApi(location, keyword) {
  let shops = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1500&keyword=${keyword}&opennow&key=AIzaSyDQ-CqVJDsNGlA4mmKn0tngXA2nEJlupQs`
  );
  return shops.data.results;
}
async function getCityFromLatLng({
  lat,
  long
}) {
  let city = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=AIzaSyDQ-CqVJDsNGlA4mmKn0tngXA2nEJlupQs`
  );
  return city.data.results[0].address_components
    .find(e => {
        return e.types.indexOf("locality") != -1
    })
    .short_name;
}
module.exports = {
  getFromGoogleApi,
  getCityFromLatLng
};
