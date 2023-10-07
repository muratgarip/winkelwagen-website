
const inputFieldEl=document.getElementById("input-field");
const addButtonEl=document.getElementById("add-button");
const boodschappenlijstEl=document.getElementById("boodschappenlijst");

let boodschappenlijstArray=JSON.parse(localStorage.getItem('boodschappenlijstArray'));
if (boodschappenlijstArray===null){
  boodschappenlijstArray=[];
  }

addButtonEl.addEventListener("click",function(){
  let inputValue=inputFieldEl.value;
  boodschappenlijstArray.push(inputValue);
  localStorage.setItem('boodschappenlijstArray',JSON.stringify(boodschappenlijstArray));
  clearInputFieldEl();
  
  clearBoodschappenlijst();
  displayBoodschappenlijst();
  playAudio();
});

clearBoodschappenlijst();
displayBoodschappenlijst();
playAudio();

function playAudio(){
  let audio = new Audio("audio.mp3");
  audio.play();
}


function clearInputFieldEl(){
  inputFieldEl.value="";
}

function clearBoodschappenlijst(){
  boodschappenlijstEl.innerHTML="";
}

function displayBoodschappenlijst(){
  if (boodschappenlijstArray.length !== 0) { 
    for (let i=0; i< boodschappenlijstArray.length; i++){
      let nieuwEl = document.createElement("li");
      nieuwEl.textContent = boodschappenlijstArray[i];
      boodschappenlijstEl.append(nieuwEl);
      nieuwEl.addEventListener("click", function(){
        boodschappenlijstArray.splice(i,1);
        localStorage.setItem('boodschappenlijstArray',JSON.stringify(boodschappenlijstArray));
        console.log(i);
        clearBoodschappenlijst();
        displayBoodschappenlijst();
      });
    }  
  } else{
    boodschappenlijstEl.innerHTML = "<p>Er is geen winkelwaar</p>";
  }
}

