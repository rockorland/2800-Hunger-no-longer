// triger the Easter egg after users input "hungernolonger"
$(function() {
    var egg = new Egg();
    egg.addCode("h,u,n,g,e,r,n,o,l,o,n,g,e,r", function() {


            jQuery('#egg').fadeIn(500, function() {
                window.setTimeout(function() {
                    jQuery('#egg').hide();
                }, 10000);
            });
        })
        .addHook(function() {
            jQuery('#egg').show();
            console.log("Hook called for: " + this.activeEgg.keys);
        }).listen();
})