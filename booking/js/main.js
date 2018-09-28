(function () {
    const api = 'https://hotels-backend.now.sh/';
    let hotels = [];

    const features_template = {
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

    getCardsRequest();

    function getCardsRequest() {
        fetch(api + 'api/hotels/9')
            .then(function(response) {
                return response.json();
            })
            .then(function(responseBody) {
                if(responseBody.error) {
                    displayError(responseBody.error);
                } else {
                    hotels = responseBody;
                    renderCards();
                }
            })
            .catch(function(error) {
                displayError(error.message)
            });
    }

    let filter_hotels = [];

    document.getElementById('filters-form').addEventListener('change', function (e) {
        const filters_map = {
            'rating': function () {
                filters.byRating = function (hotel) {
                    return hotel.rating >= parseInt(e.target.value);
                }
            },
            'mealType': function () {
                filters.byMealType = function (hotel) {
                    return hotel.mealType === e.target.value;
                }
            },
            'feature': function () {
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
            'region': function () {
                filters.byRegion = function (hotel) {
                    return hotel.region === e.target.value;
                }
            }
        };
        filters_map[e.target.name]();

        filterCards(filters);
    });


    function filterCards(params) {
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

        renderCards(filter_hotels);
    }

    function renderCards(arr) {
        arr = arr || hotels;
        if(arr.length === 0) {
            displayError('Hotels not found');
            return false;
        }

        let template = document.getElementById('offer');
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < arr.length; i++) {
            let newCard = template.content.cloneNode(true);
            newCard.querySelector('.hotel-picture').src = '../img/' + Math.round(Math.random()*3 + 1) +'.jpg';
            newCard.querySelector('.name-hotel').textContent = arr[i].name;
            newCard.querySelector('.stars').textContent = '⭐'.repeat(arr[i].rating);
            newCard.querySelector('.description').textContent = arr[i].description;
            newCard.querySelector('.meal-type').textContent = arr[i].mealType;
            newCard.querySelector('.region').textContent = arr[i].region;

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
                newCard.querySelector('.features-list').appendChild(features[k]);
            }

            fragment.appendChild(newCard);
        }
        let catalog = document.querySelector('.catalog');
        catalog.textContent = '';

        catalog.appendChild(fragment);
    }

    eventBus.subscribe('ADD_CARD', addCardRequest);
    function addCardRequest(newCard) {
        fetch(api + 'api/hotels/9', {
            method: 'POST',
            body: JSON.stringify(newCard),
            headers:{'content-type': 'application/json'}
        })
        .then(function(response) {
            return response.json();
        })
        .then(function (responseBody) {
            if(responseBody.error) {
                displayError(responseBody.error);
            } else {
                getCardsRequest();
            }
        })
        .catch(function(error) {
            displayError(error.message)
        });
    }

    function displayError(message) {
        let catalog = document.querySelector('.catalog');
        let p = document.createElement('p');
        p.classList.add('flow-text');
        p.textContent = message;
        catalog.textContent = '';
        catalog.appendChild(p);
    }
})();