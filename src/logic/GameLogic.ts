import { Fix } from "../utils/Fix";

export class GameLogic {
	protected readonly winnPatterns = [[ 0 , 1 , 2 ], [ 3 , 4 , 5 ],[ 6 , 7 , 8 ], [ 0 , 3 , 6 ],[ 1 , 4 , 7 ], [ 2 , 5 , 8 ],[ 0 , 4 , 8 ], [ 2 , 4 , 6 ]];
    protected readonly X:number = 1;
    protected readonly O:number = -1;
    protected map:Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    protected cursorPos:number = 1;
    protected cursorBinary:boolean = true;
	protected player:number = 0;
    protected playerOne:number = 0;
    protected playerTwo:number = 0;
    protected AI:number = 0;
    protected mode:string = '';
    protected turn:number = 0;
    protected turnCount:number = 1;
    protected firstTurn:boolean = true;
	protected gameIsOver:boolean = true;
	protected winnerName:string = '';

	protected whoStart ():void {
		if (this.mode === Fix.MODE_SINGLE_PLAYER) {
			this.turn = Math.round(Math.random() + 0.4 ) ? this.AI : this.playerOne;
		}
		else if (this.mode === Fix.MODE_MULTI_PLAYER) {
			this.turn = Math.round(Math.random()) ? this.playerOne : this.playerTwo;
		}
		this.player = this.turn;
	}
	protected computerPlay(){
		let setMove:any = Math.floor(Math.random() * this.map.length),
			corners:any = [0, 2, 6, 8];
		const processNextMove = () => {
			let moveSet:any = this.winnPatterns.map(combo => {
				return {
					cpu: {
						winMoves: combo.map(i => { return { [i]: this.map[i] } }),
						score: combo.reduce((value, i) => { return this.map[i] === this.AI ? value + 5 : this.map[i] === 0 ? value : value - 100 }, 0 )
					},
					opponent: {
						winMoves: combo.map(i => { return { [i]: this.map[i] } }),
						score: combo.reduce((value, i) => { return this.map[i] === this.playerOne ? value + 5 : this.map[i] === 0 ? value : value - 100 }, 0 ) 
					}
				}
			});
			
			let bestMoveCPU:any = { score: -Infinity };
			let bestMoveOpponent:any = { score: -Infinity };
			
			moveSet.forEach((move:any) => {
				let freeSlotMoveCPU:any = move.cpu.winMoves.some((slot:any) => Object.values(slot)[0] === 0);
				let freeSlotMoveOpponent:any = move.opponent.winMoves.some((slot:any) => Object.values(slot)[0] === 0);
				bestMoveCPU = bestMoveCPU.score < move.cpu.score && freeSlotMoveCPU ? move.cpu : bestMoveCPU;
				bestMoveOpponent = bestMoveOpponent.score < move.opponent.score && freeSlotMoveOpponent ? move.opponent : bestMoveOpponent;
			});
			
			let nextPossibleMovesCPU:any = bestMoveCPU.winMoves.filter((slot:any) => Object.values(slot)[0] !== this.playerOne && Object.values(slot)[0] !== this.AI).map((slot:any) => Object.keys(slot)[0]);
			let nextPossibleMovesOpponent:any = bestMoveOpponent.winMoves.filter((slot:any) => Object.values(slot)[0] !== this.playerOne && Object.values(slot)[0] !== this.AI).map((slot:any) => Object.keys(slot)[0]);

			return { bestMoveCPU, bestMoveOpponent, nextPossibleMovesCPU, nextPossibleMovesOpponent }
		}
		
		let { bestMoveCPU, bestMoveOpponent, nextPossibleMovesCPU, nextPossibleMovesOpponent } = processNextMove();

		if (this.turnCount === 1) {
			setMove = corners[Math.floor(Math.random() * corners.length)];
		} 
		else {
			if (bestMoveOpponent.score <= 5 || bestMoveCPU.score === 10) {
				setMove = nextPossibleMovesCPU[Math.floor(Math.random() * nextPossibleMovesCPU.length)];
			}
			else {
				setMove = nextPossibleMovesOpponent[Math.floor(Math.random() * nextPossibleMovesOpponent.length)];
			}
		}
		this.map[setMove] = this.player;
	}
	protected checkWin():void {
		this.playerTwo = (this.mode === Fix.MODE_SINGLE_PLAYER) ? this.AI : this.playerTwo;
		let arrOne = new Set(this.map.map((num, index) => num === this.playerOne ? index : ''));
		let arrTwo = new Set(this.map.map((num, index) => num === this.playerTwo ? index : ''));
		for (let i = 0; i < this.winnPatterns.length; i++) {
			let playerOneWon = this.winnPatterns[i].every(num => arrOne.has(num));
			let playerTwoWon = this.winnPatterns[i].every(num => arrTwo.has(num));
			if (playerOneWon) {
				this.gameIsOver = true;
				this.winnerName = (this.mode === Fix.MODE_SINGLE_PLAYER) ? 'YOU' : 'PLAYER 1';
				break;
			}
			if (playerTwoWon) {
				this.gameIsOver = true;
				if (this.mode === Fix.MODE_SINGLE_PLAYER) {
					this.winnerName = "COMPUTER"
				}
				else if (this.mode === Fix.MODE_MULTI_PLAYER) {
					this.winnerName = "PLAYER 2"
				}
				break;
			}
			if (i === this.winnPatterns.length - 1 && this.turnCount === 9) {
				if (!playerTwoWon && !playerTwoWon) {
					this.gameIsOver = true;
					this.winnerName = "None"
				}
			}
		}
	}
	protected resetGameSettings():void {
		this.turn = this.AI = this.player = this.playerOne = this.playerTwo = 0;
		this.map = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.mode = '';
		this.turnCount = 1;
		this.firstTurn = true;
		this.gameIsOver = true;
		this.winnerName = '';
	}
}