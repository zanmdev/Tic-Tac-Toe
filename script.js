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

    let checkRow = (symbol, index,row) =>{
        
        if(currentBoard[0 + (row*3)] == currentBoard[1 + (row*3)] && currentBoard[0+ (row*3)] == currentBoard[2+ (row*3)]){
            console.log("Winner");
        }
    } 

    let checkColumn = (symbol, column) =>{

        if(currentBoard[0 + column*1] == currentBoard[3 +column*1] && currentBoard[0+column*1] == currentBoard[6+column*1]){
            console.log("Winner");
        }

    } 

    let checkDiagonal = () => {

    }

    let checkOtherDiagonal = () => {
        
    }
    
    let checkForWinner = (symbol, index,column,row) =>{
        checkRow(symbol, index,row);
        checkColumn(symbol,column);
    }
    return {
        currentBoard,
        updateBoard,
        clearBoard,
        renderBoard,
        isMoveValid,
        checkForWinner
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
            let fieldChoice = e.target.id
            if(GameBoard.isMoveValid(fieldChoice)){
                let column = e.target.classList[1].split("c")[1];
                let row = e.target.parentElement.classList[0].split("r")[1];
                if(p1Turn == true){
                    
                    GameBoard.updateBoard(player1.getSymbol(),fieldChoice);
                    p1Turn = false;
                    GameBoard.checkForWinner(player1.getSymbol(),fieldChoice,column,row)
                }else{
                    GameBoard.updateBoard(player2.getSymbol(),fieldChoice);
                    p1Turn = true;
                    GameBoard.checkForWinner(player2.getSymbol(),fieldChoice,column,row)
                }
            }
        })
    });


})();




