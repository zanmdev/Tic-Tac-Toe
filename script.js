const GameBoard = (() => {

    let currentBoard = ["","","","","","","","",""];
    let field = document.querySelectorAll(".field");
    

    let updateBoard = (symbol,index) => {
            currentBoard[index] = symbol;
            renderBoard();
    }

    let clearBoard = () =>{
        currentBoard = ["","","","","","","","",""];
        renderBoard();
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

            return true;
        }
    } 

    let checkColumn = (symbol, column) =>{
        if(currentBoard[0 + column*1] == currentBoard[3 +column*1] && currentBoard[0+column*1] == currentBoard[6+column*1]){

            return true;
        }
    } 

    let checkDiagonal = () => {
        if(currentBoard[0] == currentBoard[4] && currentBoard[0] == currentBoard[8]){
            return true;
        }

    }

    let checkOtherDiagonal = () => {
        if(currentBoard[2] == currentBoard[4] && currentBoard[2] == currentBoard[6]){

            return true;
        }
    }
    
    let checkForWinner = (symbol, index,column,row) =>{

        if(checkRow(symbol, index,row) || checkColumn(symbol,column)){
            console.log("ROW / COLUMN WIN");
            return true;

        }
        if(index != 1 && index != 3 && index != 5 && index != 7 && currentBoard[4] != ""){
                if(checkDiagonal() || checkOtherDiagonal()){
                    console.log("DIAG WIN");
                    return true;


                }
        }
        return false;
    }

    let checkForTie = () =>{
        for (let i = 0; i < currentBoard.length; i++) {
            if(currentBoard[i] ===""){
                console.log("No Tie");
                return false;
            }
        }
        console.log("TIE");
        return true;
    }

    return {
        currentBoard,
        updateBoard,
        clearBoard,
        renderBoard,
        isMoveValid,
        checkForWinner,
        checkForTie
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

const displayController = (() =>{
    let buttonContainer = document.querySelectorAll(".field");
    let infoText = document.querySelector(".displayText")
    let disableField = () =>{
        buttonContainer.forEach(field => {
            field.disabled = true;
        });
    }

    let enableField = () =>{
        buttonContainer.forEach(field => {
            field.disabled = false;
        });
    }

    let displayCurrentPlayer = (player) =>{
        infoText.textContent = " " +player.getName() + " make your selection now";  
    }

    let displayWinner = (player) =>{
        infoText.textContent = " "+player.getName() + " WINS!";
    }

    let displayTie = () =>{
        infoText.textContent = "Tie Game :(";
    }

    return {   
        disableField,
        enableField,
        displayCurrentPlayer,
        displayWinner,
        displayTie,

    }
})();


const GameLogic = (() =>{
    //Variables
    let isGameActive = false;
    let player1;
    let player2;
    let currentPlayer;
    

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
        currentPlayer = player1;
        modal.style.display = "none";  
        displayController.displayCurrentPlayer(currentPlayer); 
    }
    
    const restartGame = () =>{
        GameBoard.clearBoard();
        displayController.enableField();
        currentPlayer = player1;
    }

    const swapCurrentPlayer = (player) =>{
        return player === player1 ?  player2 :  player1; 
    }

    //Event Listeners
    startGameRef.addEventListener("click",startGame)

    fieldRef.forEach(field => {
        field.addEventListener("click",(e) =>{
            let fieldChoice = e.target.id

            if(GameBoard.isMoveValid(fieldChoice)){

                let column = e.target.classList[1].split("c")[1];
                let row = e.target.parentElement.classList[0].split("r")[1];

                    GameBoard.updateBoard(currentPlayer.getSymbol(),fieldChoice);
                    
                    if(!GameBoard.checkForWinner(currentPlayer.getSymbol(),fieldChoice,column,row)){
                        if(!GameBoard.checkForTie()){
                            currentPlayer = swapCurrentPlayer(currentPlayer); 
                            displayController.displayCurrentPlayer(currentPlayer);
                        }else{
                            displayController.displayTie();
                        }
                    }else{
                        displayController.disableField();
                        displayController.displayWinner(currentPlayer);
                    }
 
            }
        })
    });


})();




