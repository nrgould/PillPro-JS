//when pill is submitted, create card or table row with pill info
//homepage should dynamically display card for the pills to be taken that day

const pillNameInput = document.querySelector(".pill-name");
const submitBtn = document.querySelector(".submit-btn");
const pillTimeInput = document.querySelector("#pill-time");
const pillSection = document.querySelector(".created-pills");
const completedPillSelector = document.querySelectorAll(".complete-pill");

// document.addEventListener("DOMContentLoaded", getLocalStorage);
submitBtn.addEventListener("click", pillInfoHandler);

class Pill {
	constructor(name, date, time) {
		(this.name = name), (this.date = date), (this.time = time);
	}
}

function pillInfoHandler(event) {
	event.preventDefault();
	let pill;
	pill = new Pill(pillNameInput.value, "everyday", 8);
	console.log(pill);
	//create element
	const pillDiv = document.createElement("div");
	pillDiv.classList.add("todo-card");

	const pillName = document.createElement("p");
	pillName.innerText = pill.name;
	pillDiv.appendChild(pillName);

	const pillTime = document.createElement("h4");
	pillTime.innerText = pill.time;
	pillDiv.appendChild(pillTime);

	//local storage
	pushToLocalStorage(pill);

	pillNameInput.value = "";
	pillTimeInput.value = "";

	pillSection.appendChild(pillDiv);
}

function pushToLocalStorage(pillObj) {
	// let pills;
	// if (localStorage.getItem("pills") === null) {
	// 	pills = [];
	// } else {
	// 	pills = JSON.parse(localStorage.getItem("pills"));
	// }

	let pills = localStorage.getItem("pills");

	pills = pills ? pills.split(",") : [];
	console.log(pills);

	let pillObj_serialized = JSON.stringify(pillObj);
	// console.log({ pillObj_serialized });

	pills.push(pillObj_serialized);
	console.log(pills);

	localStorage.setItem("pills", pills.toString());

	// console.log(JSON.parse(localStorage.getItem("pills")));

	let pillObj_deserialized = JSON.parse(pillObj_serialized);
	// console.log({ pillObj_deserialized });
}

// function getLocalStorage() {
// 	let pills;
// 	if (localStorage.getItem("pills") === null) {
// 		pills = [];
// 	} else {
// 		pills = JSON.parse(localStorage.getItem("pills"));
// 	}
// 	pills.forEach(function (pill) {
// 		const pillDiv = document.createElement("div");
// 		pillDiv.classList.add("todo-card");

// 		const pillName = document.createElement("p");
// 		pillName.innerText = pill.name;
// 		pillDiv.appendChild(pillName);

// 		const pillTime = document.createElement("h4");
// 		pillTime.innerText = pill.time;
// 		pillDiv.appendChild(pillTime);

// 		pillNameInput.value = "";
// 		pillTimeInput.value = "";

// 		pillSection.appendChild(pillDiv);
// 	});
// }
