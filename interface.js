const EPSILON = 10**(-5);
const CELLS_COLOURS = [new Colour(255, 255, 255, 255), new Colour(0, 0, 0, 255), new Colour(255, 0, 0, 255), new Colour(0, 0, 255, 255)];
const GAME_MAP = GameMap.getMapByID("labyrinth");
let listKeysPressed = new Map();  
const GAME = document.getElementById('game');


document.addEventListener('DOMContentLoaded', () => {

    const START_BUTTON = document.getElementById('startButton');
    const PLAYER_NAMES = document.getElementById('playerNames');
    const CONTROL_SETTINGS = document.getElementById('controlSettings');
    const NEXT_TO_CONTROLS = document.getElementById('nextToControls');
    const START_GAME = document.getElementById('startGame');
    const KEYS_NAMES = ['moveForward', 'moveBackward', 'turnRight', 'turnLeft', 'shoot'];
    const MUSIC = new Audio();

    MUSIC.loop = true;
    MUSIC.autoplay = true;
    
    let currentTime;

    let playersKeys = [{},{}]


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
    
    function main(){
        GAME_MAP.load();
        GAME.style.visibility = "visible";
        updateKeysMap();

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
        setInterval(tick, 10);
    }
    
    START_BUTTON.addEventListener('click', () => {
        START_BUTTON.style.display = 'none';
        PLAYER_NAMES.style.display = 'block';
        MUSIC.addEventListener("loadeddata", () => MUSIC.play());
        MUSIC.src = "../audio/musique.mp3";
        MUSIC.load();
    });

    NEXT_TO_CONTROLS.addEventListener('click', () => {
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

    START_GAME.addEventListener('click', function(){
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
        console.log("Contrôles Joueur 1 : ", playersKeys[0]);
        console.log("Contrôles Joueur 2 : ", playersKeys[0]);
        console.log("Le jeu commence !");
        main();
    });
});
