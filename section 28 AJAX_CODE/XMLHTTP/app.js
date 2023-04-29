// NOT AT ALL IMPORTANT TO REMEMBER ANY OF THIS CODE!

const req = new XMLHttpRequest();
//attached to 2 callbacks
req.onload = function () {
  console.log("IT LOADED!!");
  const data = JSON.parse(this.responseText);
  console.log(data);

};
req.onerror = function () {
  console.log("ERROR");
  console.log(this);

}
req.open("GET", "https://swapi.dev/api/people/1");
req.send();
