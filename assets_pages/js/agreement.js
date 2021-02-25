$(function() {
	var reCaptchaPublicKey = '6Le3930UAAAAAGrPO-7xQAAP87pP9cgc6OLR-EJn';
    var $form = $('.js-modal-abuse form');
    var $btnSubmit = $form.find('.btn[type="submit"]');
    var captchaDone = false;

    var inputError = function($input, message) {
        var $row = $input.parents('.form-group');
        var $errorContainer = $row.find('.error-message');

        $row.addClass('has-error');

        if (!$errorContainer.length) {
            $errorContainer = $('<div class="error-message"></div>');
            $row.append($errorContainer);
        }

        $errorContainer.html(message);
    };

    // Check all required fields not empty to activate submit button
    var checkFormComplete = function(captchaDoneFromCallback) {
        var completelyFilled = true;

        $('.js-modal-abuse [required]').each(function() {
            if (!$(this).val())
                completelyFilled = false;
        });

        if (captchaDoneFromCallback)
            captchaDone = true;

        if (completelyFilled && (!$('#abuse_captcha').length || captchaDone)) {
            $btnSubmit.attr('disabled', false)
                .removeClass('btn-secondary')
                .addClass('btn-success');
        } else {
            $btnSubmit.attr('disabled', true)
                .removeClass('btn-success')
                .addClass('btn-secondary');
        }
    };

    var initCaptcha = function(remove) {
        if (remove) {
            $('#abuse_captcha').remove();
        } else if ($('#abuse_captcha').length) {
            captchaDone = false;
            grecaptcha.reset();
        } else {
            $form.find('.modal-body').append('<div id="abuse_captcha" class="form-group"></div>');
            grecaptcha.ready(function() {
                captchaDone = false;
                grecaptcha.render('abuse_captcha', {
                    sitekey: reCaptchaPublicKey,
                    callback: function () {
                        captchaDone = true;
                        checkFormComplete(true);
                    }
                });
            });
        }
        checkFormComplete();
    };

    var clearAbuseForm = function() {
        $('.js-modal-abuse').modal('hide');
        $('.js-modal-abuse-sent').modal('show');

        $('.js-modal-abuse').find('input[name!="csrf_token"], textarea').val('');
        $('.js-modal-abuse').find('.has-error').removeClass('has-error');
        $('.js-modal-abuse').find('.error-message').remove();
        $('.js-abuse-phone-desc').show();
        $btnSubmit.attr('disabled', true)
            .removeClass('btn-success')
            .addClass('btn-secondary');

        $form.find('.asterix').css('visibility', 'visible');
    }

    if ($form.data('has-captcha'))
        initCaptcha();

    $form.find('input, textarea').keyup(function() {
        var $asterix = $(this).next('.asterix');
        if (!$asterix.length)
            return;

        $asterix.css('visibility', $(this).val() ? 'hidden' : 'visible');

        checkFormComplete();
    });

    $('.js-abuse-phone').keyup(function() {
        if ($(this).val()) {
            $('.js-abuse-phone-desc').hide();
        } else {
            $('.js-abuse-phone-desc').show();
        }
    });

    $form.submit(function(e) {
        e.preventDefault();
        $.post($form.attr('action'), $(this).serialize(), function(json) {
            if (!json)
                return alert('Произошла ошибка');

            // Success
            if (json.result) {
                clearAbuseForm();
                initCaptcha();
                return;
            }

            // Errors / captcha / redirects
            if (json.data) {
                if (typeof json.data !== 'string') {
                    if ('redirect' in json.data) {
                        return document.location.href = json.data.redirect;
                    } else if ('captcha' in json.data) {
                        return initCaptcha();
                    }

                    for (var input in json.data) {
                        var message = json.data[input];
                        var $input = $form.find('[name="' + input + '"]');
                        if ($input.length)
                            inputError($input, message);
                    }
                } else {
                    alert(json.data);
                }
            }
        }).fail(function() {
            alert('Произошла ошибка');
        });
    });

});