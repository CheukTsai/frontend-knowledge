function countDown() {
    let interval;

    return function start(target) {
        if (interval) clearInterval(interval);
        let diff = target;
        console.log(diff);
        interval = setInterval(() => {
            if (diff > 0) {
                diff--;
                console.log(diff);
            }
            if (diff <= 0) {
                console.log("done");
                clearInterval(interval);
            }
        }, 1000);
        
    }
}

let cd = countDown();
cd(5);