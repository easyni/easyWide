$.fn.easyWyde = function(option){

  var options = {
    myContainer:false,
    alignement:'center',
  }

  var myOptions;

  if(option)
    myOptions = $.extend(options, option);
  else
   myOptions = options;

  var setFullScreen =  function (container,object) {

      object.attr("style","")

      var containerHeight = container.height(),
          containerWidth = container.width(),
          customWindowRatio = container.width() / container.height(),
          contentHeight = object.height(),
          contentwidth = object.width(),
          contentRatio = object.width() / object.height();

      var backgroundHeight,
          backgroundLeft,
          backgroundTop,
          backgroundWidth;

      if (customWindowRatio > contentRatio) {
        backgroundWidth = containerWidth;
        backgroundHeight = Math.round(backgroundWidth / contentRatio);
      } else {
        backgroundHeight = containerHeight;
        backgroundWidth = Math.round(backgroundHeight * contentRatio);
      }

      switch(myOptions.alignement){
        case 'center':
          backgroundTop = (containerHeight - backgroundHeight) * .5;
          backgroundLeft = (containerWidth - backgroundWidth) * .5;
        break
        case 'top':
          backgroundTop = 0;
          backgroundLeft = (containerWidth - backgroundWidth) * .5;
        break
        case 'bottom':
          backgroundTop = (containerHeight - backgroundHeight);
          backgroundLeft = (containerWidth - backgroundWidth) * .5;
        break
        case 'left':
          backgroundTop = (containerHeight - backgroundHeight) * .5;
          backgroundLeft = 0;
        break
        case 'right':
          backgroundTop = (containerHeight - backgroundHeight) * .5;
          backgroundLeft = (containerWidth - backgroundWidth);
        break
        default:
          backgroundTop = (containerHeight - backgroundHeight) * .5;
          backgroundLeft = (containerWidth - backgroundWidth) * .5;
      }

      container.css({
        'position':'relative',
        'overflow':'hidden',
      });

      object.css({
        'position':'absolute',
        'height': backgroundHeight,
        'left': backgroundLeft,
        'top': backgroundTop,
        'width': backgroundWidth
      });
  }

  $(this).each(function(i){

    var $this = $(this);
    var gloabalContainer;
    var myTimer;

    if(myOptions.myContainer)
      gloabalContainer = $this.parents(myContainer);
    else
      gloabalContainer = $this.parent();

    $this.load(function() {
      setFullScreen(gloabalContainer,$this);
      //console.log($this)
    });

    setFullScreen(gloabalContainer,$this);

    $(window).resize(function(){
      clearTimeout(myTimer);
      myTimer = setTimeout(function(){
        setFullScreen(gloabalContainer,$this)
      },50)
    });


    var publicfunctions = {
      manualResize:function(){
        setFullScreen(gloabalContainer,$this)
      },
    }

    $this.data("easyWide",publicfunctions)

  });
}
