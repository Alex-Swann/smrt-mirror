var gridFuncs = require('./control-panel/grid-functions');
var jsonFuncs = require('./control-panel/json');
var frameworkFuncs = require('./control-panel/framework');

var positionKey = gridFuncs.positionKey,
    positionKey2 = gridFuncs.positionKey2,
    draggableConfig = gridFuncs.draggableConfig,
    setDragBox = gridFuncs.setDragBox,
    gridPosition = gridFuncs.gridPosition,
    getFreeLocation = gridFuncs.getFreeLocation,
    spaceFree = gridFuncs.spaceFree;
var getJSON = jsonFuncs.getJSON,
    setJSON = jsonFuncs.setJSON;
var widgetJSON = frameworkFuncs.widgetJSON;

$(document).ready(function(){

  var wjson = new widgetJSON(setJSON);
  var activeWidget = false;
  var activeLocation;

  $('.widget-check').click(function() {
    var widgetName = $(this).data('name');
    $(this).parent().toggleClass('active');
    var gridLocation = getFreeLocation(); //This can probably be used from within getJson instead of being passed around?
    getJSON(wjson.toggleActive, widgetName, gridLocation);
    setDragBox(this);
  });

  $('input:radio').click(function(){
    var widgetName = $(this).data('name');
    var setting = [this.name, $(this).val()];
    getJSON(wjson.changeSetting, widgetName, setting);
  });

  $('input:checkbox').change(function(){
    var widgetName = $(this).data('name');
    var setting = [$(this).val(), $(this).is(':checked')];
    getJSON(wjson.changeSetting, widgetName, setting);
  });

  $('input:text').change(function(e){
    e.preventDefault();
    var widgetName = $(this).data('name');
    var setting = [this.name, $(this).val()];
    getJSON(wjson.changeSetting, widgetName, setting);
  });

  $('#radioSettings').submit(function(e){
    e.preventDefault();
    var formElements = {};
    $('#radioSettings').serializeArray().forEach(function(field) { formElements[field.name] = field.value })
    var widgetName = $(this).data('name');
    var timeSetting = ["radioOnTime", formElements["radioOnTime"]];
    var stationSetting = ["radioStation", formElements["radioStation"]];
    getJSON(wjson.changeSetting, widgetName, timeSetting);
    setTimeout(function() { getJSON(wjson.changeSetting, widgetName, stationSetting); }, 100);
  });

  $('textarea').change(function(){
    var widgetName = $(this).data('name');
    var array = $(this).val().split(',');
    var setting = $.map(array, function(val){
      return val.trim();
    });
    getJSON(wjson.changeSetting, widgetName, ['sources', setting]);
  });

  $('.widget-settings-button').click(function() {
    var widgetName = $(this).data('name');
    $('.widget-settings').each(function(){
      if($(this).data('name') != widgetName) { $(this).removeClass('active'); }
    });
    $('#widget-settings-'+widgetName).toggleClass('active');
  });

  $('body').on('mousedown', '.widget-box', function(event){
    activeWidget = $(this);
    activeLocation = $(this).position();
  });

  $(document).mouseup(function(){
    if (activeWidget && spaceFree(activeWidget)) {
      var widgetName = activeWidget.data('name');
      var location = gridPosition(activeWidget.position());
      getJSON(wjson.setGridPosition, widgetName, location);
      activeWidget = false;
    }
    else if (activeWidget) {
      activeWidget.css('top', activeLocation.top);
      activeWidget.css('left', activeLocation.left);
    }
  });

  $('.widget-box').each(function(){
    $(this).draggable(draggableConfig);

    var location = {
      row: $(this).data('location-row'),
      column: $(this).data('location-column'),
      height: $(this).data('location-height'),
      width: $(this).data('location-width')
    };

    $(this).css({
      top: positionKey2[location.row] + 'px',
      left: positionKey2[location.column] + 'px'
    });

  });

});
