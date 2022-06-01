
const gameBoard = (function(){
    
    
    const gameBoard=[];
    for(let i=1;i<=9;i++){
        gameBoard.push(document.getElementById(`gameBox${i}`));
    }

    //game play function Triggers eventlistener to print either of X or O in boxes
    const gameAddEvent = (player1,player2)=>{
        let lastPlayed;
        let winnerCheck;
        for(let i=0;i<9;i++){
            gameBoard[i].addEventListener("click",()=>{
                
                if(winnerCheck===undefined){
                    if(lastPlayed===player1.getName()){
                    player2.playMove(gameBoard[i]);
                    lastPlayed=player2.getName();
                    }
                    else{
                    player1.playMove(gameBoard[i]);
                    lastPlayed=player1.getName();
                    }
                    winnerCheck=gameVerdict();
                    if(winnerCheck){
                        winnerDeclaration(lastPlayed);
                       lastPlayed=2;
                       console.log(winnerCheck);
                    }
                    if(tieChecker()){
                        if(lastPlayed===2){
                            void(0);
                        }
                        else{
                            winnerDeclaration('tie');
                        }
                        
                    }
                    
                }
                else if(lastPlayed===2){
                    void(0);
                }
                
                
            });

        }
    };
    const tieChecker=()=>{
        for(let i=0;i<gameBoard.length;i++){
            if(gameBoard[i].innerText===""){
                return false
            }
        }
        
            return true;
        
    }
    const equalityObject= (QueryArray)=>{
        equality = (QueryArray[0]===QueryArray[1]&&QueryArray[1]===QueryArray[2]&&(!(QueryArray[0]==="")));
        let equalSymbol=null;
        if(equality){

            equalSymbol=QueryArray[0];
        }
        return{equality,equalSymbol};
    }
    const gameVerdict= ()=>{
        const val=[[],[],[]];
        for(let j=0;j<9;j++){
           if(j<3){
               val[0].push(gameBoard[j].innerText);
           }
           else if(j>=3&&j<6){
               val[1].push(gameBoard[j].innerText);
           }
           else if(j>=6){
               val[2].push(gameBoard[j].innerText);
           }
        }
        const winningConditionsArray=[val[0],val[1],val[2]];
        const arr2=[];
        const arr3=[];
        for(let k=0;k<=2;k++){
            const arr=[];
            arr2.push(val[k][k]);
            for(let l=0;l<=2;l++){
                arr.push(val[l][k]);
                if((k+l)===2){
                    arr3.push(val[k][l]);
                }
            }
            winningConditionsArray.push(arr);
        }
        winningConditionsArray.push(arr2);
        winningConditionsArray.push(arr3);
        const equalityChecker = (arr4)=>{
            for(let i=0;i<arr4.length;i++){
                if(equalityObject(arr4[i]).equality){
                    return equalityObject(arr4[i]);
                }

            }
        }
        equalityVariable=equalityChecker(winningConditionsArray);
        return equalityVariable;
    }
    
    const winnerDeclaration = (winner)=>{
        document.getElementById('gameBoard').style.display='none';
        winnerStrip=document.createElement('div');
        winnerStrip.setAttribute('class',"winnerStrip");
        winnerText=document.createElement('p');
        if(winner!="tie"){
            winnerText.innerText=`${winner} has won the game`;
        }
        else if(winner==="tie"){
            winnerText.innerText="Game Tied";
        }
        
        document.body.appendChild(winnerStrip);
        winnerStrip.appendChild(winnerText);
    }


    return{gameAddEvent,gameVerdict};
})()

const player = (name,symbol) => {
    const playMove = function(box){
        if(!(box.innerText)){
        box.innerText=symbol;
        }
    }

    const getName = () => name;
    return {getName,playMove}
}

document.getElementById('gameBoard').style.display='none';
document.getElementById("multiMode").style.display='none';
document.getElementById("singlePlayMode").style.display="none";

document.getElementById('submitGameMode').addEventListener("click",()=>{
    gameMode = document.getElementById('gameMode').value;
    document.getElementById("multiMode").style.display='none';
    document.getElementById("singlePlayMode").style.display="none";
    
    if(gameMode==='single'){
        document.getElementById("gameModesSelect").style.display="none";
        document.getElementById("singlePlayMode").style.display="grid";
    }
    else if(gameMode==="multi"){
        document.getElementById("gameModeselect").style.display="none";
        document.getElementById("multiMode").style.display="grid";
    }
})
const multiPlayerInterface=document.getElementById("multiMode");
const multiLaunchBTN = document.getElementById("launchGameMulti");

multiLaunchBTN.addEventListener("click",()=>{
    const preInterface = document.getElementById("preInterface");
    const player1Name=document.getElementById('player1Name').value;
    const player1Symbol=document.getElementById('player1Symbol').value;
    const player2Name=document.getElementById('player2Name').value;
    const player2Symbol=document.getElementById('player2Symbol').value;

    if(player1Name!=""&&player2Name!=""&&player1Name!=player2Name&&player1Symbol!=player2Symbol&&player1Symbol!=""&&player2Symbol!=""){
        const player1 = player(player1Name,player1Symbol);
        const player2 = player(player2Name,player2Symbol);
        gameBoard.gameAddEvent(player1,player2);
        document.getElementById("gameBoard").style.display='grid';
        preInterface.style.display='none';  
    }
    else if(player1Symbol===player2Symbol&&player1Symbol!=""){
        alert("Symbols Must Not Match");
    }
    else if(player1Name===""||player2Name===""||player2Name===player1Name){
        alert("Enter names correctly\nName of players must not be same or void");
    }
    else{
        alert("Please Enter Details Correctly");
    }
    
    
})