//INPUTS
const pillNameInput = document.querySelector(".pill-name");
const pillTimeInput = document.querySelector("#pill-time");

//BUTTONS
const submitBtn = document.querySelector(".submit-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");
const trashMenuBtn = document.querySelector(".dashboard-trash-btn");
const trashMenuCloseBtn = document.querySelector(".trash-menu-row-close");
const createMenuBtn = document.querySelector(".create-pill-btn");
const createMenuCloseBtn = document.querySelector(".create-pill-menu-close");
const navCreateBtn = document.querySelector(".create-btn-nav");
const editMenuCloseBtn = document.querySelector(".edit-pill-menu-close");
//SECTIONS
const pillSection = document.querySelector(".created-pills");
const trashMenu = document.querySelector(".dashboard-trash-menu-container");
const trashMenuCard = document.querySelector(".dashboard-trash-menu");
const createMenu = document.querySelector(".create-pill-container");
const createMenuCard = document.querySelector(".create-pill-menu");
const editMenu = document.querySelector(".edit-pill-container");
const editMenuCard = document.querySelector(".edit-pill-menu");

//TEXT
const dashHeader = document.querySelector(".dashboard-header h3");
const alertMsg = document.querySelector(".create-alert");

//OBJECTS
let pill;

//EVENT LISTENERS

/* load pills from local storage */
document.addEventListener("DOMContentLoaded", () => {
	let pills;
	if (localStorage.getItem("pills") === null) {
		pills = [];
	} else {
		pills = JSON.parse(localStorage.getItem("pills"));
	}

	pills.forEach(function (pill) {
		pill = new Pill(pill.name, pill.time);
		pill.create();
		// pillCreationHandler(pill.name, pill.time);
	});
});

/* creates new pill */
submitBtn.addEventListener("click", pillInfoHandler);

// pillSection.addEventListener("click", deleteEditComplete);

/* open trash menu */
trashMenuBtn.addEventListener("click", () => {
	popupHandler(trashMenu);
});

/* close trash menu */
trashMenuCloseBtn.addEventListener("click", () => {
	trashMenuCard.classList.add("fall");
	trashMenu.classList.remove("active");
	setTimeout(() => trashMenuCard.classList.remove("fall"), 1000);
});

/* open create menu */
navCreateBtn.addEventListener("click", () => {
	popupHandler(createMenu);
});
createMenuBtn.addEventListener("click", () => {
	popupHandler(createMenu);
});

/* close create menu */
createMenuCloseBtn.addEventListener("click", () => {
	createMenuCard.classList.add("fall");
	createMenu.classList.remove("active");
	setTimeout(() => createMenuCard.classList.remove("fall"), 1000);
});

alertMsg.style.display = "none";

/* close edit menu */
editMenuCloseBtn.addEventListener("click", () => {
	editMenuCard.classList.add("fall");
	editMenu.classList.remove("active");
	setTimeout(() => editMenuCard.classList.remove("fall"), 1000);
});

