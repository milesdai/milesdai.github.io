var button = document.getElementById('generate-button');
button.addEventListener('click', generateBoard);
// button.addEventListener("keyup", function(event) {
//     if (event.keyCode === 13) { // check if enter key is pressed
//       document.getElementById("generate-button").click();
//     }
//     console.log('test');
//   }); 

var height = 0;
var width = 0;

var startTime = Date.now();
var elapsedTime = '';

function generateBoard() {
    width = parseInt(document.getElementById('width-field').value);
    height = parseInt(document.getElementById('height-field').value);
    if (isNaN(width) || isNaN(height) || width < 1 || height < 1) {
        document.getElementById('game-area').innerHTML = 'Invalid width/height.';
        return;
    }

    var gameArea = document.getElementById('game-area');
    // First remove any existing tiles
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }
    // Add new tiles
    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {
            let newTile = document.createElement('div');
            newTile.className = 'tile on';
            newTile.id = i + ',' + j;
            newTile.addEventListener('click', clickHandler);
            gameArea.appendChild(newTile);
        }
        gameArea.appendChild(document.createElement('br'));
    }

    scramble();
    startTime = Date.now();

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
}

function scramble() {
    var scramble_iters = Math.ceil(width * height / 2);
    for(var k = 0; k < scramble_iters; k++) {
        var i = getRandomInt(height);
        var j = getRandomInt(width);
        eventFire(document.getElementById(i + ',' + j), 'click');
    }
}

function clickHandler() {
    var [i, j] = this.id.split(',')
    i = parseInt(i);
    j = parseInt(j);
    var toggleList = [[i,j], [i - 1, j], [i + 1, j], [i, j + 1], [i, j - 1]];
    for (var k = 0; k < toggleList.length; k++) {
        let [i, j] = toggleList[k];
        if (i < 0 || i >= height || j < 0 || j >= width) {
            continue;
        } else {
            // Toggle square
            var tile = document.getElementById(i + ',' + j);
            tile.classList.toggle('on');
        }
    }
    checkWin();
}

function checkWin() {
    for(var i = 0; i < height; i++) {
        for(var j = 0; j < width; j++) {
            if(!document.getElementById(i + ',' + j).classList.contains('on'))
                return;
        }
    }
    alert('Win!\nTime: ' + elapsedTime);
}


setInterval(function() {
    var delta = (Date.now() - startTime) / 1000;
    seconds = Math.floor(delta % 60);
    if (seconds < 10) { seconds = '0' + seconds};
    minutes = Math.floor(delta / 60);
    elapsedTime = minutes + ':' + seconds;
    document.getElementById('time-box').innerText = elapsedTime;
}, 1000);