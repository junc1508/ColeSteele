// axios.get("https://swapi.dev/api/people/1")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log("Error");
//   })


const getStarwarsPerson = async (id) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    console.log(res.data);
  } catch (e) {
    console.log("error")
  }
}

const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');
const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  const newLI = document.createElement('LI');
  newLI.append(jokeText);
  jokes.append(newLI);
}
const getDadJoke = async () => {
  //headers that specifies the type
  try {
    const config = { headers: { Accept: 'application/json' } };
    const res = await axios.get('https://icanhazdadjoke.com', config); //text html
    return res.data.joke;
  } catch (e) {
    return "No Jokes sorry :("
  }

}
button.addEventListener('click', addNewJoke);