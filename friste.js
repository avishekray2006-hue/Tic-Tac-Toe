let boxes = document.querySelectorAll(".box");
let resetGameBtn =document.querySelector("#reset");
let GameBtn=document.querySelector("#newBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO= true;
const winPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box) =>{
    box.addEventListener(("click"), ()=>{
        console.log("box was a click");
        if(turnO===true){
            box.innerText ="O";
            turnO=false;
        }
        else{
            box.innerText ="x";
             turnO=true;
        }
        box.disabled = true;

        checwinner();
    })
})
const disableBoxes =() =>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes =() =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations!\nWinner is: ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    const duration = 3000;
    const animationEnd = Date.now() + duration;

    (function frame() {
        // नीचे बायाँ कोना
        confetti({
            particleCount: 8,
            angle: 60,
            spread: 80,
            startVelocity: 60,
            origin: { x: 0, y: 1 }
        });

        // नीचे दायाँ कोना
        confetti({
            particleCount: 8,
            angle: 120,
            spread: 80,
            startVelocity: 60,
            origin: { x: 1, y: 1 }
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    })();
}

const checwinner = () =>{
    for(let pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val!=""&&pos2val!=""&&pos3val!=""){
            if(pos1val===pos2val&&pos2val==pos3val){
                console.log("winner",pos1val);
                showWinner(pos1val);
            }
        }

    
    
    }
};
resetGameBtn.addEventListener("click", resetGame);
GameBtn.addEventListener("click", resetGame);
