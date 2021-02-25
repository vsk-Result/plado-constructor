$(function() {
	var bookFunc = function() {
		$('#m1-form-book').show();
		$('#overlay-popup-m1').show();
		$.ajax({
			type: 'post',
			url: '/BookCollector/ajaxWriteStat',
			dataType: 'json',
			data: { visitor: 1},
			async: true,
			cache: false,
			success: function(data) {}
		});
	};
	
	setTimeout(bookFunc, 20000);
	
	$(document).on('click', '#book_submit', function() {
		if (!$('#book_id').val()){
			alert('Выберите книгу');
		}
		if (!$('#book_email').val()){
			alert('Укажите Ваш email');
		}
		$.ajax({
			type: 'post',
			url: '/BookCollector/ajaxBookContactCollector',
			dataType: 'json',
			data: { 
				email: $('#book_email').val(), 
				book_id: $('#book_id').val()
			},
			async: true,
			cache: false,
			success: function(data) {
				if (data.result) {
					$('#form_book_holder').html('<div style="font-size:20px; padding-top: 15px;">Для получения Вашей книги, подтвердите, пожалуйста, Ваш e-mail</div>');
				} else{
					$('#form_book_holder').html('<div style="font-size:20px; padding-top: 15px;">Извините, но на этот e-mail уже высылалась выбранная книга</div>');
				}
			}
		}); 
		return false;
	});

	$('.button-book').click(function() {
		$('.button-book').css('background', 'linear-gradient(to bottom, #00c0e9, #008bd7)');
		$('.button-book').html('Выбрать');
		$(this).css('background', 'linear-gradient(to top, #00c0e9, #008bd7)');
		$(this).html('Выбрана');
		$('#book_id').val($(this).attr('book_id'));
	});
});