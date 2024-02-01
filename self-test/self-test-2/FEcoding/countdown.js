function countDown(seconds) {
    setInterval(() => {
        console.log(seconds);
        seconds--;
    }, 1000);
}

countDown(10);