;(function(exports){

  var positionKey = { 0: 0, 205: 1, 410: 2 };
  var positionKey2 = { 0: 0, 1: 205, 2: 410 };
  var draggableConfig = { snap: ".grid-box",
                          snapMode: "inner",
                          snapTolerance: 103,
                          containment: "#grid-container",
                          cursor: "pointer" };

  var setDragBox = function(element)  {
    var location = getFreeLocation();
    var widgetName = $(element).data('name');
    if($(element).parent().hasClass('active')) {
      $("#grid-container").append("<div id='widget-box-"+widgetName+
        "' class='widget-box widget-box-"+widgetName+
        "' style='top:"+positionKey2[location.row]+"px; "+
        " left:"+positionKey2[location.column]+"px"+
        "' data-name='"+widgetName+"'>"+widgetName+"</div>");
      $("#widget-box-"+widgetName).draggable(draggableConfig);
    } else {
      $("#widget-box-"+widgetName).remove();
    }
  };

  var gridPosition = function(location) {
    //defaulting to width/height of 1 for now
    return {  row: positionKey[location.top],
              column: positionKey[location.left],
              height: 1,
              width: 1 };
  };

  var getFreeLocation = function()  {
    //maybe return {1,1,1,1} if there are no widget boxes?
    var positions = { 0: [], 1: [], 2:[] };
    $('.widget-box').each(function(){
      positions[positionKey[$(this).position().top]].push(positionKey[$(this).position().left]);
    });
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        if(!positions[i].includes(j)) {
          return {
            row: i,
            column: j,
            height: 1,
            width: 1
          };
        }
      }
    }
  };

  //getFreeLocation is invoked, looks at the page and returns an object with info on an empy cell
  //

  var spaceFree = function(widget)  {
    var canMove = true;
    $('.widget-box').each(function(){
      if(($(this).data('name') !== widget.data('name')) &&
         (widget.position().top === $(this).position().top) &&
         (widget.position().left === $(this).position().left)) {
        canMove = false;
      }
    });
    return canMove;
  };
  exports.setDragBox = setDragBox;
  exports.gridPosition = gridPosition;
  exports.getFreeLocation = getFreeLocation;
  exports.spaceFree = spaceFree;
  exports.positionKey = positionKey;
  exports.positionKey2 = positionKey2;
  exports.draggableConfig = draggableConfig;
})(this);
