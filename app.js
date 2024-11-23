let buttonReset = document.querySelector(".btn-reset");
let msgContainer = document.querySelector(".msg-container");
let buttonTile = document.querySelectorAll(".tile");
let movesCount=0;

function randomPos(){
    let arr = [];
    while(arr.length < 9){
        let r = ((Math.floor(Math.random() * 3)+1).toString())+((Math.floor(Math.random() * 3)+1).toString());
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr
}

let randomPosition=randomPos()
randomPuzzle();

function randomPuzzle(){
    for(let i =0;i<document.getElementsByClassName("tile").length;i++){
        document.getElementsByClassName("tile")[i].style.gridArea=randomPosition[i][0]+"/"+randomPosition[i][1]
    }
    
}

buttonTile.forEach((button =>{
    button.addEventListener("click",(e)=>{
        const tile = e.currentTarget.getAttribute("data-index");
        moveTile(tile);
    })
}))

buttonReset.addEventListener("click",()=>{
    randomPosition=randomPos();
    randomPuzzle();
    msgContainer.classList.add("hide");
    movesCount=0;
    document.querySelector(".moves h2").innerHTML=`Moves Count: ${movesCount}`; 
    }

)


function moveTile(tile){
    let EmptyTile=document.querySelector(".emptile")
    let possibilties=[
        parseInt(randomPosition[tile][0])+1===parseInt(randomPosition[8][0])&&parseInt(randomPosition[tile][1])===parseInt(randomPosition[8][1]),
        parseInt(randomPosition[tile][0])-1===parseInt(randomPosition[8][0])&&parseInt(randomPosition[tile][1])===parseInt(randomPosition[8][1]),
        parseInt(randomPosition[tile][1])+1===parseInt(randomPosition[8][1])&&parseInt(randomPosition[tile][0])===parseInt(randomPosition[8][0]),
        parseInt(randomPosition[tile][1])-1===parseInt(randomPosition[8][1])&&parseInt(randomPosition[tile][0])===parseInt(randomPosition[8][0]),
    ]
if(possibilties[0]||possibilties[1]||possibilties[2]||possibilties[3]){
    movesCount++;
    
    document.querySelector(".moves h2").innerHTML=`Moves Count: ${movesCount}`;    
    
    EmptyTile.style.gridArea=randomPosition[tile][0]+"/"+randomPosition[tile][1];
    document.querySelectorAll(".tile")[tile].style.gridArea=randomPosition[8][0]+"/"+randomPosition[8][1];

    let CurrentTile=randomPosition[tile]
    randomPosition[tile]=randomPosition[8]
    randomPosition[8]=CurrentTile;
    neededPos=["11","12","13","21","22","23","31","32","33"]
    if(randomPosition.join(".")==neededPos.join(".")){
        // console.log("Game Beated");
        msgContainer.classList.remove("hide");
    }
}
}