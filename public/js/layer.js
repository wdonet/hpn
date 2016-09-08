function getBrowserHeight() {
    var intH = 0;
    var intW = 0;
    if(typeof window.innerWidth  == 'number' ) {
       intH = window.innerHeight;
       intW = window.innerWidth;
    }
    else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        intH = document.documentElement.clientHeight;
        intW = document.documentElement.clientWidth;
    }
    else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
        intH = document.body.clientHeight;
        intW = document.body.clientWidth;
    }
    return { width: parseInt(intW), height: parseInt(intH) };
}

function setLayerPosition() {
    var shadow = document.getElementById("shadow");
    var thanks = document.getElementById("thanks");
    var bws = getBrowserHeight();
    shadow.style.width = bws.width + "px";
    shadow.style.height = bws.height + "px";
    thanks.style.left = parseInt((bws.width - 350) / 2);
    thanks.style.top = parseInt((bws.height - 200) / 2);
    shadow = null;
    thanks = null;
}

function showLayer() {
    setLayerPosition();
    var shadow = document.getElementById("shadow");
    var thanks = document.getElementById("thanks");
    shadow.style.display = "block";
    thanks.style.display = "block";
    shadow = null;
    thanks = null;
}

function hideLayer() {
    var shadow = document.getElementById("shadow");
    var thanks = document.getElementById("thanks");
    shadow.style.display = "none";
    thanks.style.display = "none";
    shadow = null;
    thanks = null;
}

window.onresize = setLayerPosition;
