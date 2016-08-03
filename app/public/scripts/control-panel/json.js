;(function(exports){

  var getFreeLocation = require('./grid-functions').getFreeLocation;

  var getJSON = function(callback, widgetName) {

    var location = getFreeLocation();

    $.ajax({
      url: "/api/widgets",
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        callback(data, widgetName, location);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err.toString());
      }.bind(this)
    });
  };

  var setJSON = function(data) {
    $.ajax({
      url: "/api/widgets",
      dataType: 'json',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(data),
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err.toString());
      }.bind(this)
    });
  };
  exports.getJSON = getJSON;
  exports.setJSON = setJSON;

})(this);
