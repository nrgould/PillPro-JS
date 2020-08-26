//BUTTONS
const submitBtn = document.querySelector(".submit-btn");
const saveEdit = document.querySelector(".save-edit-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");
const trashMenuBtn = document.querySelector(".dashboard-trash-btn");
const trashMenuCloseBtn = document.querySelector(".trash-menu-row-close");
const createMenuBtn = document.querySelector(".create-pill-btn");
const createMenuCloseBtn = document.querySelector(".create-pill-menu-close");
const navCreateBtn = document.querySelector(".create-btn-nav");
const editMenuCloseBtn = document.querySelector(".edit-pill-menu-close");
const emptyTrashBtn = document.querySelector(".empty-trash");

//SECTIONS
const trashMenu = document.querySelector(".dashboard-trash-menu-container");
const pillSection = document.querySelector(".created-pills");
const trashMenuCard = document.querySelector(".dashboard-trash-menu");
const createMenu = document.querySelector(".create-pill-container");
const createMenuCard = document.querySelector(".create-pill-menu");
const editMenu = document.querySelector(".edit-pill-container");
const editMenuCard = document.querySelector(".edit-pill-menu");

//TEXT
const dashHeader = document.querySelector(".dashboard-header h3");
const alertMsg = document.querySelector(".create-alert");

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
	});
});

/* load pills from trash */
document.addEventListener("DOMContentLoaded", () => {
	let trash;
	if (localStorage.getItem("trash") === null) {
		trash = [];
	} else {
		trash = JSON.parse(localStorage.getItem("trash"));
	}

	trash.forEach(function (pill) {
		pill = new Pill(pill.name, pill.time);
		pill.trashRow();
	});
});

/* creates new pill */
submitBtn.addEventListener("click", pillInfoHandler);

/* edit existing pill */
saveEdit.addEventListener("click", pillEditHandler);

/* open trash menu */
trashMenuBtn.addEventListener("click", () => {
	popupHandler(trashMenu);
});

/* close trash menu */
trashMenuCloseBtn.addEventListener("click", () => {
	trashMenuCard.classList.add("fall");
	trashMenu.classList.remove("active");
	document.body.classList.remove("active");
	setTimeout(() => trashMenuCard.classList.remove("fall"), 1000);
});

/* Empty Trash */
emptyTrashBtn.addEventListener("click", () => {
	let trash;
	if (localStorage.getItem("trash") === null) {
		trash = [];
	} else {
		trash = JSON.parse(localStorage.getItem("trash"));
	}

	trash.forEach((pill) => {
		pill.remove();
	});
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
	document.body.classList.remove("active");
	setTimeout(() => createMenuCard.classList.remove("fall"), 1000);
});

/* close edit menu */
editMenuCloseBtn.addEventListener("click", () => {
	editMenuCard.classList.add("fall");
	editMenu.classList.remove("active");
	document.body.classList.remove("active");
	setTimeout(() => editMenuCard.classList.remove("fall"), 1000);
});

alertMsg.style.display = "none";

/* pill constructor function */
class Pill {
	constructor(name, time) {
		(this.name = name), (this.time = time);
	}

