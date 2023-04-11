const board = document.querySelector(".board");
let persons = [
  {
    name: "Степан Бандера",
    img: "./img/001.jpg"
  },
  {
    name: "Євген Коновалець",
    img: "./img/002.jpg"
  },
  {
    name: "Левко Лук'яненко",
    img: "./img/002.png"
  },
  {
    name: "Іван Миколайчук",
    img: "http://surl.li/gdzoi"
  },
  {
    name: "Павло Скоропатський",
    img: "http://surl.li/gdzop"
  },
  {
    name: "Симон Петлюра",
    img: "http://surl.li/gdzot"
  },
  {
    name: "Степан Бандера",
    img: "http://surl.li/gbjzp"
  },
  {
    name: "Євген Коновалець",
    img: "http://surl.li/gblax"
  },
  {
    name: "Левко Лук'яненко",
    img: "http://surl.li/gdznp"
  },
  {
    name: "Іван Миколайчук",
    img: "http://surl.li/gdzoi"
  },
  {
    name: "Павло Скоропатський",
    img: "http://surl.li/gdzop"
  },
  {
    name: "Симон Петлюра",
    img: "http://surl.li/gdzot"
  }
];
let tiles = [];

function double(arr) {
  return [...arr, ...arr];
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

persons = double(persons);
persons = shuffle(persons);

function create() {
  for (let i = 0; i < persons.length; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.classList.add("border");
    tile.dataset.value = i;
    // крайні справа або зліва можуть бути видалені
    if ((i + 1) % 6 === 0) {
      tile.dataset.removed = "true";
      tile.dataset.side = "right";
    } else if (i % 6 === 0) {
      tile.dataset.removed = "true";
      tile.dataset.side = "left";
    } else {
      tile.dataset.removed = "false";
      tile.dataset.side = "center";
    }
    tile.style.backgroundImage = `url(${persons[i].img})`;
    tile.addEventListener("click", choose);
    tiles.push(tile);
  }
  tiles.forEach((tile) => board.appendChild(tile));
}
let chosen = [];
let rowRemoveCount = [0, 0, 0, 0];
create();

function choose() {
  if (chosen.length < 2 && this.dataset.value !== chosen[0]) {
    chosen.push(this.dataset.value);
    this.classList.remove("border");
    this.classList.add("choosen");
  }
  if (chosen.length === 2) {
    setTimeout(check, 1000);
  }
}

function check() {
  // якщо імена співпадають та це крайні картки
  console.log(tiles[chosen[0]]);
  console.log(tiles[chosen[1]]);
  if (
    persons[chosen[0]].name === persons[chosen[1]].name &&
    tiles[chosen[0]].dataset.removed === "true" &&
    tiles[chosen[1]].dataset.removed === "true"
  ) {
    tiles[chosen[0]].style.visibility = "hidden";
    tiles[chosen[1]].style.visibility = "hidden";

    // передати можливість для сусідньої картки
    // контроль рядів ----- rowRemoveCount

    for (let j = 0; j < 2; j++) {
      let rowStart = 0
      let rowEnd = 5
      for (let i = 0; i < rowRemoveCount.length; i++) {
        if (+chosen[j] >= rowStart && +chosen[j] <= rowEnd) {
          if (rowRemoveCount[i] < 5) {
            if (tiles[chosen[j]].dataset.side === "left") {
              tiles[+chosen[j] + 1].dataset.side = "left";
              tiles[+chosen[j] + 1].dataset.removed = "true";
              rowRemoveCount[i] += 1;
            }
            if (tiles[chosen[j]].dataset.side === "right") {
              tiles[+chosen[j] - 1].dataset.side = "right";
              tiles[+chosen[j] - 1].dataset.removed = "true";
              rowRemoveCount[i] += 1;
            }
          }
        }
        rowStart += 6;
        rowEnd += 6;
      }
    }
    chosen = [];
    console.log(rowRemoveCount);
  } else {
    tiles[chosen[0]].classList.remove("choosen");
    tiles[chosen[0]].classList.add("border");
    tiles[chosen[1]].classList.remove("choosen");
    tiles[chosen[1]].classList.add("border");
    chosen = [];
  }
}
let fon = new Audio();
fon.src = "kossacks.mp3";
fon.play();
setInterval(fon.play(), 1500000);


let reset = document.querySelector(".reset")
reset.addEventListener('click',
function(){
  for(let i = 0; i < tiles.length; i++){
 tiles[i].style.visibility = "visible"
 tiles[i].classList.remove("choosen");
 tiles[i].classList.add("border");
}
}
)