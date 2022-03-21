import { Fix } from "./utils/Fix";
import { UserInterface } from "./ui/UserInterface";
import { GameLogic } from "./logic/GameLogic";

export class TicTacToe extends GameLogic {
    private UI:UserInterface;
    private state:string = Fix.STATE_INTRO;
    
    constructor(ctx:any){
        super();
        this.UI = new UserInterface(ctx);
    }
    public start():void {
        this.UI.showWelcomeSign();
        this.UI.showBinaryButtons("no", "yes", this.cursorBinary);
    }
    private updateButtons():void {
        switch(this.state){
            case Fix.STATE_INTRO:
            case Fix.STATE_RESULTS:
                this.UI.showBinaryButtons("no", "yes", this.cursorBinary);
                break;
            case Fix.STATE_CHOOSE_MODE:
                this.UI.showBinaryButtons(" P2", "CPU", this.cursorBinary);
                break;
            case Fix.STATE_CHOOSE_SYMBOL:
                this.UI.showBinaryButtons("X", "O", this.cursorBinary);
                break;
        }
    }
    public keyYes():void {
        switch(this.state){
            case Fix.STATE_PLAYING:
                if(this.map[this.cursorPos-1] == 0) {
                   this.playTurn();
                } 
                break;
            case Fix.STATE_INTRO:
            case Fix.STATE_RESULTS:
                if(this.cursorBinary == false){
                    this.exit();
                } else {
                    if(this.state == Fix.STATE_RESULTS){
                        (<any>window).playAds();
		                console.log('Trying to play the add');
                    }
                    this.resetGameSettings();
                    this.state = Fix.STATE_CHOOSE_MODE;
                    this.UI.showChooseGameMode();
                    this.updateButtons();
                }
                break;
            case Fix.STATE_CHOOSE_MODE:
                if(this.cursorBinary == false){
                    this.mode = Fix.MODE_MULTI_PLAYER;
                } else {
                    this.mode = Fix.MODE_SINGLE_PLAYER;
                }
                //Switch to state 'choose symbol'
                this.state = Fix.STATE_CHOOSE_SYMBOL;
                this.UI.showChooseSymbol();
                this.updateButtons();
                break;
            case Fix.STATE_CHOOSE_SYMBOL:
                if(this.cursorBinary == false){
                    this.playerOne = this.X;
                    this.playerTwo = this.playerOne === this.X ? this.O : this.X;
                } else {
                    this.playerOne = this.O;
                    this.playerTwo = this.playerOne === this.O ? this.X : this.O;
                }
                this.AI = this.playerTwo;
                this.whoStart();
                let playerStart = (this.turn === this.playerOne) ? 'PLAYER 1' : (this.mode === Fix.MODE_SINGLE_PLAYER) ? 'COMPUTER' : 'PLAYER 2';
                this.UI.clearBoard();
                this.UI.drawBoard();
                this.UI.gameStart(playerStart);
                this.state = Fix.STATE_PLAYING;
                this.gameIsOver = false;
                this.winnerName = '';
                setTimeout(() => {
                    this.UI.fillBoard(this.map);
                    if (this.turn === this.AI && this.mode === Fix.MODE_SINGLE_PLAYER) {
                        this.playTurn();
                        this.UI.fillBoard(this.map);
                    } else {
                        this.firstTurn = false;
                        this.updateCursor();
                    }
                }, 1000);
                break;
            }
    }
    public keyNo():void {
        if((this.state == Fix.STATE_INTRO)||(this.state == Fix.STATE_RESULTS)){
            this.exit();
        }//TODO:Make the choose selection backwards + Quit game if  the state is in game
    }
    public keyUp():void {
        if(this.state == Fix.STATE_PLAYING){
            let lastPos:number = this.cursorPos;
            this.cursorPos -=3;
            if(this.cursorPos < 1) this.cursorPos = 6 + lastPos;
            this.updateCursor();
        } else {
            this.cursorBinary = !this.cursorBinary;
            this.UI.updateView();
            this.updateButtons();
        }
    }
    public keyDown():void {
        if(this.state == Fix.STATE_PLAYING){
            let lastPos:number = this.cursorPos;
            this.cursorPos +=3;
            if(this.cursorPos > 9) this.cursorPos = lastPos - 6;
            this.updateCursor();
        }else{
            this.cursorBinary = !this.cursorBinary;
            this.UI.updateView();
            this.updateButtons();
        }
    }
    public keyLeft():void {
        if(this.state == Fix.STATE_PLAYING){
            let lastPos:number = this.cursorPos;
            this.cursorPos --;
            if(this.cursorPos == 0 || this.cursorPos == 3 || this.cursorPos == 6) this.cursorPos = lastPos + 2;
            this.updateCursor();
        }else{
            this.cursorBinary = !this.cursorBinary;
            this.UI.updateView();
            this.updateButtons();
        }
    }
    public keyRight():void {
        if(this.state == Fix.STATE_PLAYING){
            let lastPos:number = this.cursorPos;
            this.cursorPos ++;
            if(this.cursorPos == 4 || this.cursorPos == 7 || this.cursorPos == 10) this.cursorPos = lastPos - 2;
            this.updateCursor();
        }else{
            this.cursorBinary = !this.cursorBinary;
            this.UI.updateView();
            this.updateButtons();
        }
    }
    private updateCursor():void {
        this.UI.fillBoard(this.map);
        this.UI.showCursor(Fix.POSITIONS[this.cursorPos-1]);
    }
    //Game play
    private playTurn():void {
        if (this.mode === Fix.MODE_MULTI_PLAYER) {
            if (this.turn === this.playerOne) {
                this.movePlayerOne();
            }
            else if (this.turn === this.playerTwo) {
                this.movePlayerTwo();
            }
        }
        else if (this.mode === Fix.MODE_SINGLE_PLAYER) {
            if (this.turn === this.playerOne) {
                this.movePlayerOne();
                if (this.turn === this.AI) {
                    setTimeout(()=> {
                        this.computerPlay();
                        this.UI.fillBoard(this.map);
                        this.nextTurn();
                    }, 400);
                }
            } else if (this.turn === this.AI && this.firstTurn) {
                this.firstTurn = false;
                setTimeout(()=> {
                    this.computerPlay();
                    this.UI.fillBoard(this.map);
                    this.nextTurn();
                }, 400);
            }
        }
    }
    private movePlayerOne():void {
        this.player = this.playerOne;
		this.map[this.cursorPos-1] = this.player;
        this.updateCursor();
		this.nextTurn();
	}
	private movePlayerTwo():void {
        this.player = this.playerTwo;
		this.map[this.cursorPos-1] = this.player;
        this.updateCursor();
		this.nextTurn();
	}
    private nextTurn():void {
        this.playerTwo = (this.mode === Fix.MODE_SINGLE_PLAYER) ? this.AI : this.playerTwo;
		this.player = this.player === this.playerOne ? this.playerTwo : this.playerOne;
		this.turn = this.player;
		this.checkWin();
        if(this.gameIsOver == true){
            this.state = Fix.STATE_RESULTS;
            this.UI.gameEnd(this.winnerName);
            this.UI.showBinaryButtons("no", "yes", this.cursorBinary);
        }
		this.turnCount++;
	}
    //
    private exit():void {
        window.location.href = 'https://google.com'
    }
}