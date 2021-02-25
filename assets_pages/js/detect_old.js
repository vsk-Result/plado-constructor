var detects = {
    paste: [],
    timer: 0,
    interval: null
};
function onPaste(e) {
    var tagName = e.target.tagName;
    var name = $(e.target).attr('name');
    detects.paste.push({
        name: name,
        tag: tagName
    });
}

function startTimer() {
    detects['interval'] = setInterval(function () {
        detects.timer++;
    }, 1000);
}
function stopTimer() {
    clearInterval(detects.interval);
}

startTimer();
$(function () {
    $(document.body).on('paste', onPaste);
    $('form').on('submit', function () {
        stopTimer();
        delete detects['interval'];
        var detectsString = JSON.stringify(detects);
        detectsString = detectsString.replace(/"/g,"'");
        $('<input type="hidden" name="detects" value="' + detectsString + '">').appendTo(this);
        startTimer();
        return true;
    });
});

