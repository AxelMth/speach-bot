const axios = require("axios");
async function getFromGoogleApi(location, keyword) {
  let _location = location.lat + ", " + location.long;
  let shops = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${_location}&radius=1500&keyword=${keyword}&opennow&key=${
      process.env.GOOGLE_MAP_KEY_API
    }`
  );
  return shops.data.results;
}
module.exports = {
  getFromGoogleApi
};
