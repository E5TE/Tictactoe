import { TicTacToe } from "./Tictactoe";
let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('TicTacToe');
let ctx = canvas.getContext('2d');
let game = new TicTacToe(ctx);
game.start();
document.addEventListener('keyup', parseKey);
function parseKey(event:KeyboardEvent):void {
    switch(event.key){
        case 'Enter':
        case ' ':
        case 'y':
        case 'Y':
            game.keyYes();
            break;
        case 'Escape':
        case 'Backspace':
        case 'n':
        case 'N':
            game.keyNo();
            break;
        case 'ArrowUp':
            game.keyUp();
            break;
        case 'ArrowDown':
            game.keyDown();
            break;
        case 'ArrowLeft':
            game.keyLeft();
            break;
        case 'ArrowRight':
            game.keyRight();
            break;
        default:
            return;
    }
}