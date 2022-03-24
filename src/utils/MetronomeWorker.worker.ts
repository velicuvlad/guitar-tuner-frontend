declare const self: Worker;
export default {} as typeof Worker & { new(): Worker };

let timerID: any;
let interval = 100;
self.addEventListener("message", (event) => {
  if (event.data === "start") {
    timerID = setInterval(function () {
      // @ts-ignore
      postMessage("tick");
    }, interval);
  } else if (event.data.interval) {
    interval = event.data.interval;
    if (timerID) {
      clearInterval(timerID);
      timerID = setInterval(function () {
        // @ts-ignore
        postMessage("tick");
      }, interval);
    }
  } else if (event.data === "stop") {
    clearInterval(timerID);
    timerID = undefined;
  }
});
