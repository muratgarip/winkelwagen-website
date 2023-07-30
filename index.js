
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings={
  databaseURL:"https://winkelapp-f6ece-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const boodschappenlijstInDB = ref(database,"boodschappenlijst");

const inputFieldEl=document.getElementById("input-field");
const addButtonEl=document.getElementById("add-button");
const boodschappenlijstEl=document.getElementById("boodschappenlijst");

addButtonEl.addEventListener("click",function(){
  let inputValue=inputFieldEl.value;
  push(boodschappenlijstInDB, inputValue);
  clearInputFieldEl();
});
onValue(boodschappenlijstInDB, function (snapshot){
  if (snapshot.exists()) {
    let boodschappenArray = Object.entries(snapshot.val());
    clearBoodschappenlijst();
    for (let i=0; i< boodschappenArray.length; i++){
      let huidigElement= boodschappenArray[i];
      let huidigElementID= huidigElement[0];
      let huidigElementWaarde= huidigElement[1];
      toevoegenAanBoodschappenlijstEl(huidigElement);
    }
  }else{
    boodschappenlijstEl.innerHTML = "<p>Er is geen winkelwaar</p>";
  }
})
function clearInputFieldEl(){
  inputFieldEl.value="";
}
function clearBoodschappenlijst(){
  boodschappenlijstEl.innerHTML="";
}
function toevoegenAanBoodschappenlijstEl(winkelwaarItem){
  let winkelwaarID = winkelwaarItem[0];
  let winkelwaarElementWaarde = winkelwaarItem[1];
  let nieuwEl = document.createElement("li");
  nieuwEl.textContent = winkelwaarElementWaarde;
  nieuwEl.addEventListener("click", function(){
    let exactLokatieVanWaardeInDB = ref (database, `boodschappenlijst/${winkelwaarID}`);
    remove(exactLokatieVanWaardeInDB);
  });
  boodschappenlijstEl.append(nieuwEl);
}
