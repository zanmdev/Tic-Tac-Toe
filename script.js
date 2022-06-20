const GameBoard = (() => {

    let currentBoard = ["","","","","","","","",""];
    let field = document.querySelectorAll(".field");
    

    let updateBoard = (symbol,index) => {
            currentBoard[index] = symbol;
            renderBoard();
    }

    let clearBoard = () =>{
        currentBoard = ["","","","","","","","",""];
    }

    let renderBoard = () =>{
        let index =0;
        field.forEach(field => {

        if(currentBoard[index] !== undefined){
            field.textContent = currentBoard[index];
            index++;
        }
        });
    }

    let isMoveValid = (index) =>{
        return currentBoard[index]==="" ? true : false;
    }

    return {
        currentBoard,
        updateBoard,
        clearBoard,
        renderBoard,
        isMoveValid,
    }
})();

const Players = (symbol, name, isAI) =>{

    let playerSymbol = symbol;
    let playerName = name;

    const setName = (newName) => playerName = newName
    const setSymbol = (newSymbol) =>  playerSymbol = newSymbol

    const getName = () =>  playerName;
    const getSymbol = () =>  playerSymbol;

    return {
        setName,
        setSymbol,
        getName,
        getSymbol
    };
}


const GameLogic = (() =>{
    //Variables
    let isGameActive = false;
    let p1Turn = true;
    let player1;
    let player2;

    //DOM References
    let fieldRef = document.querySelectorAll(".field");
    let startGameRef = document.querySelector("#startGame");
    let modal = document.querySelector(".modal");
    let p1Name = document.querySelector("#p1Name");
    let p2Name = document.querySelector("#p2Name");
    
    //Functions
    const startGame = () =>{ 
        player1 = Players("X",p1Name.value,false);
        player2 = Players("O",p2Name.value,false);
        modal.style.display = "none";   
    } 

    //Event Listeners
    startGameRef.addEventListener("click",startGame)
    
    fieldRef.forEach(field => {
        field.addEventListener("click",(e) =>{
            if(GameBoard.isMoveValid(e.target.id)){
                if(p1Turn == true){
                    GameBoard.updateBoard(player1.getSymbol(),e.target.id);
                    p1Turn = false;
                }else{
                    GameBoard.updateBoard(player2.getSymbol(),e.target.id);
                    p1Turn = true;
                }
            }
        })
    });


})();




