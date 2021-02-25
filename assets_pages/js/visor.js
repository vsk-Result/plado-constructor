var vizorObject = null;
//////////////////////////////////////
function visor() {
    this.logs = [];
    this.lastActionTimeStamp = 0;
    this.interval = 0;
    this.windowHeight = 0;
    this.windowWidth = 0;

    this.getActionUpdateSizeWindow = function () {
        var self = this;

        return function () {
            self.windowHeight = $(document).height();
            self.windowWidth = $(document).width();
        };
    };

    this.getPositionByPercent = function (left, top) {
        return ({
            left: left * 100 / this.windowWidth,
            top: top * 100 / this.windowHeight
        });
    };

    this.getActionInterval = function () {
        var self = this;

        return function () {
            self.interval++;
        };
    };

    this.getActionOnMouseMove = function () {
        var self = this;

        return function (e) {
            if (e.timeStamp != self.lastActionTimeStamp) {
                self.lastActionTimeStamp = e.timeStamp;
                var x = e.pageX;
                var y = e.pageY;

                self.logs.push({
                    action: 'move',
                    position: self.getPositionByPercent(x, y),
                    second: self.interval
                });
            }
        };
    };

    this.getActionOnKeyPress = function () {
        var self = this;

        return function (e) {

            var tag = e.target.localName;
            var type = $(e.target).attr('type');
            var name = $(e.target).attr('name');
            if (
                (e.timeStamp != self.lastActionTimeStamp)
                && (tag == 'input')
                && (type != 'submit')
                && (type != 'button')
                && (type != 'reset')
                && name
            ) {
                self.lastActionTimeStamp = e.timeStamp;
                if (e.keyCode > 45 || e.keyCode == 8) {
                    self.logs.push({
                        action: 'key',
                        keyCode: e.keyCode,
                        second: self.interval,
                        target: 'input[type=' + type + '][name=' + name + ']'
                    });
                }
            }
        };
    };

    this.getActionOnClick = function () {
        var self = this;

        return function (e) {
            if (e.timeStamp != self.lastActionTimeStamp) {
                self.lastActionTimeStamp = e.timeStamp;
                var x = e.pageX;
                var y = e.pageY;

                self.logs.push({
                    action: 'click',
                    position: self.getPositionByPercent(x, y),
                    second: self.interval
                });
            }
        };
    };

    this.getActionOnScroll = function () {
        var self = this;

        return function (e) {
            if (e.timeStamp != self.lastActionTimeStamp) {
                self.lastActionTimeStamp = e.timeStamp
                var pos = $(document).scrollTop() || $(document).scrollTop() || $(window).scrollTop();
                self.logs.push({
                    action: 'scroll',
                    pos: self.getPositionByPercent(0, pos),
                    second: self.interval
                });
            }
        };
    };

    this.bindActions = function () {
        $('*').on('mousemove', this.getActionOnMouseMove());
        $(window).on('scroll', this.getActionOnScroll());
        $('*').on('click', this.getActionOnClick());
        $(window).on('resize', this.getActionUpdateSizeWindow());
        $('*').on('keypress',this.getActionOnKeyPress());
        setInterval(this.getActionInterval(), 1000);
    };

    this.bindActions();
    this.getActionUpdateSizeWindow()();
}
$(function(){
    vizorObject = new visor();
    $('form').attr('method', 'post');
    $('form').on('submit', function(e){
        var logs = vizorObject.logs;
        var visorData = {
            logs: logs,
            url: window.location.href
        };
        $('<input type="hidden" name="vizor" value="' + JSON.stringify(visorData).replace(/"/g,"'") + '">').appendTo(this);
        return true;
    });
});
//
function visor_player(logs) {
    this.logs = logs;
    this.isPlay = false;
    this.interval = 0;
    this.windowHeight = 0;
    this.windowWidth = 0;
    this.speedAdd = 0;

    this.getActionUpdateSizeWindow = function () {
        var self = this;

        return function () {
            self.windowHeight = $(document).height();
            self.windowWidth = $(document).width();
        };
    };

    this.getItemsBySecond = function (second) {
        var result = [];

        this.logs.forEach(function (item) {
            if (item.second == second) {
                result.push(item);
            }
        });

        return result;
    };

    this.getPosFromItem = function (pos) {
        return ({
            x: this.windowWidth * pos.left / 100,
            y: this.windowHeight * pos.top / 100
        });
    };

    this.addPointer = function (pos, color) {
        var pointer = getRandomInt(100000, 999999);
        var html = '<style>#vp' + pointer + '.visor-pointer{z-index: 999999;position: absolute; background-color: '+color+'; width:10px; height:10px;border-radius:5px;opacity:0.8;}</style>';
        html += '<div id="vp' + pointer + '" class="visor-pointer" style="top:' + parseInt(pos.y) + 'px;left: ' + parseInt(pos.x) + 'px;"></div>';
        $(html).appendTo($(document.body));
        setTimeout(function () {
            $('#vp' + pointer).css('opacity',0.2);
        }, 2000);
    };

    this.scroll = function (item) {
        var pos = this.getPosFromItem(item.pos);
        $(document).scrollTop(pos.y);
    };

    this.click = function (item) {
        var pos = this.getPosFromItem(item.position);
        this.addPointer(pos, 'red');
    };

    this.move = function (item) {
        var pos = this.getPosFromItem(item.position);
        this.addPointer(pos, 'yellow');
    };

    this.key = function (item) {
        if ($(item.target).length) {
            $(item.target).val($(item.target).val() + String.fromCharCode(item.keyCode));
        }
    };

    this.playItem = function (item) {
        if (this[item.action]) {
            this[item.action](item);
        }
    };

    this.getActionOnInterval = function () {
        var self = this;

        return function () {
            if (self.isPlay) {
                for(var z=self.interval-self.speedAdd;z<self.interval+1;z++) {
                    var items = self.getItemsBySecond(z);
                    for (var i = 0; i < items.length; i++) {
                        self.playItem(items[i]);
                    }
                }
                self.interval = self.interval +self.speedAdd+1;

                var lastInterval = self.getLastInterval();
                var width = self.windowWidth * self.interval / lastInterval;
                $('.v-progress').width(width);
            }
        };
    };

    this.play = function () {
        this.isPlay = true;
    };

    this.pause = function () {
        this.isPlay = false;
    };

    this.stopActions = function(){
        $('form').on('submit', function(e){
            e.stopPropagation();
            e.preventDefault();

            return false;
        });
    };
    this.addBack = function(){
        $('<div style="background: #000; opacity: 0.5; z-index:999996;width:100%; height:100%;top:0;left:0;position: fixed;"></div>').appendTo($(document.body));
    };
    this.getLastInterval = function(){
        return this.logs[this.logs.length-1].second;
    };
    this.addProgressBar = function(){
        $('<div class="v-progress" style="background: #008000;z-index:999997;top:0;left:0;height:5px;width:0;position: fixed;"></div>').appendTo($(document.body));
    };
    this.addButtons = function(){
        $('<div class="v-pause" style="text-align: center;cursor:pointer;color:white;padding-top:5px;border-radius:5px;background: #008000;z-index:999997;top:10px;left:10px;height:20px;font-size:12px;width:50px;position: fixed;">Pause</div>').appendTo($(document.body));
        $('<div class="v-play" style="text-align: center;cursor:pointer;color:white;padding-top:5px;border-radius:5px;display:none;background: #008000;z-index:999997;top:10px;left:10px;height:20px;font-size:12px;width:50px;position: fixed;">Play</div>').appendTo($(document.body));
        var speedButtons = '<div class="speed-down" style="display: inline-block;padding:3px;">-</div><div class="speed-status" style="display: inline-block;">1</div><div class="speed-up" style="display: inline-block;padding:3px;">+</div>';
        $('<div class="v-speed" style="text-align: center;cursor:pointer;color:white;padding-top:5px;border-radius:5px;background: #008000;z-index:999997;top:40px;left:10px;height:20px;font-size:12px;width:50px;position: fixed;">'+speedButtons+'</div>').appendTo($(document.body));
        var f = function(self, isPauseButton){
            return function(){
                if(isPauseButton) {
                    self.pause();
                    $('.v-pause').hide();
                    $('.v-play').show();
                }else{
                    self.play();
                    $('.v-pause').show();
                    $('.v-play').hide();
                }
            };
        };
        var speedF = function(self, isUp){
            return function(){
                if(isUp){
                    self.speedAdd++;
                    $('.speed-status').html(self.speedAdd+1);
                }else{
                    self.speedAdd--;
                    $('.speed-status').html(self.speedAdd-1);
                }
            }
        };
        $('.v-pause').on('click', f(this,true));
        $('.v-play').on('click', f(this,false));
        $('.v-speed .speed-down').on('click', speedF(this,false));
        $('.v-speed .speed-up').on('click', speedF(this,true));
    };

    if(this.logs.length>0){
        $(document).scrollTop(0);
        this.stopActions();
        this.play();
        setInterval(this.getActionOnInterval(), 1000);
        this.addBack();
        this.addProgressBar();
        this.addButtons();
    }
    this.getActionUpdateSizeWindow()();

}