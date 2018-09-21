(function(global) {
    document.getElementById('button-open').addEventListener('click', function() {
        document.querySelector('.feedback').classList.toggle('hidden');
    });

    document.getElementById('button-close').addEventListener('click', function() {
        document.querySelector('.feedback').classList.toggle('hidden');
    });

    document.getElementById('add-form').addEventListener('change', function(e) {
        let inputs_map = {
            'rating_input': function() {
                if(e.target.value >= 4) {
                    document.querySelector('.disabled-option').disabled = false;
                    M.FormSelect.init(document.getElementById('mealType_input'), {});
                } else {
                    document.querySelector('.disabled-option').disabled = true;
                    M.FormSelect.init(document.getElementById('mealType_input'), {});
                }
            },
            'region_input': function() {
                let checkbox_map = {
                    'Istanbul': function() {
                        featuresDisabledChecked(true, false, false);
                    },
                    'Kemer': function() {
                        featuresDisabledChecked(false, true, true);
                    },
                    'Antalya': function() {
                        featuresDisabledChecked(false, true, true);
                    }
                };
                checkbox_map[e.target.value]();
                function featuresDisabledChecked(beach, wifiD, wifiC) {
                    document.querySelector('.disabled-option-beach').disabled = beach;
                    document.querySelector('.checked-option-wifi').disabled = wifiD;
                    document.querySelector('.checked-option-wifi').checked = wifiC;
                }
            }
        };
        if(inputs_map[e.target.id]) {
            inputs_map[e.target.id]();
        }
    });

    document.querySelector('.button-send').addEventListener('click', function() {
        console.log(global.modules.hotels);
        let newHotel = {
            name: '',
            rating: 0,
            description: '',
            mealType: '',
            features: ['wifi', 'beach', 'gym', 'conference'],
            region: '',
            img: '1.jpg'
        };
        let form = document.getElementById('add-form');
        for (let key in newHotel) {
            for(let i=0; i<form.elements.length; i++) {
                if(form.elements[i].id.indexOf(key) !== -1) {
                    if(form.elements[i].id === 'features') {
                        const checkedFeatures = Array.from(document.querySelectorAll('.filled-in'))
                            .filter(function(checkbox) {
                                return checkbox.checked;
                            })
                            .map(function (checkbox) {
                                return checkbox.value;
                            });
                        newHotel[key] = form.elements[i].value = checkedFeatures;
                        break;
                    } else {
                        newHotel[key] = form.elements[i].value;
                        break;
                    }
                }
            }
        }
        //global.modules.hotels.push(newHotel);
        //console.log(global.modules.hotels);
    });

    document.getElementById('add-form').addEventListener('submit', function(e) {
        e.preventDefault();
    });

})(window);