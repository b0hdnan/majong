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
		img: "./img/003.png"
	},
	{
		name: "Іван Миколайчук",
		img: "./img/004.png"
	},
	{
		name: "Павло Скоропадський",
		img: "./img/005.png"
	},
	{
		name: "Симон Петлюра",
		img: "./img/006.png"
	},
	{
		name: "Віктор Ющенко",
		img: "./img/007.png"
	},
	{
		name: "Любомир Гузар",
		img: "./img/008.jpg"
	},
	{
		name: "Михайло Грушевський",
		img: "./img/009.png"
	},
	{
		name: "Володимир Винниченко",
		img: "./img/010.png"
	},
	{
		name: "Володимир Довженко",
		img: "./img/011.jpg"
	},
	{
		name: "Євген Петрушевич",
		img: "./img/012.png"
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
let rows = [3, 3, 4, 5, 4, 3, 2] // малюнок гри


function create() {
	let posToaddCard = 0
	let rowtiles = []
	for (let j = 0; j < rows.length; j++) {
		const row = document.createElement("div");
		row.classList.add("tile-row");
		for (let z = 0; z < rows[j]; z++) {
			const tile = document.createElement("div");
			tile.classList.add("tile");
			tile.classList.add("border");
			tile.dataset.value = posToaddCard;
			// крайні справа або зліва можуть бути видалені
			if (z === 0) {
				tile.dataset.removed = "true";
				tile.dataset.side = "left";
			} else if (z === rows[j] - 1) {
				tile.dataset.removed = "true";
				tile.dataset.side = "right";
			} else {
				tile.dataset.removed = "false";
				tile.dataset.side = "center";
			}
			tile.style.backgroundImage = `url(${persons[posToaddCard].img})`;
			tile.addEventListener("click", choose);
			rowtiles.push(tile);
			posToaddCard++
		}
		tiles = [...tiles, ...rowtiles] // зберегли вcі ігрові елементи
		rowtiles.forEach((tile) => row.appendChild(tile)); // додали картки до ряду
		board.appendChild(row)// додали ряд на дошку
		rowtiles = [] // очитисли ряд
	}
}

let chosen = [];
let rowRemovedCount = [...rows];
console.log(rowRemovedCount)
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
	console.log(persons[chosen[0]].name)
	console.log(persons[chosen[1]].name)
	console.log(chosen[0])
	console.log(chosen[1])
	if (
		persons[chosen[0]].name === persons[chosen[1]].name &&
		tiles[chosen[0]].dataset.removed === "true" &&
		tiles[chosen[1]].dataset.removed === "true") {

		// коли співпали імена героїв на картках

		tiles[chosen[0]].style.visibility = "hidden";
		tiles[chosen[1]].style.visibility = "hidden";

		// фікчуємо вилучення картки з гри
		// передаємо можливість вилучення для сусідньої картки
		// контроль вилучень по рядах ----- rowRemovedCount

		// дізнаємося ряди для вилучення карток
		let targetRow1 = 0
		let targetRow2 = 0
		// 1 картка
		let sum = 0;
		for (let i = 0; i < rows.length; i++) {
			sum += rows[i]
			if (sum > chosen[0]) {
				targetRow1 = i
				break
			}
		}
		// 2 картка
		sum = 0;
		for (let i = 0; i < rows.length; i++) {
			sum += rows[i]
			if (sum > chosen[1]) {
				targetRow2 = i
				break
			}
		}
		console.log(targetRow1)
		console.log(targetRow2)

		// вилучаємо 1 картку
		if (rowRemovedCount[targetRow1] > 0) {
			if (tiles[chosen[0]].dataset.side === "left") {
				tiles[+chosen[0] + 1].dataset.side = "left";
				tiles[+chosen[0] + 1].dataset.removed = "true";
				rowRemovedCount[targetRow1] -= 1;
			}
			if (tiles[chosen[0]].dataset.side === "right") {
				tiles[+chosen[0] - 1].dataset.side = "right";
				tiles[+chosen[0] - 1].dataset.removed = "true";
				rowRemovedCount[targetRow1] -= 1;
			}
		}

			// вилучаємо 2 картку
			if (rowRemovedCount[targetRow2] > 0) {
				if (tiles[chosen[1]].dataset.side === "left") {
					tiles[+chosen[1] + 1].dataset.side = "left";
					tiles[+chosen[1] + 1].dataset.removed = "true";
					rowRemovedCount[targetRow2] -= 1;
				}
				if (tiles[chosen[1]].dataset.side === "right") {
					tiles[+chosen[1] - 1].dataset.side = "right";
					tiles[+chosen[1] - 1].dataset.removed = "true";
					rowRemovedCount[targetRow2] -= 1;
				}
			}

		chosen = [];
		console.log(rowRemovedCount);
		if (rowRemovedCount.every(item => item === 0)) alert("ВАМ ВДАЛОСЬ! ВІТАЄМО!")

	}
	else {
		tiles[chosen[0]].classList.remove("choosen");
		tiles[chosen[0]].classList.add("border");
		tiles[chosen[1]].classList.remove("choosen");
		tiles[chosen[1]].classList.add("border");
		chosen = [];
	}
}


let fon = new Audio();
fon.src = "./sounds/kossacks.mp3";
fon.play();
fon.volume = 0.1

let reset = document.querySelector(".reset")
reset.addEventListener('click',
	function () {
		for (let i = 0; i < tiles.length; i++) {
			tiles[i].style.visibility = "visible"
			tiles[i].classList.remove("choosen");
			tiles[i].classList.add("border");
		}
	}
)