// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const pokemon = document.querySelector('#container');

// const newImg = document.createElement('img');
// newImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"

for (let i = 1; i < 152; i++) {
    const poke = document.createElement('div');
    poke.classList.add('pokemon')
    const label = document.createElement('span');
    label.innerText = `#${i}`;
    const newImg = document.createElement('img');
    newImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
    poke.appendChild(newImg);
    poke.appendChild(label);
    pokemon.appendChild(poke);
}