//MODEL SECTION - DATA - DEFINITIONS... //
let model = {
	currentAnimal: null,
	//Animals array:
	animals: [
		{
			name: "Squirtle",
			clickCount: 0,
			imgSrc: "img/squirtle.png",
		},
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
		
	],	// End of animals array
};

// OCTOPUS SECTION - CONNECTS FRAMEWORK WITH USER INTERFACE
let octopus = {
	init: function() {
		model.currentAnimal = model.animals[0];	// Sets current Animal to first animal in array
		animalListView.init();	// Will create the Thumnail list the user will see - part of "VIEW"
		animalView.init();		// Will create the main clickable image the user will interact with - part of "VIEW"
		adminView.init();
	},
	getCurrentAnimal: function() {	// accesses whichever animal is currently set to "currentAnimal"
		return model.currentAnimal;
	},
	getAllAnimals: function() {		// accesses entire array of animals
		return model.animals;
	},
	setCurrentAnimal: function(animal) {	// determines which animal is current animal - main photo
		model.currentAnimal = animal;
		adminView.init();
	},
	increaseCount: function () {
		model.currentAnimal.clickCount++;	// Accesses currentAnimal's clickCount and increments by 1
		animalView.render();		// Calls render function on the main image section - part of "VIEW"
		adminView.init();
	},
	showAdminInfo: function () {
		adminView.init();
		adminView.show();
	},
	hideAdminInfo: function () {
		adminView.hide();
	},
	clearClicks: function () {
		model.currentAnimal.clickCount = 0;
		animalView.render();
		adminView.render();
	}

};

// VIEW SECTION - 2 Parts: Main Image to click on & Thumbnails of all Animals available to select
let animalView = {
	init: function () {
		this.animalEl = document.getElementById('main');
		this.animalNameEl = document.getElementById('name');
		this.animalCounterEl = document.getElementById('counter');
		this.animalImgEl = document.getElementById('mainImage');
		this.animalImgEl.addEventListener('click', function() {
			octopus.increaseCount();
		});
		this.render();	// After elements initialized, render() is called from init function.
	},
	render: function () {
		let current = octopus.getCurrentAnimal();
		this.animalCounterEl.textContent = current.clickCount;
		this.animalNameEl.textContent = current.name;
		this.animalImgEl.src = current.imgSrc;
	},
};

let animalListView = {
	init: function () {
		this.animalListEl = document.getElementById('animalList');
		this.render();
	},
	render: function () {
		let animals = octopus.getAllAnimals();
		this.animalListEl.innerHTML = '';
		for (let i=0; i<animals.length; i++) {
			let animal = animals[i];
			let el = document.createElement('li');
			el.innerHTML = `<img src=${animal.imgSrc} alt="animal image">`;
			el.addEventListener('click', (function (animalCopy) {
				return function () {
					octopus.setCurrentAnimal(animalCopy);
					animalView.render();
				};
			})(animal));
			this.animalListEl.appendChild(el);
		}
	}
};

let adminView = {
	init: function () {
		this.adminButton = document.getElementById('AdminButton');
		this.clearButton = document.getElementById('clearClicks');
		this.activeAnimal = octopus.getCurrentAnimal();
		this.name = document.getElementById('adminAnimalName');
		this.clicks = document.getElementById('adminAnimalClicks');
		this.adminButton.addEventListener('click', adminView.show);
		this.clearButton.addEventListener('click', octopus.clearClicks);
		this.render()
	},

	render: function () {
		this.name.value = `${this.activeAnimal.name}`;
		this.clicks.value = `${this.activeAnimal.clickCount}`;
	},	

	show: function () {
		adminView.init();
		let adminDiv = document.getElementById('AdminView');
		adminDiv.classList.add('adminShowPadding');
		let adminTools = document.getElementById('adminForm');
		adminTools.classList.remove('displayNone');
		let cancelButton = document.getElementById('cancel');
		cancelButton.addEventListener('click', adminView.hide);
		let saveButton = document.getElementById('save');
		saveButton.addEventListener('click', adminView.save);
	},
	hide: function () {
		let adminTools = document.getElementById('adminForm');
		adminTools.classList.add('displayNone');
		let adminDiv = document.getElementById('AdminView');
		adminDiv.classList.remove('adminShowPadding');
	},
	save: function () {
		//UPDATE click counter with form data...
		let clicks = document.getElementById('adminAnimalClicks');
		model.currentAnimal.clickCount = clicks.value;
		animalView.render();
		adminView.hide();
	}
};


octopus.init();	

/* Builds the app! Does the following:
1. Set model.currentAnimal to model.animal[0]
2. animalListView.init() - sets animalListEl to animal List ul (side thumbnail menu)
3. call render on animalListEl - loops for each animal:
	a) creates 'li' element
	b) sets inner HTML of 'li' to '<img src=${animal.imgSrc}>';
	c) Adds event listener to this image:
		-- on click, setCurrentAnimal(currentAnimal)
		-- animalView.render() - sets current animal's name, counter and image
	d) Appends to animalList ul in HTML
4. animalView.init() - adds event listener to main image - increases click count with each click
*/