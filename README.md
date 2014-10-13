easyWide
========

cropping pictures plugin

========

##Documentation

###Installation

~~~
<img src="my_src.jpg" alt="" class="widePic">

<script type="javascript">
  $(".widePic").easyWide();
</script>
~~~

That will take by default the parent element size and crop the img in consequences.

###Options

~~~
myContainer: false | jQuery Object
~~~
The reference size to use for the cropping img.

~~~
alignement: "center" | string | "top", "bottom", "left", "right", "center"
~~~

The alingment of the picture.

========

###Ex:
~~~
<img src="my_src.jpg" alt="" class="widePic">

<script type="javascript">
  $(".widePic").easyWide({
    myContainer:$('body'),
    alignement:'top',
  });
</script>
~~~
That will take the size of the body and resize your pic in consequences, and that will be align to the top.
