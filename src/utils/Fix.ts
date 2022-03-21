export class Fix {
    public static STATE_PLAYING:string = "STATE_PLAYING";
    public static STATE_INTRO:string = "STATE_INTRO";
    public static STATE_RESULTS:string = "STATE_RESULTS";
    public static STATE_CHOOSE_MODE:string = "STATE_CHOOSE_MODE";
    public static STATE_CHOOSE_SYMBOL:string = "STATE_CHOOSE_SYMBOL";
    
    public static MODE_SINGLE_PLAYER:string = "singlePlayer";
    public static MODE_MULTI_PLAYER:string = "multiPlayer";

    public static WIDTH:number = 1280;
    public static HEIGHT:number = 720;
    public static CELL:number = 240;
    public static LEFT:number = 280;
    public static CENTER:number = 1280/2;
    public static TOP:number = 720/3;
    public static POSITIONS:Array<any> = [{x:Fix.LEFT, y:0},
        {x:Fix.LEFT + Fix.CELL, y:0},
        {x:Fix.LEFT + Fix.CELL*2, y:0},
        {x:Fix.LEFT, y:Fix.CELL},
        {x:Fix.LEFT + Fix.CELL, y:Fix.CELL},
        {x:Fix.LEFT + Fix.CELL*2, y:Fix.CELL},
        {x:Fix.LEFT, y:Fix.CELL*2},
        {x:Fix.LEFT + Fix.CELL, y:Fix.CELL*2},
        {x:Fix.LEFT + Fix.CELL*2, y:Fix.CELL*2}];
} 