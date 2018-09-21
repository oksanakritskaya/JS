let cardsModule = (function(global) {
    let test_mass = [1,2,3,4,5];
    return {
        //вызвать все (слушатель)
        renderCards: function(){
            /*global.module.cards = {

            }*/
            console.log(test_mass);
            return 'renderCards';
        },

        //создание обр
        createCard: function() {
            return 'createCard';
        }
    }
})(window);

console.log(modules.renderCards());