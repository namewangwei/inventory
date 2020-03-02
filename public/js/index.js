$(function () {
    $('select').select2({
      minimumResultsForSearch: -1
    })
    $('#testStatus2').select2({
      minimumResultsForSearch: 5
    })
  
     var tag = window.location.href.split('posts/')[1]
  
    $('#'+tag).addClass('active')
    $('#nav a').click(function () {
      $(this).addClass('active').parent().siblings().find('a.active').removeClass('active')
    })
    $(document).keypress(function(event){  
              if(event.keyCode ==13){  
                  $(".btn").eq(0).trigger("click");  
              }  
          })
         
    $('#ls').show()
    var authorCode = $('#authorCode').val();
    switch(authorCode) {
      case '1':         
        $('#rk').show();
        $('#ck').show();
        break;
      case '2':      
        $('#jc').show();
        $('#shjc').show();
        break;
      case '3':      
        $('#gd').show();          
        break;
      case '4':     
        $('#a').show();          
        break;
      case '5':        
        $('#b').show();         
        break;
      case '6':      
        $('#c').show();         
        break;
      case '7':       
        $('#shsq').show();         
        break;
      case '8':       
        $('#wx').show();         
        break;
    default: 
        $('.haha').show();
        break;
    }
   
  })