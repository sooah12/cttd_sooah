<script>
$(function(){
  var includes1 = $('[data-include1="header"]');
  var includes2 = $('[data-include2="sideView"]');
  var includes3 = $('[data-include3="footer"]');
  jQuery.each(includes1, function(){
     $(this).load('header.html');
  });
  jQuery.each(includes2, function(){
    $(this).load('sideView.html');
  });
  jQuery.each(includes3, function(){
    $(this).load('footer.html');
  });
});
</script>