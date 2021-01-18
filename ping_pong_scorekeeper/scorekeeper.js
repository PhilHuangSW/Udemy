const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const pOnePoint = document.querySelector('#pOnePoint')
const pTwoPoint = document.querySelector('#pTwoPoint')
const reset = document.querySelector('#reset')
const to5 = document.querySelector('#to5')
const to6 = document.querySelector('#to6')
const to7 = document.querySelector('#to7')
const to8 = document.querySelector('#to8')
const to9 = document.querySelector('#to9')
const scoreTo = document.querySelector('#scoreTo')

let playerOnePoints = 0;
let playerTwoPoints = 0;

const winningPoint = (score) => {
  switch (score) {
    case 'to5':
      return 5
    case 'to6':
      return 6
    case 'to7':
      return 7
    case 'to8':
      return 8
    case 'to9':
      return 9
    default:
      return 5
  }
}

scoreTo.addEventListener('change', function () {
  playerOnePoints = 0;
  playerTwoPoints = 0;
  p1.innerText = playerOnePoints;
  p2.innerText = playerTwoPoints;
  pOnePoint.disabled = false;
  pTwoPoint.disabled = false;
  p1.classList.remove('has-text-success', 'has-text-danger')
  p2.classList.remove('has-text-success', 'has-text-danger')
})

pOnePoint.addEventListener('click', function () {
  playerOnePoints += 1;
  console.log(playerOnePoints);
  p1.innerText = playerOnePoints;
  let win = winningPoint(scoreTo.value);
  if (playerOnePoints >= win) {
    p2.classList.add('has-text-danger')
    p1.classList.add('has-text-success')
    pOnePoint.disabled = true;
    pTwoPoint.disabled = true;
  }
})

pTwoPoint.addEventListener('click', function () {
  playerTwoPoints += 1;
  console.log(playerTwoPoints);
  p2.innerText = playerTwoPoints;
  let win = winningPoint(scoreTo.value);
  if (playerTwoPoints >= win) {
    p1.classList.add('has-text-danger')
    p2.classList.add('has-text-success')
    pOnePoint.disabled = true;
    pTwoPoint.disabled = true;
  }
})

reset.addEventListener('click', function () {
  playerOnePoints = 0;
  playerTwoPoints = 0;
  p1.innerText = playerOnePoints;
  p2.innerText = playerTwoPoints;
  pOnePoint.disabled = false;
  pTwoPoint.disabled = false;
  p1.classList.remove('has-text-success', 'has-text-danger')
  p2.classList.remove('has-text-success', 'has-text-danger')
})

