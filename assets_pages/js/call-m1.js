$(function(){ 
    
    $("body").append('<div id="call-but-m1"></div>');


    
    var callObj='<div class="call-m1-pulse-one"></div><div class="call-m1-pulse-two"></div><div class="call-cont-m1" id="call-hover-m1"><div class="call-cont-m1-front"></div><div class="call-cont-m1-back">'+callBtn+'</div></div>'
    $('#call-but-m1').html(callObj);
    
    flip=function(){
        $('#call-hover-m1').toggleClass('spinner-m1');
    }
    var timerId=setInterval(flip,3000);
    
    $('#call-but-m1').hover(
        function(){
            if($('#call-hover-m1').hasClass('spinner-m1') != true){
                $('#call-hover-m1').addClass('spinner-m1');
            };
            clearInterval(timerId);
        },
        function(){
          $('#call-hover-m1').removeClass('spinner-m1');
          timerId=setInterval(flip,3000);
          
    });

    $('#call-but-m1').click(function() {
           var form_selector = $("#m1-form");
           M1.modalShow(form_selector);
           $("#overlay-popup-m1").show();
           $("input[name=from_recall_button]", form_selector).val(1);
    });
});