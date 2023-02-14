
const cartes = document.querySelectorAll(".carte");
const grille = document.querySelector(".grille");
const body = document.querySelector("body");

const txtNbOfClicks = document.querySelector(".nb-of-clicks");
let nbOfClicks = 0;


let carteRetournee = false;

let premiereCarte, secondeCarte;
let verrouillage = false;


aleatoirePosition();



cartes.forEach((carte) => {
  carte.addEventListener("click", retourneCarte);
});


function retourneCarte() {
  if (verrouillage) {
    return;
  } else {
    if (!this.childNodes[1].className.includes("active")) {
      this.childNodes[1].classList.add("active");

      if (!carteRetournee) {
        carteRetournee = true;
        premiereCarte = this;
        console.log(premiereCarte);
        return;
      }
      console.log(premiereCarte);
      carteRetournee = false;
      secondeCarte = this;
      console.log(carteRetournee);

      const premiereCarteIndex =
        premiereCarte.childNodes[1].getAttribute("index");
      const secondeCarteIndex =
        secondeCarte.childNodes[1].getAttribute("index");

      console.log(premiereCarte, secondeCarte);
      console.log("index" + premiereCarteIndex, secondeCarteIndex);

      if (secondeCarteIndex === premiereCarteIndex) {
        return;
      } else {
        correspondance(secondeCarteIndex, premiereCarteIndex);
        cartes.forEach((carte) => {
        });
      }
    } else {
      console.log("vous avez déjà cliqué");
    }
  }
}

let valueCardActive = 0;
function correspondance(secondeCarteIndex, premiereCarteIndex) {

  if (
    premiereCarte.getAttribute("data-attr") ===
    secondeCarte.getAttribute("data-attr")
  ) {
    premiereCarte.removeEventListener("click", retourneCarte);
    secondeCarte.removeEventListener("click", retourneCarte);
    valueCardActive += 2;
    console.log(valueCardActive);
    nbOfClicks +=2;
    if (valueCardActive === 12) {
      setTimeout(() => {
        completed();
      }, 500);
    }
    //Supprimer la capacité de cliquer sur la carte quand une paire est trouvée
  } else {
    verrouillage = true;
    console.log(verrouillage);
    setTimeout(funcRemoveClass, 1750);
    nbOfClicks +=2;
  }
  txtNbOfClicks.textContent = nbOfClicks;
  console.log(nbOfClicks);
}

function funcRemoveClass() {
  secondeCarte.childNodes[1].classList.remove("active");
  premiereCarte.childNodes[1].classList.remove("active");
  verrouillage = false;
}




function aleatoirePosition() {
  cartes.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12) + 1;
    card.style.order = randomPos;
  });
}






function completed() {
  grille.remove();
  const newDiv = document.createElement("div");
  newDiv.classList.add("newDiv");

  const texte = document.createElement("h2");
  texte.innerHTML = "Vous avez réussi, bravo !!";

  const btnRestart = document.createElement("button");
  btnRestart.classList.add("btnRestart");
  btnRestart.innerHTML = "<h1>Recommencez une partie ?!<i class='fa fa-android'></i></h1>";

  btnRestart.addEventListener('click', () => {
    location.reload();
  })

  body.appendChild(newDiv);
  newDiv.appendChild(texte);
  newDiv.appendChild(btnRestart);

  newDiv.style.background = "green";
}
