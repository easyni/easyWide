(function ($) {
  $.fn.easyWide = function (option) {
    var options = {
      myContainer: false,
      alignement: 'center'
    };
    var myOptions;
    var myLastWidth = null;
    if (option)
      myOptions = $.extend(options, option);
    else
      myOptions = options;

    var checkIe = function(){
      var myNav = navigator.userAgent.toLowerCase();
      return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    };

    var setCssFull = function (container, object) {
        var src = object.attr("src");
        var postion = ""
        switch (myOptions.alignement) {
          case 'center':
            postion = "50% 50%";
            break;
          case 'top':
            postion = "50% 0";
            break;
          case 'bottom':
            postion = "50% 100%";
            break;
          case 'left':
            postion = "0 50%";
            break;
          case 'right':
            postion = "100% 50%";
            break;
          default:
            postion = "50% 50%";
        }
        container.css({
          backgroundSize:"cover",
          backgroundPosition:postion,
          backgroundImage:"url("+src+")"
        })
        object.hide()
    }

    var setFullScreen = function (container, object) {
      object.attr('style', '');
      object.css({ 'position': 'absolute' });
      var containerHeight = container.height(), containerWidth = container.width(), customWindowRatio = container.width() / container.height(), contentHeight = object.height(), contentwidth = object.width(), contentRatio = object.width() / object.height();
      var backgroundHeight, backgroundLeft, backgroundTop, backgroundWidth;
      if (customWindowRatio > contentRatio) {
        backgroundWidth = containerWidth;
        backgroundHeight = Math.round(backgroundWidth / contentRatio);
      } else {
        backgroundHeight = containerHeight;
        backgroundWidth = Math.round(backgroundHeight * contentRatio);
      }
      switch (myOptions.alignement) {
        case 'center':
          backgroundTop = (containerHeight - backgroundHeight) * 0.5;
          backgroundLeft = (containerWidth - backgroundWidth) * 0.5;
          break;
        case 'top':
          backgroundTop = 0;
          backgroundLeft = (containerWidth - backgroundWidth) * 0.5;
          break;
        case 'bottom':
          backgroundTop = containerHeight - backgroundHeight;
          backgroundLeft = (containerWidth - backgroundWidth) * 0.5;
          break;
        case 'left':
          backgroundTop = (containerHeight - backgroundHeight) * 0.5;
          backgroundLeft = 0;
          break;
        case 'right':
          backgroundTop = (containerHeight - backgroundHeight) * 0.5;
          backgroundLeft = containerWidth - backgroundWidth;
          break;
        default:
          backgroundTop = (containerHeight - backgroundHeight) * 0.5;
          backgroundLeft = (containerWidth - backgroundWidth) * 0.5;
      }
      container.css({
        'position': 'relative',
        'overflow': 'hidden'
      });
      object.css({
        'position': 'absolute',
        'height': backgroundHeight,
        'left': backgroundLeft,
        'top': backgroundTop,
        'width': backgroundWidth
      });
    };

    $(this).each(function (i) {
      var $this = $(this);
      var gloabalContainer;
      var myTimer;
      var activate = true;
      if (myOptions.myContainer)
        gloabalContainer = $this.parents(myContainer);
      else
        gloabalContainer = $this.parent();
      $this.load(function () {
        if (activate) {
          if ( checkIe () &&  checkIe() < 9) {
            setFullScreen(gloabalContainer, $this);
          }
        }
      });
      if ( checkIe () &&  checkIe() < 9) {
        setFullScreen(gloabalContainer, $this);
      }else {
        setCssFull(gloabalContainer, $this);
      }
      $(window).resize(function () {
        clearTimeout(myTimer);
        myTimer = setTimeout(function () {
          if (activate) {
            if ( checkIe () &&  checkIe() < 9) {
              setFullScreen(gloabalContainer, $this);
            }
          }
        }, 50);
      });
      var publicfunctions = {
        manualResize: function () {
          if (activate) {
            if ( checkIe () &&  checkIe() < 9) {
              setFullScreen(gloabalContainer, $this);
            }
          }
        },
        destroy: function () {
          activate = false;
          if ( checkIe () &&  checkIe() < 9) {
            $this.attr('style', '');
          }else {
            gloabalContainer.attr('style', '');
            $this.show()
          }
        },
        reload: function () {
          activate = true;
          if ( checkIe () &&  checkIe() < 9) {
            setFullScreen(gloabalContainer, $this);
          } else {
            setCssFull(gloabalContainer, $this);
          }
        }
      };
      $this.data('easyWide', publicfunctions);
    });
  };
}(jQuery));
