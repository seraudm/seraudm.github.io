const EPSILON = 10**(-5);
const CELLS_COLOURS = [new Colour(255, 255, 255, 255), new Colour(0, 0, 0, 255), new Colour(255, 0, 0, 255), new Colour(0, 0, 255, 255)];
let GAME_MAP;
let listKeysPressed = new Map();  
const GAME = document.getElementById('game');


document.addEventListener('DOMContentLoaded', () => {

    const START_BUTTON = document.getElementById('startButton');
    const PLAY_AGAIN_BUTTON = document.getElementById('playAgain');
    const BACK_TO_MENU_BUTTON = document.getElementById('backToMenu');
    const NEXT_TO_CONTROLS_BUTTON = document.getElementById('nextToControls');
    const NEXT_TO_MAPS_BUTTON = document.getElementById('nextToMaps');

    const PLAYER_NAMES = document.getElementById('playerNames');
    const NUMBER_PLAYERS = document.getElementById("numberPlayers");
    const MAP_SELECTION = document.getElementById('mapSelection');
    const CONTROL_SETTINGS = document.getElementById('controlSettings');
    const START_GAME_BUTTON = document.getElementById('startGame');
    const END_GAME = document.getElementById("endGame-container");

    const PLAYER3_NAME = document.getElementById("player3Name");
    const PLAYER3_CONTROLS = document.getElementById("player3Controls");
    const PLAYER4_NAME = document.getElementById("player4Name");
    const PLAYER4_CONTROLS = document.getElementById("player4Controls");

    const KEYS_NAMES = ['moveForward', 'moveBackward', 'turnRight', 'turnLeft', 'shoot'];
    const TANK_COLORS = ["rgb(255,0,0)", "rgb(0, 136, 255)", "rgb(255,255,0)", "rgb(0,255,0)"]
    const MUSIC = new Audio();

    MUSIC.loop = true;
    MUSIC.autoplay = true;
    MUSIC.volume = 0.6;

    let currentTime;
    let idTick;
    let numberPlayers;
    let playerNames = ["","","",""];
    selectedMap = null;

    let playersKeys = [{},{},{},{}]

    function endGame(){
        clearInterval(idTick);
        END_GAME.style.display = "flex";
        const MESSAGE = document.getElementById("message");
        MESSAGE.innerHTML = listTanks[0].playerName + " a gagné !";
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
        END_GAME.style.display = "none";
        initGame();
    }

    function backToMainMenu(){
        END_GAME.style.display = "none";
        GAME.style.display = "none";
        START_BUTTON.style.display = "block";
        
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

        shuffleArray(GAME_MAP.spawns);

        for (let i=0; i<numberPlayers; i++){
            Tank.addTank(new Tank(GAME_MAP.spawns[i], Math.random() * 2 * Math.PI, TANK_COLORS[i], playersKeys[i], playerNames[i]));
        }

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
        NUMBER_PLAYERS.style.display = 'flex';
        
        // Launch MUSIC
        if (MUSIC.paused){
            MUSIC.addEventListener("loadeddata", () => MUSIC.play());
            MUSIC.src = "../audio/musique.mp3";
            MUSIC.load();
        }
    });

    
    document.querySelectorAll('.nextToPlayerName').forEach(function(button){
        button.addEventListener('click', function() {
            numberPlayers = parseInt(button.value);


            NUMBER_PLAYERS.style.display = "none";
            PLAYER_NAMES.style.display = "flex";

            if (numberPlayers >=3){
                PLAYER3_NAME.style.display = "block";
                PLAYER3_CONTROLS.style.display = "block";
            }
            
            if (numberPlayers >= 4){
                PLAYER4_NAME.style.display = "block";
                PLAYER4_CONTROLS.style.display = "block";
            }
            
        });
    });

    NEXT_TO_CONTROLS_BUTTON.addEventListener('click', () => {
        const PLAYERS_NAMES = document.querySelectorAll(".name-input")
        for (let i=0; i<PLAYERS_NAMES.length; i++){
            playerNames[i] = PLAYERS_NAMES[i].value;
        }


        for (const playerName of playerNames) {
            if (playerName == ""){
                alert("Veuillez entrer un nom pour chaque joueur !");
                return;
            }
        }
        
        PLAYER_NAMES.style.display = 'none';
        CONTROL_SETTINGS.style.display = 'flex';
        PLAYER3_NAME.style.display = "none";
        PLAYER4_NAME.style.display = "none";

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
        const player3Controls = document.getElementById('player3Controls');
        const player3Inputs = player3Controls.querySelectorAll('.key-input');
        const player4Controls = document.getElementById('player4Controls');
        const player4Inputs = player4Controls.querySelectorAll('.key-input');
        
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
        
        if (!validateKeys(player1Inputs, playersKeys[0]) || !validateKeys(player2Inputs, playersKeys[1]) || !validateKeys(player3Inputs, playersKeys[2]) || !validateKeys(player4Inputs, playersKeys[3])) {
            return;
        }
        
        CONTROL_SETTINGS.style.display = 'none';
        MAP_SELECTION.style.display = 'flex';
        PLAYER3_CONTROLS.style.display = "none";
        PLAYER4_CONTROLS.style.display = "none";
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
        
        MAP_SELECTION.style.display = 'none';
        
        GAME_MAP = new GameMap(GameMap.getGameMapData(selectedMap));
        GAME.style.display = "flex";
        GAME_MAP.load();
        updateKeysMap();
        initGame();
    });

    PLAY_AGAIN_BUTTON.addEventListener('click', playAgain);
    BACK_TO_MENU_BUTTON.addEventListener('click', backToMainMenu);

});
