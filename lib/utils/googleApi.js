const axios = require("axios");
async function getFromGoogleApi(location, keyword) {
  let _location = location.lat + ", " + location.long;
  let rawData = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${_location}&radius=1500&keyword=${keyword}&opening_hours/weekday_text&opennow&key=${
      process.env.GOOGLE_MAP_KEY_API
    }`
  );
  console.log(rawData.data.results);
  let shops = rawData.data.results.map(element => {
    let aux = {};
    aux.name = element.name;
    aux.icon = element.icon;
    aux.rating = element.rating;
    aux.address = element.vicinity;

    return aux;
  });
  return shops;
}
async function getCityFromLatLng({ lat, long }) {
  let city = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=AIzaSyDQ-CqVJDsNGlA4mmKn0tngXA2nEJlupQs`
  );
  return city.data.results[0].address_components.find(e => {
    return e.types.indexOf("locality") != -1;
  }).short_name;
}
module.exports = {
  getFromGoogleApi,
  getCityFromLatLng
};
