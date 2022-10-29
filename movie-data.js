let movieData = {
	"The Darjeeling Limited": {
		plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
		cast: ["Jason Schwartzman", "Owen Wilson", "Adrien Brody"],
		runtime: 151,
		rating: 7.2,
		year: 2007,
		src: "images/the-darjeeling-limited.jpg",
	},
	"The Royal Tenenbaums": {
		plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons",
		rating: 7.6,
		year: 2001,
		cast: ["Gene Hackman", "Gwnyeth Paltrow", "Anjelica Huston"],
		runtime: 170,
		src: "images/the-royal-tenenbaums.jpg",
	},
	"Fantastic Mr. Fox": {
		year: 2009,
		plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
		cast: ["George Clooney", "Meryl Streep", "Bill Murray", "Jason Schwartzman"],
		runtime: 147,
		rating: 7.9,
		src: "images/fantastic-mr-fox.jpg",
	},
	"The Grand Budapest Hotel": {
		rating: 8.1,
		runtime: 159,
		year: 2014,
		plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
		cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
		src: "images/the-grand-budapest-hotel.jpg",
	},
};

const cardContainer = document.querySelector(".cards");
const yearSort = document.querySelector(".year-sort");

const ordered = orderKeys(movieData, false);
// function that takes key at each object, converts to a sroted array and returns a new object called ordered
//unordered is an object, reversed is a boolean
function orderKeys(unordered, reversed) {
	let ordered = Object.keys(unordered).sort();
	if (reversed) {
		ordered = ordered.reverse();
	}

	return ordered.reduce((obj, key) => {
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

function sortClick() {
	yearSort.toggleAttribute("ascending");
	const ascending = yearSort.getAttribute("ascending") !== null;

	const cardArray = document.querySelectorAll(".card");
	cardArray.forEach((card) => {
		card.remove();
	});

	const newOrder = orderKeys(movieData, ascending);
	Object.keys(newOrder).forEach((key) => {
		addCard(newOrder[key].src);
	});
}

// inputArray.forEach((input, index) => {
// 	input.addEventListener("change", () => {
// 		cardContainer.scrollLeft = 500 * index;
// 	});
// });
