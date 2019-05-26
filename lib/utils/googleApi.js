const axios = require("axios");
async function getFromGoogleApi(location, keyword) {
  let shops = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1500&keyword=${keyword}&opennow&key=AIzaSyDQ-CqVJDsNGlA4mmKn0tngXA2nEJlupQs`
  );
  return shops.data.results;
}
module.exports = {
  getFromGoogleApi
};
