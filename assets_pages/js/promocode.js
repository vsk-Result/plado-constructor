$(document).ready(function() {

	$(document).on('click', ".checkcode", function(){
		if ( $("div").hasClass("fixed-bottom") )
		{
			$(".promo-form").show();
			$(".promo-success, .promo-error").hide();
		}
		if ( $('input[name=\'promocode\']').val() != '' )
		{
			$.ajax({
				type: 'POST',
				url: '/promo/checkCode',
				dataType: 'json',
				data: {
					url: document.location.href,
					promocode: $('input[name=\'promocode\']').val(),
				},
				success: function(data) {
					if (data.result) {
						if ($("div").hasClass("fixed-bottom")) {
							$(".promo-form, .promo-error").hide();
							$(".promo-success").show();
							$(".priceTax").text(data.data.price);
						}
					} else {
						if ($("div").hasClass("fixed-bottom")) {
							$(".promo-form, .promo-success").hide();
							$(".promo-error").show();
						}
						setTimeout(function () {
							$(".promo-error").hide("fast", function () {
								$(".promo-form").show();
							});
						}, 3000);
					}
				}
			});
		}
		return false;
	});

});
