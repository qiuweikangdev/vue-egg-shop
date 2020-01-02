(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            let htmlWidth = doc.documentElement.clientWidth || doc.body.clientWidth;
            if (!htmlWidth) return;
            // if (htmlWidth >= 750) { htmlWidth = 750 }
            docEl.style.fontSize = htmlWidth / 20 + 'px'
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);