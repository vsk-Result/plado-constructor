/**
  * M1-shop referal save
  */

function getC(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = "";
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

function setC(name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function urlGen(f){
   var i1 = 'https://m1-shop.ru/send_my_order/';
   var i2 = getC("s");
   var i3 = getC("w");
   var i4 = getC("t");
   var i5 = getC("p");
   var i6 = getC("m");
   f.action = i1 + '?s=' + i2 + '&w=' + i3 + '&t=' + i4 + '&p=' + i5 + '&m=' + i6;
   return true;
}  

var m1dt = new Date();
after30days = m1dt.setDate(m1dt.getDate() + 30);
datecoom1 = new Date(after30days);

var query = getQueryParams(document.location.search);

if (typeof query.ref !== "undefined") setC("ref", query.ref, datecoom1, "/");
if (typeof query.s !== "undefined") setC("s", query.s, datecoom1, "/");
if (typeof query.w !== "undefined") setC("w", query.w, datecoom1, "/");
if (typeof query.t !== "undefined") setC("t", query.t, datecoom1, "/");
if (typeof query.p !== "undefined") setC("p", query.p, datecoom1, "/");
if (typeof query.m !== "undefined") setC("m", query.m, datecoom1, "/");
if (typeof query.r !== "undefined") setC("r", query.r, datecoom1, "/");
