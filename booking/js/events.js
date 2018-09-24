let cardsModule = {
    hotels: [{
        name: 'Ozkayamag Falez',
        rating: 4,
        description: 'This property is 4 minutes walk from the beach. Ozkaymak Falez Hotel offers 2 outdoor pools, a children’s pool, an indoor pool, and a water slide. The hotel has a spa centre and 4 tennis courts. Ozkaymak’s private beach is 200 m away, and a shuttle is provided.',
        mealType: 'All Inclusive',
        features: ['wifi', 'beach', 'gym', 'conference'],
        region: 'Kemer',
        img: '1.jpg'
    }, {
        name: 'Hotel SU And Aqualand ',
        rating: 3,
        description: 'All rooms and suites at Hotel SU & Aqualand feature trendy interiors and mood lighting. Each has a private balcony with a sofa and central heating/cooling system. Special treats and complimentary toiletries are offered for each guest.',
        mealType: 'Breakfast and Bed',
        features: ['wifi', 'beach'],
        region: 'Istanbul',
        img: '2.jpg'
    }, {
        name: 'Sealife Family',
        rating: 4,
        description: 'This property is 3 minutes walk from the beach. Directly facing blue-flagged Konyaalti Beach, Sealife is an extensive resort with facilities and activities for the whole family. It features pools with slides, a spa with body treatments, diving and snorkeling equipment.',
        mealType: 'Breakfast and Bed',
        features: ['wifi', 'beach', 'conference'],
        region: 'Istanbul',
        img: '3.jpg'
    }, {
        name: 'Crowne Plaza',
        rating: 5,
        description: 'This property is 4 minutes walk from the beach. Set along the famous Konyaalti Beach, Crowne Plaza Antalya offers luxurious 5-star accommodation and open views of the Mediterranean Sea. It has indoor and outdoor pools, an extensive spa and free WiFi.',
        mealType: 'All Inclusive',
        features: ['wifi'],
        region: 'Antalya',
        img: '4.jpg'
    }, {
        name: 'Ritz Carlton',
        rating: 4,
        description: 'The most luxurious place in the world',
        mealType: 'All Inclusive',
        features: ['wifi', 'conference', 'beach'],
        region: 'Kemer',
        img: '3.jpg'
    }, {
        name: 'Royal Plaza',
        rating: 2,
        description: 'The most luxurious place in the world',
        mealType: 'Breakfast only',
        features: ['gym'],
        region: 'Istanbul',
        img: '2.jpg'
    }, {
        name: 'Sultan Palace',
        rating: 1,
        description: 'The most luxurious place in the world',
        mealType: 'Breakfast only',
        features: ['beach', 'gym'],
        region: 'Antalya',
        img: '1.jpg'
    }],
    features_template: {
        wifi: '💻',
        beach: '🏖',
        gym: '🏋️',
        conference: '👨‍💼'
    },

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