Lib = {
	
	/**
	 * AJAX requester
	 * 
	 * @param  {string}  url  Requested URL
	 * @param  {object}  params  Sending parameters
	 * @param  {closure}  callback  Callback function
	 * @param  {object}  ajaxParams  Additional AJAX params
	 */
	request: function (url, params, callback, ajaxParams) {
		var self = this;
		
		// If callback is set as the second argument
		if (typeof params === 'function') {
			var callback = params;
			var params = {};
		}

		$.ajax($.extend({
			url: url,
			jsonpCallback: 'callback',
			type: 'POST',
			cache: false,
			data: params,
			success: function (response) {
				if (callback)
					self.hadleAjaxResponse(response, callback, ajaxParams);
			},
			error: function (xhr) {
				if (xhr.responseJSON) {
					self.hadleAjaxResponse(xhr.responseJSON, callback, ajaxParams);
				} else if (xhr.status !== 200) {
					console.error(xhr);
					alert('Произошла ошибка');
				}
			}
		}, (ajaxParams || {})));
	},
	
	hadleAjaxResponse: function(response, callback, ajaxParams) {
		if (!ajaxParams || !ajaxParams.dataType || ajaxParams.dataType === 'json') {
			var jsob = typeof response === 'string'
					? $.parseJSON(response)
					: response;
			callback(jsob.result, jsob.data || jsob.message);
		} else {
			callback(response);
		}
	},
};