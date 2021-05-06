function randomElement(array) {
  return array[Math.floor(Math.random()*array.length)];
}

function disableElements(els) {
  for (var i = 0, l = els.length; i < l; i++) {
    els[i].disabled = true;
  }
}

function enableElements(els) {
  for (var i = 0, l = els.length; i < l; i++) {
    els[i].disabled = true;
  }
}

function buttonHandler(turn, value) {
  if (turn === 'blue') {
    var blueChoice = value;
    var redChoice = parseInt(randomElement(document.querySelectorAll('button.redbtn:not(.inactive)')).id.substr(3), 10);
    document.getElementById('blue' + blueChoice).classList.add('inactive');
    document.getElementById('red' + redChoice).classList.add('inactive');
    if (blueChoice > redChoice) {
      var winner = 'blue';
    } else if (redChoice > blueChoice) {
      var winner = 'red';
    }
    
    if (winner) {
      var winnings = currentBottle + blueChoice + redChoice;
      document.getElementById(winner + 'score').innerHTML = (parseInt(document.getElementById(winner + 'score').innerHTML, 10) + winnings);
      log.innerHTML += '\n\nBlue chose bottle #' + blueChoice + '. Red chose bottle #' + redChoice + '.\nRound goes to ' + winner + ' for ' + winnings + ' points.';
    } else {
      log.innerHTML += '\n\nBlue chose bottle #' + blueChoice + '. Red chose bottle #' + redChoice + '.\nRound tied.';
    }
    document.getElementById('b' + currentBottle).classList.remove('active');
    document.getElementById('b' + currentBottle).classList.add('inactive');
    bottles = bottles.filter(item => item !== currentBottle);
    if (bottles.length) {
      currentBottle = randomElement(bottles);
      document.getElementById('b' + currentBottle).classList.add('active');
      log.innerHTML += '\n\nBottle #' + currentBottle + ' has been chosed.'
    } else {
      var bluePoints = document.getElementById('bluescore').innerHTML;
      var redPoints = document.getElementById('redscore').innerHTML;
      var matchWinner = bluePoints > redPoints ? 'blue' : redPoints > bluePoints ? 'red' : 'tie';
      log.innerHTML += '\n\nMatch result: ' + matchWinner + '.';
      setTimeout(() => {
        alert('winner: ' + matchWinner + '\n\nlearning reward/penalty: ' + (bluePoints - redPoints))
      }, 100);
    }
  }
}

const redbtns = document.getElementsByClassName('redbtn');
const bluebtns = document.getElementsByClassName('bluebtn');
const log = document.getElementById('log');
var bottles = [1, 2, 3, 4, 5, 6];

var currentBottle = randomElement(bottles);
disableElements(redbtns);

fetch('https://requestbin.fullcontact.com/1ahsmmo1')

for (let i = 1; i <= 6; i++) {
  //document.getElementById('red' + i).addEventListener('click', () => {buttonHandler('red', i);})
  document.getElementById('blue' + i).addEventListener('click', () => {buttonHandler('blue', i);})
}

document.getElementById('b' + currentBottle).classList.add('active');
log.innerHTML = 'The game has started. Bottle #' + currentBottle + ' has been selected.';