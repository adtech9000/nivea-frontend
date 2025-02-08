let frames = document.querySelectorAll(".frames");
let yesOption = document.querySelector("#yes");
let noOption = document.querySelector("#no");
let result = document.querySelector(".result");
let loader = document.querySelector(".dots-loader");
let bubbleA = document.querySelector("#bubbleA");
let bubbleB = document.querySelector("#bubbleB");
let levelOne = document.querySelector(".level-one");
let levelTwo = document.querySelector(".level-two");
let levelThree = document.querySelector(".level-three");
let mainFrame = document.querySelector(".main-frame");
let lastFrame = document.querySelector(".last-frame");

let yesNoResult = false;

for (let i = 0; i < frames.length; i++) {
    console.log("consoling")
    if (i === 0) continue; 
    frames[i].classList.add('frame-display'); 
}

function start() {
    setTimeout(() => {
        startFrameTwo();
    },5000)
}

function startFrameTwo() {

loader.style.display = "flex";
loader.style.top = "2.5rem";
    

    setTimeout(() => {
        loader.style.display = "none";
        bubbleA.style.display = "block"
    }, 2000);

    frames[0].classList.add('frame-display');
    frames[1].classList.remove('frame-display');
    setTimeout(() => {
        yesOption.style.display = "block";
        yesOption.classList.add('text-focus-in')
    },3000)

    setTimeout(() => {
        no.style.display = "block";
        no.classList.add('text-focus-in')
    },4000)
}

yesOption.addEventListener("click", () => {
    startFrameThree(true);
    yesNoResult = true;
})

noOption.addEventListener("click", () => {
    startFrameThree(false);
})

function startFrameThree(decision){

    levelOne.classList.add("slide-out-top");

    setTimeout(()=> {
        if (decision === true){
        result.innerHTML = "<p style='margin-bottom: 13px'>Good to know</p> <div class='lines'><div>"
        }else{
        result.innerHTML = "<p style='border-bottom:2px solid #ACB3C1; padding-bottom:10px'>Eccrine glands helps to cool your body</p>  <p style='margin-top:5px;'>Apocrine glands are often responsible for odour</p>"
        }
    }, 1000)

    let yesPosition = -7.7;
    let noPosition = -6.5;

    setTimeout(()=> {
        loader.style.display = "flex";
        if(decision === true){
            loader.style.top = `${yesPosition + 17}rem`;
        }else{
            loader.style.top = `${noPosition + 20}rem`;
        }
    },2000)

    setTimeout(() => {
        loader.style.display = "none";
        bubbleB.style.display = "block";

        if (decision === true){
            bubbleB.style.transform = `translateY(${yesPosition}rem)`;
        }else{
            bubbleB.style.transform = `translateY(${noPosition}rem)`;
        }
        
    },3000)

    setTimeout(() => {
        startFrameFour();
    },7000)
}

function startFrameFour(){
    levelTwo.classList.add("slide-out-top");

    setTimeout(() => {
        levelThree.style.display = "block";
        levelThree.classList.add('text-focus-in')
    }, 1000);

    setTimeout(() => {
        startFrameFive();
    },8000)
    
}

function startFrameFive(){
    mainFrame.style.display = "none";
    lastFrame.style.display="block";
}

document.addEventListener("DOMContentLoaded", function () {
    const learnMoreBtn = document.getElementById("learnMore");
    const learnMoreLink = document.getElementById("learnMoreLink");

    const apiUrl = "https://nivea-backend-production.up.railway.app/api/impression";

    learnMoreBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const redirectTab = window.open(learnMoreLink.href, '_blank');

        if (typeof window.LoopMeClickthrough === "function") window.LoopMeClickthrough();
        else console.warn("LoopMe Click through not found. Ensure LoopMe has initialized.");

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: "User clicked Learn More" }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data);
            })
            .catch(error => {
                console.error("API Error:", error);
            });

        setTimeout(() => {
            if (!redirectTab || redirectTab.closed) {
                window.open(learnMoreLink.href, '_blank');
            }
        }, 1500);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const yesBtn = document.getElementById("yes");
    const noBtn = document.getElementById("no");

    const baseApiUrl = "https://nivea-backend-production.up.railway.app/api/engagement?response=";
    function trackResponse(response) {
        fetch(baseApiUrl + response, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.text()) // Handle plain text responses
            .then(data => console.log(`User clicked ${response}:`, data))
            .catch(error => console.error(`Error tracking ${response} click:`, error));
    }
    yesBtn.addEventListener("click", () => trackResponse("yes"));
    noBtn.addEventListener("click", () => trackResponse("no"));
});
start();
