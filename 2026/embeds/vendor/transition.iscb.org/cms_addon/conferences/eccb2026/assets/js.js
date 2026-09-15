jQuery(window).load(function() {
    console.log('load');
    bindShowToggle3();

    jQuery(".hide").on("click",function(event){
        console.log('hide it');
        jQuery(this).parent().next().hide(500);
    } );
    jQuery(".hide").on("click",function(event){
        jQuery(this).parent().next().hide(500);
    } );
    jQuery(".showToggle").on("click",function(event){
        console.log('madeit');
        jQuery(this).parent().next().next().toggle(500);
    } );
    jQuery(".showToggle2").on("click",function(event){
        console.log('madeit');
        jQuery(this).parent().next().toggle(500);
    } );
    //For the AKES page
    jQuery(".toggleMyHiddenSpans").on("click",function(event){
        console.log('madeit');
        //jQuery(this).parent().next().toggle(500);
        jQuery(this).hide(100);
        jQuery("span.myHidden").toggle(500);
    } );
});

// This is needed to be re-bound after ajax is loaded
function bindShowToggle3(){
    jQuery(".showToggle3").on("click",function(event){

        console.log('show it');
        $displayed = jQuery(this).html();

        if ($displayed == 'Show'){
            jQuery(this).html("Hide");
            // jQuery(this).removeClass("show").addClass("hide");
            jQuery(this).parent().next().show(500);
        }else{
            jQuery(this).html("Show");
            jQuery(this).parent().next().hide(500);
			//$("iframe").contents().find("#slidewrap").hide();

        }

    } );
}