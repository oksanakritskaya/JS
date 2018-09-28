var Events = function(){
    return {
        ADD_CARD: 'ADD_CARD',
    }
}();

var eventBus = (function() {
    var callbacks = {};

    return {
        publish: publish,
        subscribe: subscribe
    }

    function publish(type, event) {
        if(callbacks[type] == null) {
            return;
        }
        callbacks[type].forEach(function(callback) {
            callback(event);
        })
    }

    function subscribe(type, callback) {
        if(callback[type] == null) {
            callbacks[type] = [];
        }
        callbacks[type].push(callback);
    }
})();