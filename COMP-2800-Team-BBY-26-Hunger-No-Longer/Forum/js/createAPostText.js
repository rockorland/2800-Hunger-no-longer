// CODE FROM: https://codepen.io/zabielski/pen/gPPywv
$('textarea').keyup(function() {
    
    var characterCount = $(this).val().length,
        current = $('#current'),
        maximum = $('#maximum'),
        theCount = $('#the-count');
      
    current.text(characterCount);
   
    /*This isn't entirely necessary, just playin around*/
    if (characterCount < 70) {
      current.css('color', '#666');
    }
    if (characterCount > 250 && characterCount < 500) {
      current.css('color', '#6d5555');
    }
    if (characterCount > 500 && characterCount < 750) {
      current.css('color', '#793535');
    }
    if (characterCount > 750 && characterCount < 1000) {
      current.css('color', '#841c1c');
    }
    if (characterCount > 1000 && characterCount < 1500) {
      current.css('color', '#8f0001');
    }
    
    if (characterCount >= 1500) {
      maximum.css('color', '#8f0001');
      current.css('color', '#8f0001');
      theCount.css('font-weight','bold');
    } else {
      maximum.css('color','#666');
      theCount.css('font-weight','normal');
    }
    
        
  });