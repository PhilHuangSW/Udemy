const jokes = document.querySelector('#jokes-list')
const button = document.querySelector('#jokes-button')

const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  const newLI = document.createElement("li");
  newLI.append(jokeText);
  jokes.append(newLI);
}

const getDadJoke = async () => {
  const config = { headers: { Accept: 'application/json' } }
  const res = await axios.get('https://icanhazdadjoke.com/', config)
  // console.log(res.data.joke);
  return res.data.joke;
}

button.addEventListener('click', addNewJoke)

