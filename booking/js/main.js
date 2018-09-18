(function () {
    const hotels = [
        {
            name: 'Ozkayamag Falez',
            rating: 1,
            description: 'This property is 4 minutes walk from the beach. Ozkaymak Falez Hotel offers 2 outdoor pools, a children’s pool, an indoor pool, and a water slide. The hotel has a spa centre and 4 tennis courts. Ozkaymak’s private beach is 200 m away, and a shuttle is provided.',
            mealType: 'All Inclusive',
            features: ['wifi', 'beach', 'gym', 'conference'],
            region: 'Kemer',
            img: '1.jpg'
        }, {
            name: 'Hotel SU And Aqualand ',
            rating: 3,
            description: 'All rooms and suites at Hotel SU & Aqualand feature trendy interiors and mood lighting. Each has a private balcony with a sofa and central heating/cooling system. Special treats and complimentary toiletries are offered for each guest.',
            mealType: 'Breakfast only',
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
            rating: 2,
            description: 'This property is 4 minutes walk from the beach. Set along the famous Konyaalti Beach, Crowne Plaza Antalya offers luxurious 5-star accommodation and open views of the Mediterranean Sea. It has indoor and outdoor pools, an extensive spa and free WiFi.',
            mealType: 'All Inclusive',
            features: ['wifi'],
            region: 'Antalya',
            img: '4.jpg'
        }, {
            name: 'Ritz Carlton',
            rating: 5,
            description: 'The most luxurious place in the world',
            mealType: 'All Inclusive',
            features: ['wifi', 'conference', 'beach'],
            region: 'Kemer',
            img: '1.jpg'
        },
        {
            name: 'Royal Plaza',
            rating: 4,
            description: 'The most luxurious place in the world',
            mealType: 'Breakfast and Bed',
            features: ['gym'],
            region: 'Istanbul',
            img: '2.jpg'
        },
        {
            name: 'Sultan Palace',
            rating: 3,
            description: 'The most luxurious place in the world',
            mealType: 'Breakfast and Bed',
            features: ['beach', 'gym'],
            region: 'Antalya',
            img: '3.jpg'
        }
    ];

    let features_template = {
        wifi: '💻',
        beach: '🏖',
        gym: '🏋️',
        conference: '👨‍💼'
    };
    let filters = {
        byRating: '',
        byMealType: '',
        byFeatures: '',
        byRegion: ''
    };

    let filter_hotels = [];

    document.getElementById('filters-form').addEventListener('change', function (e) {
        let filters_map = {
            'select-item': function () {
                let selectors_map = {
                    rating: function () {
                        filters.byRating = function (hotel) {
                            return hotel.rating >= parseInt(e.target.value);
                        }
                    },
                    mealType: function () {
                        filters.byMealType = function (hotel) {
                            return hotel.mealType === e.target.value;
                        }
                    }
                };
                selectors_map[e.target.id]();
            },
            'filled-in': function () {
                const checkedFeatures = Array.from(document.querySelectorAll('.filled-in'))
                    .filter(function(checkbox) {
                        return checkbox.checked;
                    })
                    .map(function (checkbox) {
                        return checkbox.value;
                    });

                filters.byFeatures = function(hotel) {
                    return checkedFeatures.every(function(checkbox) {
                        return hotel.features.includes(checkbox);
                    });
                }
            },
            'with-gap': function () {
                filters.byRegion = function (hotel) {
                    return hotel.region === e.target.value;
                }
            }
        };
        filters_map[e.target.classList[0]]();

        filterCards(filters);
    });


    function filterCards(params) {
        console.log(params);

        let filtersArray = Object.keys(params)
            .filter(function (key) {
                return params[key];
            })
            .map(function (key) {
                return params[key];
            });
        filter_hotels = filtersArray.reduce(function (acc, curr) {
            return acc.filter(curr);
        }, hotels);

        constructCards(filter_hotels);
    }

    function constructCards(arr) {
        arr = arr || hotels;

        let template = document.getElementById('offer');
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < arr.length; i++) {
            let new_card = template.content.cloneNode(true);
            new_card.querySelector('.hotel-picture').src = "../img/" + arr[i].img;
            new_card.querySelector('.name-hotel').textContent = arr[i].name;

            let stars = [];
            for (let j = 0; j < arr[i].rating; j++) {
                stars.push('⭐');
            }
            new_card.querySelector('.stars').textContent = stars.join('');

            new_card.querySelector('.description').textContent = arr[i].description;
            new_card.querySelector('.meal-type').textContent = arr[i].mealType;
            new_card.querySelector('.region').textContent = arr[i].region;

            let features = [];
            for (let m = 0; m < arr[i].features.length; m++) {
                for (let key in features_template) {
                    if (arr[i].features[m] === key) {
                        let elem = document.createElement('li');
                        elem.classList.add('features-' + key);
                        elem.textContent = '' + features_template[key];
                        features.push(elem);
                    }
                }
            }
            for (let k = 0; k < features.length; k++) {
                new_card.querySelector('.features-list').appendChild(features[k]);
            }

            fragment.appendChild(new_card);
        }
        let catalog = document.querySelector('.catalog');

        while (catalog.firstChild) {
            catalog.removeChild(catalog.firstChild);
        }
        catalog.appendChild(fragment);
    }

    constructCards();
})();