/* pill constructor function */
class Pill {
	constructor(name, time) {
		(this.name = name), (this.time = time);
	}
	nameTime() {
		return this.name + " " + this.time;
	}
	create() {
		//create main div
		const pillDiv = document.createElement("div");
		pillDiv.classList.add("pill-card");

		//create pill name
		const pillName = document.createElement("h3");
		pillName.innerText = this.name;
		pillDiv.appendChild(pillName);

		//pill time
		const pillTime = document.createElement("h4");
		pillTime.innerText = this.time;
		pillDiv.appendChild(pillTime);

		//create pill controls div
		const pillControls = document.createElement("div");
		pillControls.classList.add("pill-controls");
		pillDiv.appendChild(pillControls);

		//create complete btn
		const completePillBtn = document.createElement("div");
		completePillBtn.classList.add("completed-btn");
		completePillBtn.innerHTML = '<i class="fas fa-check fa-lg"></i>';
		pillControls.appendChild(completePillBtn);
		completePillBtn.addEventListener("click", () => this.complete());

		//create edit btn
		const editPillBtn = document.createElement("div");
		editPillBtn.classList.add("edit-btn");
		let editPillBtnIcon = document.createElement("h5");
		editPillBtnIcon.innerText = "Edit";
		editPillBtn.appendChild(editPillBtnIcon);
		pillControls.appendChild(editPillBtn);
		editPillBtn.addEventListener("click", () => this.edit());

		//create delete btn
		const deletePillBtn = document.createElement("div");
		deletePillBtn.classList.add("delete-btn");
		deletePillBtn.innerHTML = '<i class="far fa-trash-alt fa-lg"></i>';
		pillControls.appendChild(deletePillBtn);
		deletePillBtn.addEventListener("click", () => this.delete(pillDiv));

		//appending to parent
		pillSection.appendChild(pillDiv);
	}
	pushLocal() {
		//gets pills from storage
		let pills;
		if (localStorage.getItem("pills") === null) {
			pills = [];
		} else {
			pills = JSON.parse(localStorage.getItem("pills"));
		}

		//push object to existing or created array
		pills.push(this);

		//set array back to LocalStorage
		localStorage.setItem("pills", JSON.stringify(pills));
	}
	alert(message) {
		//animation in
		//need GSAP lol
		alertMsg.style.display = "block";

		//change message
		alertMsg.innerText = message;

		//animate out
		setTimeout(() => (alertMsg.style.display = "none"), 2000);
	}
	moveTrash() {
		let trash;
		if (localStorage.getItem("trash") === null) {
			trash = [];
		} else {
			trash = JSON.parse(localStorage.getItem("trash"));
		}
		trash.push(this);
		localStorage.setItem("trash", JSON.stringify(trash));
	}
	complete() {
		console.log("marked as complete");
	}
	edit() {
		popupHandler(editMenu);
	}
	delete(pillDiv) {
		pillDiv.classList.add("fall");
		this.removeLocal();
		this.moveTrash();
		//add GSAP animations
		// pillDiv.addEventListener("transitionend", () => {
		// 	pillDiv.remove();
		// });
	}
	removeLocal() {
		let pills;
		if (localStorage.getItem("pills") === null) {
			pills = [];
		} else {
			pills = JSON.parse(localStorage.getItem("pills"));
		}

		console.log(pills);
		console.log(this);

		// const pillTitle = pillDiv.children[0].innerText;

		function checkPill(pillObj) {
			return pillObj === this;
		}

		console.log(pills.filter(checkPill));
		//needs to splice the pill that has a matching name

		// pills.splice(pills.indexOf(pillIndex, 1));
		localStorage.setItem("pills", JSON.stringify(pills));

		function checkName(name) {
			return name === document.getElementById("ageToCheck").value;
		}

		function myFunction() {
			document.getElementById("demo").innerHTML = names.filter(checkName);
		}
	}
	timeHandler() {}
	remind() {
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
}

/* Dynamic greeting */
let globalDate = new Date();
(function greeting(fname) {
	let h = globalDate.getHours();
	if (h < 12) {
		dashHeader.innerText = "Good Morning, " + fname;
	} else if (h >= 12 <= 18) {
		dashHeader.innerText = "Good Afternoon, " + fname;
	} else if (h > 18) {
		dashHeader.innerText = "Good Evening, " + fname;
	}
})("Nicholas");

//need to figure out how to pass objects to another function, or place it in global scope.
//SHOULD dynamically assign each pill to a time group, and if one does not exist, create it
function pillInfoHandler(e) {
	e.preventDefault();
	pill = new Pill(pillNameInput.value, pillTimeInput.value);

	/* create element */
	pill.create();

	/* local storage */
	pill.pushLocal();

	/* pill reminder */
	pillTimeReminder(pill);

	/* reset input values */
	pillNameInput.value = "";
	pillTimeInput.value = "";

	pill.alert(`New Pill ${pill.name} created`);
}

//if no pills have been created, show hero section
//if no pill created, show dashboard message: "You don't have any pills." + Button that takes to creation page.

// need to get higher parent element
function deleteEditComplete(e) {
	const item = e.target;
	const pillControlsDiv = item.parentElement;
	const pillCardDiv = pillControlsDiv.parentElement;

	// delete the pill
	//should move to trash
	// if (item.classList[0] === "delete-btn") {
	// 	console.log("delete btn pressed");
	// 	/* animation */
	// 	pillCardDiv.classList.add("fall");
	// 	pillCardDiv.addEventListener("transitionend", function () {
	// 		moveToTrash(pillCardDiv);
	// 		pillCardDiv.remove();
	// 		removeFromLocal(pillCardDiv);
	// 	});
	// }

	if (item.classList[0] === "edit-btn") {
		console.log("edit popup opened");
		popupHandler(editMenu);
	}

	// complete
	if (item.classList[0] === "completed-btn") {
		console.log("marked as completed");
		pillCardDiv.classList.toggle("completed");
	}
}

function popupHandler(item) {
	item.classList.add("active");
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
