const EPSILON = 10**(-5);
const CELLS_COLOURS = [new Colour(255, 255, 255, 255), new Colour(0, 0, 0, 255), new Colour(255, 0, 0, 255), new Colour(0, 0, 255, 255)];
let GAME_MAP;
let listKeysPressed = new Map();  
const GAME = document.getElementById('game');


document.addEventListener('DOMContentLoaded', () => {

    const START_BUTTON = document.getElementById('startButton');
    const PLAY_AGAIN_BUTTON = document.getElementById('playAgain');
    const PLAYER_NAMES = document.getElementById('playerNames');
    const MAP_SELECTION = document.getElementById('mapSelection');
    const CONTROL_SETTINGS = document.getElementById('controlSettings');
    const NEXT_TO_CONTROLS_BUTTON = document.getElementById('nextToControls');
    const NEXT_TO_MAPS_BUTTON = document.getElementById('nextToMaps');
    const START_GAME_BUTTON = document.getElementById('startGame');
    const KEYS_NAMES = ['moveForward', 'moveBackward', 'turnRight', 'turnLeft', 'shoot'];
    const MUSIC = new Audio();

    MUSIC.loop = true;
    MUSIC.autoplay = true;
    
    let currentTime;
    let idTick;

    let playersKeys = [{},{}]

    function endGame(){
        clearInterval(idTick);
        PLAY_AGAIN_BUTTON.style.display = "block";

    }


    function tick(){
        let nextTime = Date.now();
        let dt = (nextTime - currentTime)/1000; //Delta between two ticks in s
        currentTime = nextTime;
        
        Tank.updateTanksPosition(dt);
        Bullet.updateBulletsPosition(dt);
        Tank.shootTanks(dt);
        collisionsBulletsTanks();
        collisionsBulletsBullets();
        Bullet.drawBullets();
        Tank.drawTanks();

        if (listTanks.length === 1){
            endGame();
        }
    }    
    
    function playAgain(){
        PLAY_AGAIN_BUTTON.style.display = "none";
        initGame();
    }
    
    function resizeMap(){
        GAME_MAP.updateSize();
    }

    function updateKeysMap(){
        for (const playerKeys of playersKeys){
            for (const [key, value] of Object.entries(playerKeys)){
                listKeysPressed.set(value,false);
            }
        }
    }
    
    function initGame(){

        //To clear the map if there are elements
        Tank.clearTanks();
        Bullet.clearBullets();

        Tank.addTank(new Tank(GAME_MAP.spawns[0], 0,"rgb(255,0,0)", playersKeys[0]));
        Tank.addTank(new Tank(GAME_MAP.spawns[1],0,"rgb(0, 136, 255)", playersKeys[1]));

        currentTime = Date.now();
        
        window.addEventListener("resize", resizeMap);

        // Update keys pressed
        document.addEventListener("keydown", (e) => {
            if (listKeysPressed.has(e.key)){
                listKeysPressed.set(e.key, true);
            }
        });
        
        document.addEventListener("keyup", (e) => {
            if (listKeysPressed.has(e.key)){
                listKeysPressed.set(e.key, false);
            }
        });

        idTick = setInterval(tick, 10);
    }
    
    START_BUTTON.addEventListener('click', () => {
        START_BUTTON.style.display = 'none';
        PLAYER_NAMES.style.display = 'block';
        
        // Launch MUSIC
        MUSIC.addEventListener("loadeddata", () => MUSIC.play());
        MUSIC.src = "../audio/musique.mp3";
        MUSIC.load();
    });

    PLAY_AGAIN_BUTTON.addEventListener('click', playAgain);

    NEXT_TO_CONTROLS_BUTTON.addEventListener('click', () => {
        if (player1Name == "" || player2Name == "") {
            alert("Veuillez entrer un nom pour chaque joueur !");
            return;
        }

        PLAYER_NAMES.style.display = 'none';
        CONTROL_SETTINGS.style.display = 'block';
    });

    document.querySelectorAll('.key-input').forEach(function(input){
        input.addEventListener('keydown', function(event) {
            let key = event.key;

            switch(key){
                case 'ArrowUp':
                    input.value = "Fl.Haut";
                    break;
                case 'ArrowDown':
                    input.value = "Fl.Bas";
                    break;
                case 'ArrowLeft':
                    input.value = "Fl.Gauche";
                    break;
                case 'ArrowRight':
                    input.value = "Fl.Droite";
                    break;
                case ' ':
                    input.value = "Espace";
                    break;
                default:
                    if (key.length === 1) {
                        input.value = key.toUpperCase();
                    }
                    break;
            }
        });
    });

    NEXT_TO_MAPS_BUTTON.addEventListener('click', function(){
        const player1Controls = document.getElementById('player1Controls');
        const player1Inputs = player1Controls.querySelectorAll('.key-input');
        const player2Controls = document.getElementById('player2Controls');
        const player2Inputs = player2Controls.querySelectorAll('.key-input');
        function validateKeys(inputs, keys){
            const usedKeys = [];
            for (let i = 0 ; i < inputs.length ; i++) {
                let key = inputs[i].value;
                if (key == "" || usedKeys.includes(key)) {
                    alert("Chaque action doit avoir une touche unique !");
                    return false;
                }

                switch(key){
                    case "Fl.Haut":
                        key = 'ArrowUp';
                        break;
                    case "Fl.Bas":
                        key = 'ArrowDown';
                        break;
                    case "Fl.Gauche":
                        key = 'ArrowLeft';
                        break;
                    case "Fl.Droite":
                        key = 'ArrowRight';
                        break;
                    case "Espace":
                        key = ' ';
                        break;
                    default:
                        if (key.length === 1) {
                            key = key.toLowerCase();
                        }
                        break;
                }

                usedKeys.push(key);
                keys[KEYS_NAMES[i]] = key;
            }
            return true;
        };

        if (!validateKeys(player1Inputs, playersKeys[0]) || !validateKeys(player2Inputs, playersKeys[1])) {
            return;
        }

        CONTROL_SETTINGS.style.display = 'none';
        MAP_SELECTION.style.display = 'flex';
    });
    
    document.querySelectorAll('.map-image').forEach(function(map) {
        map.addEventListener('click', function() {
            selectedMap = this.getAttribute("id");
            document.querySelectorAll('.map img').forEach(function(img) {
                img.style.border = '2px solid transparent';
            });
            this.style.border = '2px solid #ff0000'; // Indique la sélection
        });
    });

    START_GAME_BUTTON.addEventListener('click', function() {
        if (!selectedMap) {
            alert("Veuillez sélectionner une carte !");
            return;
        }

        console.log("Carte sélectionnée :", selectedMap);
        console.log("Touches joueur 1 :", playersKeys[0]);
        console.log("Touches joueur 2 :", playersKeys[1]);

        MAP_SELECTION.style.display = 'none';

        GAME_MAP = new GameMap(GameMap.getGameMapData(selectedMap));
        console.log(GAME_MAP);
        GAME_MAP.load();
        GAME.style.visibility = "visible";
        updateKeysMap();
        initGame();
    });
});
