// fetch("https://swapi.dev/api/people/1/")
//   .then((res) => {
//     console.log("Resolved", res);
//     return res.json();
//   })
//   .then((data) => {
//     console.log('JSON Done', data);
//     //second request
//     return fetch("https://swapi.dev/api/people/2/");
//   })
//   .then((res) => {
//     console.log("Second request resolved")
//   })
//   .catch(e => {
//     console.log("Error", e);
//   });
const loadStarWarsPeople = async () => {
  try {
    const res = await fetch("https://swapi.dev/api/people/1/");
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log("ERROR!", e);
  }
};
loadStarWarsPeople();