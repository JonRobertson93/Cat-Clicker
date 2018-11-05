//MODEL SECTION - DATA - DEFINITIONS... //
let model = {
	currentAnimal = null;
	//Animals array:
	animals: [
		{
			name: "Charmander",
			clickCount: 0,
			imgSrc: "img/charmander.png",
		},
		{
			name: "Eevee",
			clickCount: 0,
			imgSrc: "img/eevee.png",
		},
		{
			name: "Pikachu",
			clickCount: 0,
			imgSrc: "img/pikachu.png",
		},
		{
			name: "Piplup",
			clickCount: 0,
			imgSrc: "img/piplup.png",
		},
		{
			name: "Squirtle",
			clickCount: 0,
			imgSrc: "img/squirtle.png",
		},
	]	// End of animals array
};

// OCTOPUS SECTION - CONNECTS FRAMEWORK WITH USER INTERFACE
let octopus = {
	init: function() {
		model.currentAnimal = model.animals[0];	// Sets current Animal to first animal in array
		animalListView.init();	// Will create the Thumnail list the user will see - part of "VIEW"
		animalView.init();		// Will create the main clickable image the user will interact with - part of "VIEW"
	},
	getCurrentAnimal: function() {	// accesses whichever animal is currently set to "currentAnimal"
		return model.currentAnimal;
	},
	getAllAnimals: function() {		// accesses entire array of animals
		return model.animals;
	},
	setCurrentAnimal: function() {	// determines which animal is current animal - main photo
		model.currentAnimal = animal;
	},
	increaseCount: () => {
		model.currentAnimal.clickCount++;	// Accesses currentAnimal's clickCount and increments by 1
		animalView.render();		// Calls render function on the main image section - part of "VIEW"
	}
};

// VIEW SECTION - 2 Parts: Main Image to click on & Thumbnails of all Animals available to select
// TODO....