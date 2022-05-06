// CODE FROM: https://codepen.io/zabielski/pen/gPPywv
$('textarea').keyup(function() {
    
    var characterCount = $(this).val().length,
        current = $('#current'),
        maximum = $('#maximum'),
        theCount = $('#the-count');
      
    current.text(characterCount);
   
    /*This isn't entirely necessary, just playin around*/
    if (characterCount < 20) {
      current.css('color', '#666');
    }
    if (characterCount > 40 && characterCount < 50) {
      current.css('color', '#6d5555');
    }
    if (characterCount > 50 && characterCount < 60) {
      current.css('color', '#793535');
    }
    if (characterCount > 70 && characterCount < 80) {
      current.css('color', '#841c1c');
    }
    if (characterCount > 80 && characterCount < 100) {
      current.css('color', '#8f0001');
    }
    
    if (characterCount >= 100) {
      maximum.css('color', '#8f0001');
      current.css('color', '#8f0001');
      theCount.css('font-weight','bold');
    } else {
      maximum.css('color','#666');
      theCount.css('font-weight','normal');
    }
    
        
  });