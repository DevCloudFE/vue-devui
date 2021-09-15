const EventListener = {
    listen: function (target, eventType, callback) {
        if (target.addEventListener){
            target.addEventListener(eventType, callback, false);
            return {
                remove (){
                    target.removeEventListener(target, callback, false);
                }
            }
        } else {
            target.attchEvent(eventType, callback);
            return {
                remove (){
                    target.detachEvent(eventType, callback);
                }
            };
        }
    }
};

export default EventListener;