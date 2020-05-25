let subscribers =  {}
function publish(event, data) {
  if(!subscribers[event]) {return;}
  subscribers[event].forEach(subscriberCallback => {
    subscriberCallback(data);
  });
  // method to publish an update
 
}
function subscribe(event, callback) {
  if (!subscribers[event]) {
    subscribers[event] = []
  }
  subscribers[event].push(callback);

  //event: The event being subscribed
  //Callback: The function called when the event is published 
  //method to subscribe to an update 
}
module.exports = {
  subscribe,
  publish,
}