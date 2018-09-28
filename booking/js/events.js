let cardsModule = {

    renderCards: function renderCards(arr) {
        arr = arr || this.hotels;

        let template = document.getElementById('offer');
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < arr.length; i++) {
            let newCard = template.content.cloneNode(true);
            newCard.querySelector('.hotel-picture').src = "../img/" + arr[i].img;
            newCard.querySelector('.name-hotel').textContent = arr[i].name;

            let stars = [];
            newCard.querySelector('.stars').textContent = '⭐'.repeat(arr[i].rating);;

            newCard.querySelector('.description').textContent = arr[i].description;
            newCard.querySelector('.meal-type').textContent = arr[i].mealType;
            newCard.querySelector('.region').textContent = arr[i].region;

            let features = [];
            for (let m = 0; m < arr[i].features.length; m++) {
                for (let key in this.features_template) {
                    if (arr[i].features[m] === key) {
                        let elem = document.createElement('li');
                        elem.classList.add('features-' + key);
                        elem.textContent = '' + this.features_template[key];
                        features.push(elem);
                    }
                }
            }
            for (let k = 0; k < features.length; k++) {
                newCard.querySelector('.features-list').appendChild(features[k]);
            }

            fragment.appendChild(newCard);
        }
        let catalog = document.querySelector('.catalog');

        while (catalog.firstChild) {
            catalog.removeChild(catalog.firstChild);
        }
        catalog.appendChild(fragment);
    },

    addCard: function(newCard) {
        this.hotels.push(newCard);
        this.renderCards();
    }
};