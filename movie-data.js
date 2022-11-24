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
		plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons.",
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
const yearSort = document.querySelector(".alpha-sort-button");

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

//takes key at each object, converts to an alphabetically sorted array and returns a new object called "ordered"
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

//creates and a <div> with class .card, creates and <img> and sets the src to the string of the objects "src" property.
function addCard(imageSource) {
	const newDiv = document.createElement("div");
	newDiv.classList.add("card");

	const newImage = document.createElement("img");
	newImage.setAttribute("src", imageSource);

	newDiv.appendChild(newImage);
	cardContainer.appendChild(newDiv);
}

//iterates through the ordered films and creates a card with and image for each.
Object.keys(ordered).forEach((key) => {
	addCard(ordered[key].src);
});

appendSpacer(cardContainer);

//contextually changes the visibility of the navigation buttons. previous button is hidden at first index, next button is hidden at last index-1(to account for the spacer).
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

//alert that pops up when navigating or sorting if text input is still active and hasn't been submitted. if cancelled, text input remains active. if accepted, review is reverted to previous value and saved.
function discardChanges() {
	const focusedMovie = Object.keys(ordered)[focusedIndex];
	const form = document.getElementById("reviewForm");
	//reverts text to focusedMovies "review" string.
	if (window.confirm("Do you want to discard your changes?")) {
		const reviewInput = document.getElementById("reviewInput");
		reviewInput.value = movieData[focusedMovie].review;

		toggleReview(form);

		return true;
	} else {
		return false;
	}
}

//sorts the keys in ascending or descending alphabetically, displays the cards in the slider accordingly. resets index to 0.
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

//scrolls backwards through slider, interates through order index. onFocusChange() updates film poster image and information.
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

//scrolls forwards through slider, interates through order index. onFocusChange() updates film poster image and information.
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

//stores review form text input value to focusedIndex's "review" property as a string and displays it at the bottom of the info panel.
function toggleReview(form) {
	const focusedMovie = Object.keys(ordered)[focusedIndex];
	const button = document.getElementById("reviewButton");

	if (form.dataset.mode === "display") {
		//creates text input with a value of focusedMovie's "review" property value (whether empty or not).
		const reviewInput = document.createElement("textarea");
		reviewInput.setAttribute("id", "reviewInput");
		reviewInput.value = movieData[focusedMovie].review;

		reviewInput.setAttribute("maxlength", "200");

		//removes review <p>.
		document.getElementById("reviewText").remove();

		form.insertBefore(reviewInput, button);

		//changes form state to "edit" and button text to "Submit"
		form.dataset.mode = "edit";
		button.value = "Submit";
	} else {
		//sets focusedMovie's review property value to the value of the text input.
		const reviewInput = document.getElementById("reviewInput");
		movieData[focusedMovie].review = reviewInput.value;

		// removes the form text input
		reviewInput.remove();

		//creates a new <p> with textContent of focusedMovie's "review" property value.
		const reviewText = document.createElement("p");
		reviewText.setAttribute("id", "reviewText");
		reviewText.textContent = movieData[focusedMovie].review;

		form.insertBefore(reviewText, button);

		//changes form state to "display"
		form.dataset.mode = "display";

		//contextually changes review button text depending on whether stored "review" value is empty or not.
		if (movieData[focusedMovie].review === "") {
			button.value = "Add Review";
		} else {
			button.value = "Edit Review";
		}
	}
}

//triggered on navigation and sort. sets the focused card's image, information and body's background colour at current index to that of relevant film within the current order.
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

	//contextually changes review button text depending on whether stored "review" value is empty or not.
	if (movieData[focusedMovie].review === "") {
		button.value = "Add Review";
	} else {
		button.value = "Edit Review";
	}
}
