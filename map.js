class GameMap{
    static HTML = document.getElementById('map');   

    constructor (mapID){
        this.DATA = getGameMapData(mapID);
        this.SIZE_X = this.DATA[0].length;
        this.SIZE_Y = this.DATA.length;
        this.coordinates = null;
        this.sizePx = null;
        this.spawns = [];
    }

    updateSize(){
        let ratio = this.SIZE_X / this.SIZE_Y;
        if (window.innerHeight * this.SIZE_X < window.innerWidth * this.SIZE_Y){
            GameMap.HTML.style.width = `${100 * ratio}vh`;
            GameMap.HTML.style.height = "100vh";
    
        } else {
            GameMap.HTML.style.width = "100vw";
            GameMap.HTML.style.height = `${100 / ratio}vw`;
        }
        this.coordinates = GameMap.HTML.getBoundingClientRect();
        this.sizePx={xMax: this.coordinates.right, xMin: this.coordinates.left, yMin: this.coordinates.top, yMax: this.coordinates.bottom};
    }

    load(){
    
        GameMap.HTML.style.gridTemplate = `repeat(${this.SIZE_Y}, 1fr) / repeat(${this.SIZE_X}, 1fr)`;
    
        for (let i = 0; i < this.SIZE_Y; i++) {
            for (let j = 0; j < this.SIZE_X; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                if (this.DATA[i][j]===1){
                    cell.style.backgroundColor = "#333";
                } else if (this.DATA[i][j] === 2){
                    this.spawns.push(new Vector(j+0.5, i+0.5));
                }
                GameMap.HTML.appendChild(cell);
              }
        }

        this.updateSize();
    }
    
}