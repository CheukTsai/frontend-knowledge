function jsonp(url, params, callback) {
    let queryString = url.indexOf("?") === -1 ? "?" : "&";

    for (let k in params) {
        if (params.hasOwnProperty(k)) {
            queryString += k + "=" + params[k] + "&";
        }
    }

    let random = Math.random().toString().replace(".", "");
    let callbackName = "myJsonp" + random;

    queryString += "calback=" + callbackName;

    let scriptNode = document.createElement("script");
    scriptNode.src = url + queryString;

    window[callbackName] = function() {
        callback(...arguments);

        document.getElementsByTagName("head")[0].removeChild(scriptNode);
    };

    document.getElementsByTagName("head")[0].appendChild(scriptNode);
}