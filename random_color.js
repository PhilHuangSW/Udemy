const btn = document.querySelector('#btn')
const h1 = document.querySelector('#h1')
const body = document.querySelector('body')
const rand = document.querySelector('#rand')

function randomBG() {
  return Math.floor(Math.random() * 255) + 1;
}

rand.addEventListener('click', function () {
  console.log('hi');
})

// rand.onclick = function () {
//   console.log('hi')
// }

btn.addEventListener('click', function () {
  h1.style.color = "black"
  let rdn1 = randomBG()
  let rdn2 = randomBG()
  let rdn3 = randomBG()
  h1.innerText = `rgb(${rdn1},${rdn2},${rdn3})`
  body.style.backgroundColor = `rgb(${rdn1},${rdn2},${rdn3})`
  if (rdn1 < 50 && rdn2 < 50 || rdn1 < 50 && rdn3 < 50 || rdn2 < 50 && rdn3 < 50) {
    h1.style.color = "white"
  }
})

