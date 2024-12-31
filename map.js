class GameMap{
    static HTML = document.getElementById('map');   

    static getImData(mapID){
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let img = document.getElementById(mapID);
    
        let width = img.width;
        let height = img.height;
    
        canvas.width = width
        canvas.height = height;
        context.drawImage(img, 0, 0 );
    
        let myData = context.getImageData(0, 0, img.width, img.height);
        return myData;
    }

    static getGameMapData(mapID){
        let imData = GameMap.getImData(mapID);
    
        let map = [];
        for (let line = 0; line < imData.height; line ++){
            map.push([]);
            for (let column = 0; column < imData.width; column ++){
                let colour = new Colour(
                    imData.data[(line * imData.width + column)*4],
                    imData.data[(line * imData.width + column)*4 + 1],
                    imData.data[(line * imData.width + column)*4 + 2],
                    imData.data[(line * imData.width + column)*4 + 3]
                );
                map[line].push(getIndexColour(colour));
            }
        }
    
        return map;
    }

    constructor (data){
        this.DATA = data;
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
                    cell.style.backgroundColor = "rgb(51, 51, 51)";
                } else if (this.DATA[i][j] === 2){
                    this.spawns.push(new Vector(j+0.5, i+0.5));
                } else if (this.DATA[i][j] === 3){
                    cell.style.backgroundColor = "rgb(0, 166, 255)";
                }
                GameMap.HTML.appendChild(cell);
              }
        }

        this.updateSize();
    }
    
    
    static getMapByID (mapID){
        return new GameMap(GameMap.getGameMapData(mapID));   
    }

}