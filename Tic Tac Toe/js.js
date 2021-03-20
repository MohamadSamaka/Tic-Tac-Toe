var Board=[], Possibilities = [], TurnInfo;
var p1 = "Joker", p2 = "Random Ass Nigga";
var players = [p1, p2];
var turn =  Math.floor(Math.random() * 2);
var MovesNum = 0;
let stateCheck = setInterval(() => {
if (document.readyState === "complete") {
    clearInterval(stateCheck);
    AfterLoading();
    }
}, 100);

function AfterLoading(){
    TurnInfo = document.getElementById("info");
    TurnInfo.innerHTML = "Its " + players[turn] + " Turn!"
    BoardMaker();
    EventListenerAdder();
    PossibilitiesFiller();
}

function EventListenerAdder(){
    var Boxes = document.getElementsByClassName("box");
    for(var i = 0; i < Boxes.length; i++){
        Boxes[i].addEventListener("click", Move);
        Boxes[i].addEventListener("mouseover", Blurry);
        Boxes[i].addEventListener("mouseout", RemoveClass) 
    }
}

function BoardMaker(){
    var Boxes = document.getElementsByClassName("box");
    var temp = [];
    for(var i = 0; i < Boxes.length; i += 3){
        for(var j = 0; j < 3; j++){
            temp.push(Boxes[i + j]);
        }
        Board.push(temp);
        temp = [];
    }
}


function Move(){
    MovesNum++;
    this.classList.remove("blurry");
    var new_element = this.cloneNode(true);
    this.parentNode.replaceChild(new_element, this);    
    if(turn === 0){
        turn = 1;
        TurnInfo.innerHTML = "Its " + players[turn] + " Turn!"
    }
    else{
        turn = 0;
        TurnInfo.innerHTML = "Its " + players[turn] + " Turn!"
    }
    WinLoseDraw();
}

function Blurry(){
    this.classList.add("blurry");
    if(turn === 0){
        this.classList.add("X");
    }
    else{
        this.classList.add("O");
    }
}

function RemoveClass(){
    this.classList.remove("blurry");
    var list = this.classList;
    list.remove("X");
    list.remove("O");
}

function PossibilitiesFiller(){
    temp = [[],[]]
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            temp[0].push(Board[i][j]);
            temp[1].push(Board[j][i]);
        }
        Possibilities.push(temp[0]);
        Possibilities.push(temp[1]);
        temp[0] = [];
        temp[1] = [];
    }
    var z = 3;
    for(var i = 0; i < 3; i++){
        temp[0].push(Board[i][i]);
        temp[1].push(Board[i][--z]);
    }
    Possibilities.push(temp[0]);
    Possibilities.push(temp[1]);
}

function WinLoseDraw(){
    temp = ["X", "O"]
    var PassOrNot;
    for(var i = 0; i < 2; i++){
        for(var l = 0; l < Possibilities.length; l++){
            PassOrNot = true;
            for(var j = 0; j < Possibilities[l].length; j++){
                if(!Possibilities[l][j].classList.contains(temp[i])){
                    PassOrNot = false;
                    break;
                }
            }
            if(PassOrNot == true){
                var list = document.getElementsByClassName("menu");
                for(var z = 0; z < 2; z++)
                    list[z].classList.add("active");
                document.getElementById("game-result").innerHTML = players[i] + " WON!";
                document.getElementsByClassName("result")[0].style.display="block";
                return;
            }
            if(PassOrNot == false && MovesNum==9){
                var list = document.getElementsByClassName("menu");
                for(var z = 0; z < 2; z++)
                    list[z].classList.add("active");
                document.getElementById("game-result").innerHTML = "ITS A DRAW!";
                document.getElementsByClassName("result")[0].style.display="block";    
            }
        }
    }
}


function XandYRemover(){
    for(var i = 0; i < 3; i += 1){
        for(var j = 0; j < 3; j++){
            if(Board[i][j].classList.contains("X")){
                Board[i][j].classList.remove("X");
            }
            else if(Board[i][j].classList.contains("O")){
                Board[i][j].classList.remove("O");
            }
        }
    }
}

function Restart(){
    Board = [];
    Possibilities=[];
    BoardMaker();
    XandYRemover();
    PossibilitiesFiller();
    EventListenerAdder();
    var list = document.getElementsByClassName("menu");
    for(var z = 0; z < 2; z++)
        if(list[z].classList.contains("active"))
            list[z].classList.remove("active");
    document.getElementsByClassName("result")[0].style.display="none";
    MovesNum = 0;
}

