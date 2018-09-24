(function() {
    document.getElementById('button-open').addEventListener('click', function() {
        M.Modal.getInstance(document.getElementById('modal1')).open();
    });

    document.getElementById('button-close').addEventListener('click', function() {
        M.Modal.getInstance(document.getElementById('modal1')).close();
    });

    const regionsRules = {
        Istanbul: {
            disabled: 'beach'
        },
        Kemer: {
            disabled: 'wifi',
            checked: 'wifi'
        },
        Antalya: {
            disabled: 'wifi',
            checked: 'wifi'
        }
    }
    form = document.getElementById('add-form');

    form.addEventListener('change', function(e) {
        const inputs_map = {
            'rating_input': function() {
                if(e.target.value >= 4) {
                    document.querySelector('.disabled-option').disabled = false;
                    M.FormSelect.init(document.getElementById('mealType_input'), {});
                } else {
                    document.querySelector('.disabled-option').disabled = true;
                    M.FormSelect.init(document.getElementById('mealType_input'), {});

                    if (document.getElementById('mealType_input').value === 'All Inclusive') {
                        document.querySelector('.default-option').selected = true;
                        M.FormSelect.init(document.getElementById('mealType_input'), {});
                    }
                }
            },
            'region_input': function() {
                /*let checkbox_map = {
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
                document.querySelector('.disabled-option-beach').checked = false;
                document.querySelector('.checked-option-wifi').checked = false;
                checkbox_map[e.target.value]();
                function featuresDisabledChecked(beach, wifiD, wifiC) {
                    document.querySelector('.disabled-option-beach').disabled = beach;
                    document.querySelector('.checked-option-wifi').disabled = wifiD;
                    document.querySelector('.checked-option-wifi').checked = wifiC;
                }*/
                if(regionsRules[e.target.value]) {
                    //console.log(regionsRules[e.target.value]);
                    Object.keys(regionsRules[e.target.value]).forEach(function(key) {
                        console.log(key);
                        console.log(regionsRules[e.target.value][key]);
                        form.querySelectorAll('.filled-in').filter(function(elem) {
                            return elem.value === regionsRules[e.target.value][key];
                        }).every(function(elem) {
                            elem.setAttribute(key, true);
                        })
                        /* console.log('--------')
                        console.log(key);
                        form.querySelectorAll('.filled-in').forEach(function(elem) {
                            console.log(elem.value+' '+elem.checked);
                            console.log(elem.value+' '+elem.disabled);
                            if(regionsRules[e.target.value][key] === elem.value) {
                                elem.setAttribute(key, true);
                            }
                        })
                        console.log('--------') */
                    });
                };
            }
        };
        if(inputs_map[e.target.id]) {
            inputs_map[e.target.id]();
        }
    });

    document.getElementById('add-form').addEventListener('submit', function(e) {
        console.log('submit');

        const newHotel = {
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
        cardsModule.addCard(newHotel);

        //document.getElementById('button-close').dispatchEvent(new Event("click"));
        M.Modal.getInstance(document.getElementById('modal1')).close();
        form.reset();
        window.scrollTo(0, document.body.scrollHeight);

        e.preventDefault();
    });

})();