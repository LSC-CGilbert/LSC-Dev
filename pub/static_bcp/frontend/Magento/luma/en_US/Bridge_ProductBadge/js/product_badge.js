require([
    'jquery',
    'mage/url',
    'prototype'
],  function(jQuery,url){
    url.setBaseUrl(BASE_URL);
    var AjaxUrl = url.build('productbadge/badges/index');
    jQuery( document ).ready(function() {
        jQuery('.prdt_id').each(function(){
           var product_id = jQuery(this).val().trim();
            if(product_id){
                jQuery.ajax({
                    context: '#ajaxresponse',
                    url: AjaxUrl,
                    type: "POST",
                    data: {'product_id': product_id},
                }).done(function (data) {

                    if(data.status){
                        if(data.content){
                            if(data.is_image){
                                jQuery('#badge_image_'+product_id).css('display', 'block');
                                jQuery("#badge_image_img_"+product_id).attr("src",data.content);
                                if(data.tooltip){
                                    jQuery("#tooltiptext_img_"+product_id).css('display', 'block');
                                    jQuery("#tooltiptext_img_"+product_id).text(data.tooltip);
                                }
                            }else{
                                jQuery('#badge_text_'+product_id).css('display', 'block');
                                jQuery("#badge_text_txt_"+product_id).text(data.content);
                                if(data.tooltip){
                                    jQuery("#tooltiptext_text_"+product_id).css('display', 'block');
                                    jQuery("#tooltiptext_text_"+product_id).text(data.tooltip);
                                }
                            }
                            if(data.view_count > 0){
                                jQuery('#count_views_'+product_id).css('display', 'block');
                                jQuery('#view_count_'+product_id).text(data.view_count);
                            }
                            if(data.end_time){
                               // jQuery("#count_down_"+product_id).text(data.end_time);
                                jQuery('#count_down_'+product_id).css('display', 'block');
                                var currentTime = data.current_time;
                                var localTime = new Date().getTime();
                                var timeDistance = localTime - currentTime;
                                var x = setInterval(function() {
                                var date = data.end_time;
                                var endTime = new Date(date).getTime(); 
                                var now = new Date().getTime();

                                  var distance = endTime - now;

                                  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                                  jQuery("#count_down_time"+product_id).text(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
                                }, 1000);
                            }
                            return true;
                        }
                    }
                });
            }
        });
         
    });
});