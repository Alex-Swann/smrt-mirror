$(document).ready(function(){

  var DEFAULT_CITY = 'london';

  $('#current-city').ready(function() {
    var city = DEFAULT_CITY;
    var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var app_id = '&appid=';
    var key = 'f5ceec348230deb171e07ab0c5a85862';
    var units = '&units=metric';
    $.get(api + city + app_id + key + units, function(data) {
    $('#current-temperature').text(data.main.temp);
    });
  });

  $('#current-city').change(function() {
    var city = $('#current-city').val();
    var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var app_id = '&appid=';
    var key = 'f5ceec348230deb171e07ab0c5a85862';
    var units = '&units=metric';
    $.get(api + city + app_id + key + units, function(data) {
    $('#current-temperature').text(data.main.temp);
    });
  });

});