	create() {
		//create main div
		const pillDiv = document.createElement("div");
		pillDiv.classList.add("pill-card");

		//create pill name
		const name = document.createElement("h3");
		name.innerText = this.name;
		pillDiv.appendChild(name);

		//pill time
		const time = document.createElement("h4");
		if (this.time < 12) {
			time.innerText = `${this.time} am`;
		} else {
			time.innerText = `${this.time - 12} pm`;
		}
		pillDiv.appendChild(time);

		//create pill controls div
		const controls = document.createElement("div");
		controls.classList.add("pill-controls");
		pillDiv.appendChild(controls);

		//create complete btn
		const complete = document.createElement("div");
		complete.classList.add("completed-btn");
		complete.innerHTML = '<i class="fas fa-check fa-lg"></i>';
		controls.appendChild(complete);
		complete.addEventListener("click", () => this.complete(pillDiv));

		//create edit btn
		const edit = document.createElement("div");
		edit.classList.add("edit-btn");
		let editIcon = document.createElement("h5");
		editIcon.innerText = "Edit";
		edit.appendChild(editIcon);
		controls.appendChild(edit);
		edit.addEventListener("click", () => this.edit());

		//create delete btn
		const del = document.createElement("div");
		del.classList.add("delete-btn");
		del.innerHTML = '<i class="far fa-trash-alt fa-lg"></i>';
		controls.appendChild(del);
		del.addEventListener("click", () => this.delete(pillDiv));

		//appending to parent
		pillSection.appendChild(pillDiv);

		// this.remindDash(pillDiv);
	}
	delete(div) {
		div.classList.add("fall");
		this.removeLocal();
		this.moveTrash();
		//GSAP animate to trash icon
		div.addEventListener("transitionend", () => {
			div.remove();
		});
	}
	moveTrash() {
		//set localstorage
		let trash;
		if (localStorage.getItem("trash") === null) {
			trash = [];
		} else {
			trash = JSON.parse(localStorage.getItem("trash"));
		}
		trash.push(this);
		localStorage.setItem("trash", JSON.stringify(trash));

		trash.forEach(function (pill) {
			pill = new Pill(pill.name, pill.time);
			pill.trashRow();
		});
	}
	trashRow() {
		const trashRow = document.createElement("div");
		trashRow.classList.add("trash-menu-row");

		const info = document.createElement("div");
		info.classList.add("trash-menu-row-info");
		trashRow.appendChild(info);

		const name = document.createElement("p");
		name.innerText = this.name;
		info.appendChild(name);

		const time = document.createElement("p");
		if (this.time < 12) {
			time.innerText = `${this.time} AM`;
		} else {
			time.innerText = `${this.time - 12} PM`;
		}
		info.appendChild(time);

		const controls = document.createElement("div");
		controls.classList.add("trash-menu-row-controls");
		trashRow.appendChild(controls);

		const restore = document.createElement("p");
		restore.classList.add("trash-menu-restore");
		restore.innerText = "Restore";
		controls.appendChild(restore);

		const del = document.createElement("p");
		del.classList.add("trash-menu-delete");
		del.innerText = "Delete";
		controls.appendChild(del);
		del.addEventListener("click", () => {
			//add animation
			trashRow.remove();
			let trash;
			if (localStorage.getItem("trash") === null) {
				trash = [];
			} else {
				trash = JSON.parse(localStorage.getItem("trash"));
			}

			trash.splice(
				trash.findIndex((p) => p.name === this.name),
				1
			);
			localStorage.setItem("trash", JSON.stringify(trash));
		});

		const trashSection = document.querySelector(".dashboard-trash-menu");
		trashSection.appendChild(trashRow);
	}
	complete(div) {
		console.log("marked as complete");
		// div.classList.add('slide')
		// //remove from dashboard until next day
		// //until globalDate === 1
		// setTimeout(() => div.classList.remove("slide"), 1000);
	}
	edit() {
		popupHandler(editMenu);
		//set value of forms to this
		const editName = document.querySelector(".edit-pill-name");
		editName.value = this.name;

		const editTime = document.querySelector(".edit-time-select");
		editTime.value = this.time;
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
	removeLocal() {
		let pills;
		if (localStorage.getItem("pills") === null) {
			pills = [];
		} else {
			pills = JSON.parse(localStorage.getItem("pills"));
		}

		pills.splice(
			pills.findIndex((p) => p.name === this.name),
			1
		);
		localStorage.setItem("pills", JSON.stringify(pills));
	}
	remindDash(div) {
		//create date object with inputted time
		let pillDate = new Date(
			globalDate.getFullYear(),
			globalDate.getMonth(),
			globalDate.getDay(),
			this.time,
			0,
			0,
			0
		);

		let pHr = pillDate.getHours();
		let gHr = globalDate.getHours();

		//compare times
		if (gHr <= pHr) {
			console.log("SHOWING CONTENT");
			div.style.display = "grid";
		} else {
			console.log("NOT SHOWING CONTENT");
			div.style.display = "none";
		}
	}
	allPills(div) {
		//put every pill object in all pills
		const allPillsSection = document.querySelector(".all-pills-cards");
		allPillsSection.appendChild(div);
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
})(prompt("what is your first name?"));

//SHOULD dynamically assign each pill to a time group, and if one does not exist, create it
function pillInfoHandler(e) {
	const pillNameInput = document.querySelector(".create-pill-name");
	const timeSelectInput = document.querySelector(".create-time-select");
	e.preventDefault();
	let pill = new Pill();
	pill.name = pillNameInput.value;
	pill.time = timeSelectInput.value;

	/* create element */
	pill.create();

	/* local storage */
	pill.pushLocal();

	/* reset input values */
	pillNameInput.value = "";
	timeSelectInput.value = "6";

	pill.alert(`New Pill ${pill.name} created`);
}

function pillEditHandler(e) {
	e.preventDefault();
	console.log("edited");
}

//if no pills have been created, show hero section
//if no pill created, show dashboard message: "You don't have any pills." + Button that takes to creation page.

function popupHandler(item) {
	document.body.classList.add("active");
	item.classList.add("active");
}

/* GSAP */
const pill1 = document.querySelector("#pill1");
const pill2 = document.querySelector("#pill2");
const pill3 = document.querySelector("#pill3");
