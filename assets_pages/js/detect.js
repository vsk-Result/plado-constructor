var detects = {
    paste: [],
    timer: 0,
    fp:''
};

function onPaste(e) {
    var tagName = e.target.tagName;
    var name = $(e.target).attr('name');
    detects.paste.push({
        name: name,
        tag: tagName
    });
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

let M1Timer = {
    cookieParams:{},
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
        let data = getCookie('site_timer'),
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
        let data = getCookie('site_timer'),
            host = M1Timer.getHost();

        if(data == null){
            data = {};
            data[host] = 0;
        }else{
            data = JSON.parse(data);
            if(typeof data[host] == 'undefined') data[host] = 0;
        }
        data[host] += 1;
        setCookie('site_timer', JSON.stringify(data), M1Timer.cookieParams);
    },
    startCycle:function(){
        M1Timer.setLastActive();
        M1Timer.cookieParams = {
            expires:365*(3600*24),
            path:location.pathname,
            domain:location.host
        };
        M1Timer.timerId = setInterval(function(){
            let diff_second = new Number((M1Timer.getTime()-M1Timer.getLastActive())/1000).toFixed(0);
            if(diff_second<30){
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
        let data = getCookie('site_timer'),
            host = M1Timer.getHost();
        if(data){
            data = JSON.parse(data);
            delete data[host];
        }
        setCookie('site_timer', JSON.stringify(data), M1Timer.cookieParams);
    },
    stopCycle:function(){
        clearInterval(M1Timer.timerId);
        M1Timer.clearHostData();
    }
};

function googleCode(){
  Fingerprint2.get(function(components) {
     detects.fp = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31); 
  });
}

$(function () {    
    googleCode();
    M1Timer.startCycle();
    $(document.body).on('paste', onPaste);
    $('form').on('submit', function () {
        detects.timer = M1Timer.getSecond();
        var detectsString = JSON.stringify(detects);
        detectsString = detectsString.replace(/"/g,"'");
        if (!$("[name=detects]").length){
            $('<input type="hidden" name="detects" value="' + detectsString + '">').appendTo(this);
        }
        M1Timer.stopCycle();
        return true;
    });
});

