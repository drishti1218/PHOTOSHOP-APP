// step 1 : key press=game start
let gameSeq=[]; //for sequence of game
let userSeq=[]; //for  sequence of user
let btns=["red","green","orange","blue"]; //for button flash
let started=false;
let level=0;
let highestScore=0;
let h4=document.querySelector("h4");
document.addEventListener("keypress",function(){
    if(started==false){
    started=true;
    //in step 2 we want a random button to flash ie color dissappear for some time and we have to increase the level and display it in h4 then goto levelup() function to do this 
    levelUp();
    }
});
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}
function levelUp(){
    userSeq=[];
    level++;
    h4.innerText=`level ${level}`;
    // make function for button flash
    // we have to choose random button for that make array of button and generate random index of it to acess it 
    let randIdx=Math.floor(Math.random()*3);
    
    let randColor=btns[randIdx];
    // now we have name of the class but not exactly class we have to convert this into class
    let randbtn=document.querySelector(`.${randColor}`);// this has converted our color to class ie we have selected the button here using class
   // console.log(randIdx);
   // console.log(randColor);
   // console.log(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq)
    btnFlash(randbtn);
}
// in step three:: we have to wait for users response take response from the user if the user had entered the same sequence as set by us then we have to increase level otherwise we havee to restart the game
function btnpress(){
    let btn=this;
    btnFlash(btn);
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length-1);
}
let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}
//to check current level
function checkAns(idx){

    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,500);   
        }
    }else{
        if(highestScore<level-1){
            highestScore=level-1;
        }
        h4.innerText=`GAME OVER! Your score was ${level-1}! Highest Score : ${highestScore} Press any key to start again`;
        // we have to reset values 
        let body=document.querySelector("body");
        body.style.backgroundColor="red";
        setTimeout(function(){
                body.style.backgroundColor="white";
            
        },200);
        reset();
    }
}
function reset(){
    gameSeq=[];
    userSeq=[];
    started=false;
    level=0;

}
