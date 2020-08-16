//when pill is submitted, create card or table row with pill info
//homepage should dynamically display card for the pills to be taken that day

//INPUTS
const pillNameInput = document.querySelector(".pill-name");
const pillTimeInput = document.querySelector("#pill-time");

//BUTTONS
const submitBtn = document.querySelector(".submit-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");

const pillSection = document.querySelector(".created-pills");
const completedPillSelector = document.querySelectorAll(".complete-pill");
const headerTitle = document.querySelector(".header h1");
const alertMsg = document.querySelector(".alert");

document.addEventListener("DOMContentLoaded", pullFromLocalStorage);
submitBtn.addEventListener("click", pillInfoHandler);
pillSection.addEventListener("click", deleteOrComplete);

//pill constructor function
class Pill {
	constructor(name, date, time) {
		(this.name = name), (this.date = date), (this.time = time);
	}
}

/* Dynamic greeting */
let globalDate = new Date();
(function greeting(fname) {
	let h = globalDate.getHours();
	if (h <= 12) {
		headerTitle.innerText = "Good Morning, " + fname;
	} else if (h >= 12 <= 18) {
		headerTitle.innerText = "Good Afternoon, " + fname;
	} else {
		headerTitle.innerText = "Good Evening, " + fname;
	}
})("Nicholas");

//SHOULD dynamically assign each pill to a time group, and if one does not exist, create it
function pillInfoHandler(event) {
	event.preventDefault();
	let pill;
	pill = new Pill(pillNameInput.value, "everyday", pillTimeInput.value);

	/* create element */
	pillCreationHandler(pill.name, pill.time);

	/* local storage */
	pushToLocalStorage(pill);

	/* pill reminder */
	pillTimeReminder(pill);

	/* reset input values */
	pillNameInput.value = "";
	pillTimeInput.value = "";

	pillAlert(`New Pill ${pill.name} created`);
}

//if no pills have been created, show hero section
//if no pill created, show dashboard message: "You don't have any pills." + Button that takes to creation page.

//need to get higher parent element
function deleteOrComplete(e) {
	const item = e.target;
	// delete the todo
	if (item.classList[0] === "delete-btn") {
		const pillControlsDiv = item.parentElement;
		const pillCardDiv = pillControlsDiv.parentElement;
		console.log(pillCardDiv);
		/* animation */
		pillCardDiv.classList.add("fall");
		pillCardDiv.addEventListener("transitionend", function () {
			removeFromLocal(pillCardDiv);
			pillCardDiv.remove();
		});
	}

	// complete
	if (item.classList[0] === "completed-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function assignTimeGroup(pill, hour) {
	let timeGroup;
	//figure out if a time group exists with that hour
	if (timeGroup.time === hour) {
		pill.classList.add(`time-group-${hour}`);
	}
}

function pillTimeHandler() {
	//will have to parse time into int, needs to be able to handle many different variations of input.
}

alertMsg.style.display = "none";
function pillAlert(message) {
	//animation in
	alertMsg.style.display = "block";

	//change message
	alertMsg.innerText = message;

	//animate out
	setTimeout(() => (alertMsg.style.display = "none"), 2000);
}

function pillTimeReminder(pillObj) {
	//THIS WILL HAVE TO BE A METHOD ON EACH OBJECT
	//input time (sampleTime in this case)
	//must take input from each pill object
	let sampleTimeHours = 8;
	let sampleTimeMinutes = 30;

	//create global date to compare to (created in dynamic greeting)

	//create date object with inputted time
	let pillDate = new Date(
		globalDate.getFullYear(),
		globalDate.getMonth(),
		globalDate.getDay(),
		pillObj.time,
		sampleTimeMinutes,
		0,
		0
	);

	let hr = pillDate.getHours();
	let gHr = globalDate.getHours();

	//compare times
	if (hr <= gHr) {
		console.log("SHOWING CONTENT");
	} else {
		console.log("NOT SHOWING CONTENT");
	}
}

function pillCreationHandler(name, time) {
	//create main div

	const pillDiv = document.createElement("div");
	pillDiv.classList.add("pill-card");

	//create pill name
	const pillName = document.createElement("h3");
	pillName.innerText = name;

	//pill time
	const pillTime = document.createElement("h4");
	pillTime.innerText = time;

	//create pill controls div
	const pillControls = document.createElement("div");
	pillControls.classList.add("pill-controls");

	//create complete btn
	const completePillBtn = document.createElement("div");
	completePillBtn.classList.add("complete-btn");
	completePillBtn.innerHTML = '<i class="fas fa-check fa-lg"></i>';

	//create edit btn
	const editPillBtn = document.createElement("div");
	editPillBtn.classList.add("edit-btn");
	let editPillBtnIcon = document.createElement("h5");
	editPillBtnIcon.innerText = "Edit";
	editPillBtn.appendChild(editPillBtnIcon);

	//create delete btn
	const deletePillBtn = document.createElement("div");
	deletePillBtn.classList.add("delete-btn");
	deletePillBtn.innerHTML = '<i class="far fa-trash-alt fa-lg"></i>';

	//appending to parent
	pillDiv.appendChild(pillName);
	pillDiv.appendChild(pillTime);
	pillDiv.appendChild(pillControls);
	pillDiv.appendChild(deletePillBtn);
	pillSection.appendChild(pillDiv);
	pillControls.appendChild(completePillBtn);
	pillControls.appendChild(editPillBtn);
	pillControls.appendChild(deletePillBtn);
}

function pushToLocalStorage(pillObj) {
	//gets pills from storage
	let pills;
	if (localStorage.getItem("pills") === null) {
		pills = [];
	} else {
		pills = JSON.parse(localStorage.getItem("pills"));
	}

	/* if pills array doesn't exist, create new one, otherwise pull from LocalStorage */
	// let pills = localStorage.getItem("pills");
	// pills = pills ? pills.split(",") : [];

	//push object to existing or created array
	pills.push(pillObj);

	//set array back to LocalStorage
	localStorage.setItem("pills", JSON.stringify(pills));
}

function pullFromLocalStorage() {
	let pills;
	if (localStorage.getItem("pills") === null) {
		pills = [];
	} else {
		pills = JSON.parse(localStorage.getItem("pills"));
	}

	pills.forEach(function (pill) {
		pillCreationHandler(pill.name, pill.time);
	});
}

function removeFromLocal(pill) {
	let pills;
	if (localStorage.getItem("pills") === null) {
		pills = [];
	} else {
		pills = JSON.parse(localStorage.getItem("pills"));
	}
	// console.log(pill.children[0].innerText);
	const pillIndex = pill.children[0].innerText;
	pills.splice(pills.indexOf(pillIndex, 1));
	localStorage.setItem("pills", JSON.stringify(pills));
}
