var button = $('.control button');
var textBox = $('.control input');
var ship = $('.ship');

var isLaunched = false;
var isDestroyed = false;

var launch = function () {
  if (isLaunched || isDestroyed) {
    return;
  }

  isLaunched = true;
  ship.attr('src', 'resources/spaceship.png');
};

function go(direction) {
  if (!isLaunched || isDestroyed) {
    return;
  }

  var directions = {
    'up': [0, 80],
    'down': [0, -80],
    'left': [-80, 0],
    'right': [80, 0]
  };

  var displacement = directions[direction];

  if (!displacement) {
    wrongCommand();
    return;
  }

  ship.css('left', parseInt(ship.css('left')) + displacement[0]);
  ship.css('bottom', parseInt(ship.css('bottom')) + displacement[1]);
}

function rotate(degrees) {
  if (!isLaunched || isDestroyed) {
    return;
  }

  var degNum = parseFloat(degrees);

  if (isNaN(degNum)) {
    wrongCommand();
    return;
  }

  ship.css('transform', 'rotate(' + degrees + 'deg)');
}

button.on('click', function (event) {
  event.preventDefault();

  var text = textBox.val();
  var words = text.split(' ');

  switch (words[0]) {
    case 'launch':
      launch();
      break;
    case 'go':
      go(words[1]);
      break;
    case 'rotate':
      rotate(words[1]);
      break;
    default:
      wrongCommand();
  }

  textBox.val('');
});

function wrongCommand() {
  isDestroyed = true;
  ship.attr('src', 'resources/explode.png');
}
