document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const playerNames = document.getElementById('playerNames');
    const controlSettings = document.getElementById('controlSettings');
    const nextToControls = document.getElementById('nextToControls');
    const startGame = document.getElementById('startGame');

    let player1Keys = {};
    let player2Keys = {};

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        playerNames.style.display = 'block';
    });

    nextToControls.addEventListener('click', () => {
        if (player1Name == "" || player2Name == "") {
            alert("Veuillez entrer un nom pour chaque joueur !");
            return;
        }

        playerNames.style.display = 'none';
        controlSettings.style.display = 'block';
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

    startGame.addEventListener('click', function(){
        const player1Controls = document.getElementById('player1Controls');
        const player1Inputs = player1Controls.querySelectorAll('.key-input');
        const player2Controls = document.getElementById('player2Controls');
        const player2Inputs = player1Controls.querySelectorAll('.key-input');
        function validateKeys(inputs, keys){
            const usedKeys = [];
            for (let i = 0 ; i < inputs.length ; i++) {
                const key = inputs[i].value;
                if (key == "" || usedKeys.includes(key)) {
                    alert("Chaque action doit avoir une touche unique !");
                    return false;
                }
                usedKeys.push(key);
                keys['input' + i] = key;
            }
            return true;
        };

        if (!validateKeys(player1Inputs, player1Keys) || !validateKeys(player2Inputs, player2Keys)) {
            return;
        }

        controlSettings.style.display = 'none';
        console.log("Contrôles Joueur 1 : ", player1Keys);
        console.log("Contrôles Joueur 2 : ", player2Keys);
        console.log("Le jeu commence !");
    });
});
