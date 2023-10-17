function events() {
    let topics = {};

    return {
        subscribe: function(topic, handler) {
            if (!topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
            topics[topic].push(handler);
        },

        publish: function(topic, info) {
            if (topics.hasOwnProperty(topic)) {
                topics[topic].forEach(handler => {
                    handler(info);
                })
            }
        },
        
        remove: function(topic, handler) {
            if (!topics.hasOwnProperty(topic)) return;

            let handlerIndex = topics[topic].findIndex(x => x === handler);

            if (handlerIndex === -1) return;

            topics[topic].splice(handlerIndex, 1);
        },

        removeAll: function(topic) {
            if (topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
        }
    }
}