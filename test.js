
const { getCityFromLatLng } = require("./lib/utils/googleApi");

getCityFromLatLng({
    lat: "48.844497",
    long: "2.40234"
}).then((data) => console.log(data));

