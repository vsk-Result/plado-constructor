var detects = {
    paste: [],
    timer: 0
};

function onPaste(e) {
    var tagName = e.target.tagName;
    var name = $(e.target).attr('name');
    detects.paste.push({
        name: name,
        tag: tagName
    });
}

let M1Timer = {
    timerId: null,
    lastActive:0,
    getTime:function(){
        return (new Date()).getTime();
    },
    getLastActive:function(){
        return M1Timer.lastActive;
    },
    setLastActive:function(){
        M1Timer.lastActive = M1Timer.getTime();
    },
    getHost:function(){
        return location.origin+location.pathname;
    },
    getSecond:function(){
        let data = localStorage.getItem('site_timer'),
            host = M1Timer.getHost();
        if(data == null){
            return 0;
        }else{
            data = JSON.parse(data);
            if(typeof data[host] != 'undefined'){
                return Number(data[host]);
            }
        }
        return 0;
    },
    plusSecond:function(){
        let data = localStorage.getItem('site_timer'),
            host = M1Timer.getHost();

        if(data == null){
            data = {};
            data[host] = 0;
        }else{
            data = JSON.parse(data);
            if(typeof data[host] == 'undefined') data[host] = 0;
        }
        data[host] += 1;
        localStorage.setItem('site_timer', JSON.stringify(data));
    },
    startCycle:function(){
        M1Timer.setLastActive();
        M1Timer.timerId = setInterval(function(){
            let diff_second = new Number((M1Timer.getTime()-M1Timer.getLastActive())/1000).toFixed(0);
            if(diff_second<=30){
                M1Timer.plusSecond();
            }
        },1000);
        $(document).on("keydown", M1Timer.setLastActive);
        $(document).on("mousemove", M1Timer.setLastActive);
        $(document).on("scroll", M1Timer.setLastActive);
        $(document).on("resize", M1Timer.setLastActive);
        $(document).on("paste", M1Timer.setLastActive);
        $(document).on("click", M1Timer.setLastActive);
    },
    clearHostData:function(){
        let data = localStorage.getItem('site_timer'),
            host = M1Timer.getHost();
        if(data){
            data = JSON.parse(data);
            delete data[host];
        }
        localStorage.setItem('site_timer', JSON.stringify(data));
    },
    stopCycle:function(){
        clearInterval(M1Timer.timerId);
        M1Timer.clearHostData();
    }
};

$(function () {
    M1Timer.startCycle();
    $(document.body).on('paste', onPaste);
    $('form').on('submit', function () {
        detects.timer = M1Timer.getSecond();
        var detectsString = JSON.stringify(detects);
        detectsString = detectsString.replace(/"/g,"'");
        $('<input type="hidden" name="detects" value="' + detectsString + '">').appendTo(this);
        M1Timer.stopCycle();
        return true;
    });
});

