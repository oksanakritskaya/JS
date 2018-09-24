(function () {
    let filters = {
        byRating: '',
        byMealType: '',
        byFeatures: '',
        byRegion: ''
    };

    let filter_hotels = [];

    document.getElementById('filters-form').addEventListener('change', function (e) {
        const filters_map = {
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
        let filtersArray = Object.keys(params)
            .filter(function (key) {
                return params[key];
            })
            .map(function (key) {
                return params[key];
            });
        filter_hotels = filtersArray.reduce(function (acc, curr) {
            return acc.filter(curr);
        }, cardsModule.hotels);

        cardsModule.renderCards(filter_hotels);
    }

    cardsModule.renderCards();
})();