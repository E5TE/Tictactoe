import { Fix } from "../utils/Fix";

export class UserInterface {
    private ctx:any;
    private lastState:Function = this.showWelcomeSign;
    private winner:string = '';
    constructor(context:any){
        this.ctx = context;
    }
    public updateView():void {
        if(this.winner == '') this.lastState();
        else this.gameEnd(this.winner);
        
    }
    public clearBoard():void {
        this.ctx.clearRect(0, 0, Fix.WIDTH, Fix.HEIGHT);
    }
    public showWelcomeSign():void {
        this.showMenu();
        this.drawText(Fix.CENTER-500/2, Fix.TOP+150, '#000', "rgba(0,0,0,0.3)", 12, 'bold', '35px',
         'Racer', 'Do you want to play?');
    }
    public showChooseGameMode():void {
        this.lastState = this.showChooseGameMode;
        this.winner = '';
        this.showMenu();
        this.drawText(Fix.CENTER-520/2, Fix.TOP+150, '#000', "rgba(0,0,0,0.3)", 12, 'bold', '35px',
        'Racer', 'Choose your opponent');
    }
    public showChooseSymbol():void {
        this.lastState = this.showChooseSymbol;
        this.winner = '';
        this.showMenu();
        this.drawText(Fix.CENTER-500/2, Fix.TOP+150, '#000', "rgba(0,0,0,0.3)", 12, 'bold', '35px',
         'Racer', 'Choose your symbol');
    }
    public gameEnd(winner:string):void {
        this.winner = winner;
        let gap:number = 25*winner.length;
        this.drawRectRounded(Fix.CENTER - 650/2, Fix.TOP - 120, 600, 520,
        20, 10, 5, '#6c6c6c6c',
        '#505050', 'rgba(83, 24, 187, 0.8)');
        this.drawText(Fix.CENTER - 310, Fix.TOP - 30, '#000', "rgba(0,0,0,0.3)", 12, 'bold', '50px',
        'Racer', 'The Game is Over');
        this.drawText(Fix.CENTER - 100, Fix.TOP + 40, '#000', "rgba(0,0,0,0.3)", 12, 'bold', '40px',
        'Racer', 'Winner:');
        this.drawText(Fix.CENTER - gap, Fix.TOP + 115, 'white', "black", 12, 'bold', '50px',
        'Racer', winner);
        this.drawText(Fix.CENTER - 300, Fix.TOP + 180, '#000', "rgba(0,0,0,0.3)", 12, 'bold', '26px',
        'Racer', 'Whould you like to play again?');
    }
    public gameStart(playerStart:string):void {
        let gap:number = 10*playerStart.length; 
        this.drawText(Fix.CENTER - 110 , Fix.TOP + 45, '#000', "#fff", 12, 'bold', '30px', 'Racer', 'Will Start');
        this.drawText(Fix.CENTER - gap, Fix.TOP + 80, '#000', "#fff", 12, 'bold', '25px', 'Racer', playerStart);
    }
    private showMenu():void {
        this.clearBoard();
        this.drawRectRounded(Fix.CENTER - 650/2, Fix.HEIGHT/2 - 650/2, 650, 650,
        20, 10, 5, '#6c6c6c6c',
        '#505050', 'rgba(83, 24, 187, 0.8)');
        this.drawText(Fix.CENTER - 600/2, Fix.TOP-30, '#000', "rgba(0,0,0,0.3)", 12, 'bold', '40px',
        'Racer', 'Welcome To the game');
        this.drawText(Fix.CENTER-350/2, Fix.TOP+60, '#000', "rgba(0,0,0,0.3)", 12, 'bold', '50px',
        'Racer', 'Tic-Tac-Toe');
    }
    public showBinaryButtons(left:string, right:string, cursor:boolean):void {
        if(cursor) {
            this.drawButtonUnselected(400, 500, left);
            this.drawButtonSelected(740, 500, right);
        }else{
            this.drawButtonSelected(400, 500, left);
            this.drawButtonUnselected(740, 500, right);
        }
    }
    public showCursor(obj:any):void {
        this.ctx.save();
        let x:number = obj.x + 30;
        let y:number = obj.y + 30;
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect( x, y , 180, 180);
        this.ctx.restore();
        this.ctx.globalAlpha = 1;
    }
    public drawBoard():void {
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(Fix.LEFT + Fix.CELL, 10);
        this.ctx.lineTo(Fix.LEFT + Fix.CELL, Fix.HEIGHT - 10);
        this.ctx.moveTo(Fix.LEFT + Fix.CELL * 2, 10);
        this.ctx.lineTo(Fix.LEFT + Fix.CELL * 2, Fix.HEIGHT - 10);
        this.ctx.moveTo(Fix.LEFT + 10, Fix.CELL);
        this.ctx.lineTo(Fix.LEFT + Fix.HEIGHT - 10, Fix.CELL);
        this.ctx.moveTo(Fix.LEFT + 10, Fix.CELL * 2);
        this.ctx.lineTo(Fix.LEFT + Fix.HEIGHT - 10, Fix.CELL * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }
    public fillBoard(map:Array<number>):void {
        this.clearBoard();
        this.drawBoard();
        for (let i = 0; i < map.length; i++) {
            switch (map[i]) {
                case 1:
                    this.drawX(Fix.POSITIONS[i]);
                    break;
                case -1:
                    this.drawO(Fix.POSITIONS[i]);
                    break;
            }
        }
    }
    private drawX(obj:any):void {
        let x:number = obj.x + 120;
        let y:number = obj.y + 120;
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'gray';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 10;
        this.ctx.moveTo(x - 80, y - 80);
        this.ctx.lineTo(x + 80, y + 80);
        this.ctx.moveTo(x + 80, y - 80);
        this.ctx.lineTo(x - 80, y + 80);
        this.ctx.stroke();
    }
    private drawO(obj:any):void {
        let x:number = obj.x + 120;
        let y:number = obj.y + 120;
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 10;
        this.ctx.arc(x, y, 80, Math.PI * 2, 0, false);
        this.ctx.stroke();
    }
    private drawRectRounded(x:number, y:number, width:number, height:number, radius:number, strokeWidth:number,
         shadowWidth:number, color:string, strokeColor:string, shadowColor:string):void {
        this.ctx.save();
        this.ctx.shadowBlur = shadowWidth;
        this.ctx.lineWidth = strokeWidth;
        this.ctx.fillStyle = color;
        this.ctx.shadowColor = shadowColor;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + radius);
        this.ctx.lineTo(x, y + height - radius);
        this.ctx.arcTo(x, y + height, x + radius, y + height, radius);
        this.ctx.lineTo(x + width - radius, y + height);
        this.ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
        this.ctx.lineTo(x + width, y + radius);
        this.ctx.arcTo(x + width, y, x + width - radius, y, radius);
        this.ctx.lineTo(x + radius, y);
        this.ctx.arcTo(x, y, x, y + radius, radius);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    }
    private drawText(x:number, y:number, color:string, colorBlur:string, sizeBlur:number, fontWeight:string,
        fontSize:string, fontType:string, text:string):void {
        this.ctx.save();
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = colorBlur;
        this.ctx.shadowBlur = sizeBlur;
        this.ctx.fillStyle = color;
        this.ctx.font = `${fontWeight} ${fontSize} ${fontType}`;
        this.ctx.fillText(text, x, y);
        this.ctx.restore();
    }
    private drawButtonUnselected(x:number, y:number, label:string):void {
        this.drawRectRounded(x, y, 150, 100, 25, 10, 10, 'white', 'black', 'gray');
        let xposs:number = x + (150/2 - (48*label.length)/2);
        let yposs:number = y + 75;
        this.drawText(xposs, yposs, 'black', 'white', 5, 'bold', '58px', 'Racer', label);
    }
    private drawButtonSelected(x:number, y:number, label:string):void {
        this.drawRectRounded(x, y, 150, 100, 25, 10, 10, 'black', 'white', 'gray');
        let xposs:number = x + (150/2 - (48*label.length)/2);
        let yposs:number = y + 75;
        this.drawText(xposs, yposs, 'white', 'black', 5, 'bold', '58px', 'Racer', label);
    }
}