// Metoffice API
var icons = require('./icons').icons;
var api = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/352409?res=3hourly&key=b821346b-d530-4054-a2e6-2fee05048742';
var textContainer = $('#weather-widget .text');
var iconContainer = $('#weather-widget .icon');

// N = Night, D = Day
var weatherType = {
	'NA':	'Not available',
	'0': 'Clear night',
	'1': 'Sunny day',
	'2': 'Partly cloudy (N)',
	'3': 'Partly cloudy (D)',
	'4': 'Not used',
	'5': 'Mist',
	'6': 'Fog',
	'7': 'Cloudy',
	'8': 'Overcast',
	'9': 'Light rain shower (N)',
	'10': 'Light rain shower (D)',
	'11': 'Drizzle',
	'12': 'Light rain',
	'13': 'Heavy rain shower (N)',
	'14': 'Heavy rain shower (D)',
	'15': 'Heavy rain',
	'16': 'Sleet shower (N)',
	'17': 'Sleet shower (D)',
	'18': 'Sleet',
	'19': 'Hail shower (N)',
	'20': 'Hail shower (D)',
	'21': 'Hail',
	'22': 'Light snow shower (N)',
	'23': 'Light snow shower (D)',
	'24': 'Light snow',
	'25': 'Heavy snow shower (N)',
	'26': 'Heavy snow shower (D)',
	'27': 'Heavy snow',
	'28': 'Thunder shower (N)',
	'29': 'Thunder shower (D)',
	'30': 'Thunder'
};


(function(exports){
  $.support.cors = true;

  function ajaxCall(){
		'use strict';

    $.ajax({
	    url: api,
	    success: function(data) {
	    	this.printWeather(data.SiteRep);
	    },
	    printWeather: function(data) {
	    	var parameters = data.Wx.Param;
	      var values = data.DV.Location.Period[0].Rep[1];

				textContainer.html(values[parameters[3].name] + '&deg;<sup>c</sup> ' + weatherType[values[parameters[8].name]]);
        iconContainer.html(icons[values[parameters[8].name]]);
      },
      error: function(err){
        console.log(err);
      }
	  });
	}

  function init() {
  	'use strict';

  	ajaxCall();

  	// Reload info every 5 mins:
  	setInterval(ajaxCall, 300000);
  }

  exports.init = init;

})(this);
