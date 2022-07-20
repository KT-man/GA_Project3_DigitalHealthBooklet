const address = require("./clinicAddresses");

const api_key = "e30f2eac5c4f416c8021f7fc01375c66";

const test_address = [
  {
    address: "86 Redhill Close #01-600, Singapore 150086",
    coordinates: { lon: 0, lat: 0 },
  },
];

for (const add of address) {
  console.log(add.address);
  //   const getClinicGeocodes = async (url) => {
  //     let api_url = `https://api.geoapify.com/v1/geocode/search?text=${add.address.replace(
  //       "#",
  //       "%23"
  //     )}&format=json&apiKey=${api_key}`;
  //     console.log(api_url);
  //     try {
  //       const res = await fetch(api_url);
  //       const data = await res.json();

  //       add.coordinates.lon = data.results[0].lon;
  //       add.coordinates.lat = data.results[0].lat;

  //       console.log("------------");
  //       console.log(add);
  //       console.log("------------");
  //     } catch (error) {
  //       console.log("Error has occurred!");
  //       console.log(error);
  //     }
  //   };
  //   getClinicGeocodes();
}
