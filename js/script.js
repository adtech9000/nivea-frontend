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
    },1000)
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
        result.innerHTML = "<p>Good to know</p>"
        }else{
        result.innerHTML = "<p>Eccrine glands helps to cool your body</p> <div class='lines'><div> <p style='margin-top:10px; padding-top:10px'>Apocrine glands are often responsible for odour</p>"
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

    const apiUrl = "https://nivea-backend.onrender.com/api/impression";
    const redirectUrl = "https://www.niveausa.com/";

    learnMoreBtn.addEventListener("click", function () {
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: "User clicked Learn More" }),
        })
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then(data => {
                console.log("API Response:", data);
                window.location.href = redirectUrl;
            })
            .catch(error => {
                console.error("API Error:", error);
                window.location.href = redirectUrl;
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const yesBtn = document.getElementById("yes");
    const noBtn = document.getElementById("no");

    const baseApiUrl = "https://nivea-backend.onrender.com/api/engagement?response=";
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


(function() {
    const scriptEl = document.currentScript;
    if (!scriptEl) return;
    const insEl = scriptEl.parentNode;

    insEl.innerHTML = `
    <iframe src="../index.html"
            width="300"
            height="250"
            style="border:none;overflow:hidden;">
    </iframe>
  `;
})();

start();
