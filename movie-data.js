let movieData = {
	"The Darjeeling Limited": {
		plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
		cast: ["Jason Schwartzman", "Owen Wilson", "Adrien Brody"],
		runtime: 151,
		rating: 7.2,
		year: 2007,
		src: "images/the-darjeeling-limited.jpg",
		review: "",
		bgColor: "#883025",
	},
	"The Royal Tenenbaums": {
		plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons",
		rating: 7.6,
		year: 2001,
		cast: ["Gene Hackman", "Gwnyeth Paltrow", "Anjelica Huston"],
		runtime: 170,
		src: "images/the-royal-tenenbaums.jpg",
		review: "",
		bgColor: "#d6191f",
	},
	"Fantastic Mr. Fox": {
		year: 2009,
		plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
		cast: ["George Clooney", "Meryl Streep", "Bill Murray", "Jason Schwartzman"],
		runtime: 147,
		rating: 7.9,
		src: "images/fantastic-mr-fox.jpg",
		review: "",
		bgColor: "#ec2027",
	},
	"The Grand Budapest Hotel": {
		rating: 8.1,
		runtime: 159,
		year: 2014,
		plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
		cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
		src: "images/the-grand-budapest-hotel.jpg",
		review: "",
		bgColor: "#524557",
	},
};

const cardContainer = document.querySelector(".cards");
const yearSort = document.querySelector(".year-sort-button");

const title = document.getElementById("film-title");
const cast = document.getElementById("cast");
const plot = document.getElementById("plot");
const year = document.getElementById("year");
const runtime = document.getElementById("runtime");
const rating = document.getElementById("rating");
const body = document.getElementById("body");
const reviewButton = document.getElementById("reviewButton");

let focusedIndex = 0;

let ordered = orderKeys(movieData, false);
onFocusChange();
// function that takes key at each object, converts to a sroted array and returns a new object called ordered
//unordered is an object, reversed is a boolean
function orderKeys(unordered, reversed) {
	let sortedArray = Object.keys(unordered).sort();
	if (reversed) {
		sortedArray = sortedArray.reverse();
	}

	return sortedArray.reduce((obj, key) => {
		obj[key] = unordered[key];
		return obj;
	}, {});
}

function addCard(imageSource) {
	const newDiv = document.createElement("div");
	newDiv.classList.add("card");

	const newImage = document.createElement("img");
	newImage.setAttribute("src", imageSource);

	newDiv.appendChild(newImage);
	cardContainer.appendChild(newDiv);
}

Object.keys(ordered).forEach((key) => {
	addCard(ordered[key].src);
});
appendSpacer(cardContainer);

function toggleNavVisibility() {
	const nextButton = document.getElementById("next");
	const prevButton = document.getElementById("previous");

	if (focusedIndex === Object.keys(movieData).length - 1) {
		nextButton.style.visibility = "hidden";
	} else {
		nextButton.style.visibility = "visible";
	}
	if (focusedIndex === 0) {
		prevButton.style.visibility = "hidden";
	} else {
		prevButton.style.visibility = "visible";
	}
}

function discardChanges() {
	const focusedMovie = Object.keys(ordered)[focusedIndex];
	const form = document.getElementById("reviewForm");

	if (window.confirm("Do you want to discard your changes?")) {
		const reviewInput = document.getElementById("reviewInput");
		reviewInput.value = movieData[focusedMovie].review;

		toggleReview(form);

		return true;
	} else {
		return false;
	}
}

function sortClick() {
	if (document.getElementById("reviewForm").dataset.mode === "edit" && !discardChanges()) {
		return false;
	}
	yearSort.toggleAttribute("ascending");
	const ascending = yearSort.getAttribute("ascending") !== null;

	const cardArray = document.querySelectorAll(".card");
	cardArray.forEach((card) => {
		card.remove();
	});

	document.querySelector(".spacer").remove();

	ordered = orderKeys(movieData, ascending);
	Object.keys(ordered).forEach((key) => {
		addCard(ordered[key].src);
	});

	appendSpacer(cardContainer);

	focusedIndex = 0;
	onFocusChange();
	toggleNavVisibility();
}

function previousCard() {
	if (document.getElementById("reviewForm").dataset.mode === "edit" && !discardChanges()) {
		return false;
	}

	if (focusedIndex > 0) {
		focusedIndex -= 1;

		onFocusChange();
	}
	toggleNavVisibility();
}

function nextCard() {
	if (document.getElementById("reviewForm").dataset.mode === "edit" && !discardChanges()) {
		return false;
	}

	if (focusedIndex < Object.keys(movieData).length - 1) {
		focusedIndex += 1;

		onFocusChange();
	}

	toggleNavVisibility();
}

function appendSpacer(container) {
	const spacerDiv = document.createElement("div");
	spacerDiv.classList.add("spacer");

	container.appendChild(spacerDiv);
}

function toggleReview(form) {
	const focusedMovie = Object.keys(ordered)[focusedIndex];
	const button = document.getElementById("reviewButton");

	if (form.dataset.mode === "display") {
		const reviewInput = document.createElement("textarea");
		reviewInput.setAttribute("id", "reviewInput");
		reviewInput.value = movieData[focusedMovie].review;

		reviewInput.setAttribute("maxlength", "200");

		document.getElementById("reviewText").remove();

		form.insertBefore(reviewInput, button);

		form.dataset.mode = "edit";
		button.value = "Submit";
	} else {
		const reviewInput = document.getElementById("reviewInput");
		movieData[focusedMovie].review = reviewInput.value;

		reviewInput.remove();

		const reviewText = document.createElement("p");
		reviewText.setAttribute("id", "reviewText");
		reviewText.textContent = movieData[focusedMovie].review;

		form.insertBefore(reviewText, button);

		form.dataset.mode = "display";

		if (movieData[focusedMovie].review === "") {
			button.value = "Add Review";
		} else {
			button.value = "Edit Review";
		}
	}
}

function onFocusChange() {
	const reviewText = document.getElementById("reviewText");
	const focusedMovie = Object.keys(ordered)[focusedIndex];
	const button = document.getElementById("reviewButton");

	cardContainer.scrollLeft = 500 * focusedIndex;
	title.textContent = Object.keys(ordered)[focusedIndex];
	plot.textContent = Object.values(ordered)[focusedIndex].plot;
	cast.textContent = Object.values(ordered)[focusedIndex].cast.join(", ");
	runtime.textContent = Object.values(ordered)[focusedIndex].runtime;
	year.textContent = Object.values(ordered)[focusedIndex].year;
	rating.textContent = Object.values(ordered)[focusedIndex].rating;
	reviewText.textContent = Object.values(ordered)[focusedIndex].review;
	body.style.backgroundColor = Object.values(ordered)[focusedIndex].bgColor;
	reviewButton.style.color = Object.values(ordered)[focusedIndex].bgColor;

	if (movieData[focusedMovie].review === "") {
		button.value = "Add Review";
	} else {
		button.value = "Edit Review";
	}
}
