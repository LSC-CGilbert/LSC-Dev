define(['jquery', 'Magento_Ui/js/modal/modal'], function($, modal){
    "use strict";
    return function industryarc()
    {
        let disableBciaAdPopup = false;
        $(document).ready(function () {
            $('#preloader').hide();
            var height = $( window ).height() - 37;
            $('.industryarc-1').attr('style','height:'+height+'px');

            if($(this).find(".industryarc-1").length == 1 && $(".bcia-slider-over-header").val() == 1) {
                $('body.cms-home header').addClass('bcia-theme-block');
                $('.industryarc-1').css({"height": height+'px',"margin-top": "37px"});
            }
            if($(this).find(".industryarc-1").length == 1) {
                if($('.industryarc-1').attr('data-background-images') == "{}") {
                    var bg_image = $(".bcia-view-url").val() +'/bcia_slider_one.png';
                    $('.industryarc-1').css({"background-image": "url("+bg_image+")"});
                }

                $.each($('.industryarc-1 .bcia-slider'), function( key, value ) {
                    if($(value).find('.pagebuilder-slide-wrapper').attr('data-background-images') == "{}") {
                        var slider_image = $(".bcia-view-url").val() +'/'+ $(value).attr('data-slide-name') + '.png';
                        $(value).find('.pagebuilder-slide-wrapper').attr("style","background-image: url("+slider_image+")");
                    }
                });
            }

            document.documentElement.style.setProperty('--bcia_primary', $('.bcia_primary_color').val());
            document.documentElement.style.setProperty('--bcia_secondary', $('.bcia_secondary_color').val());
            document.documentElement.style.setProperty('--bcia_primary_text', $('.bcia_primary_text_color').val());
            document.documentElement.style.setProperty('--bcia_secondary_text', $('.bcia_secondary_text_color').val());

            document.documentElement.style.setProperty('--bcia_hd_primary', $('.bcia_header_primary_color').val());
            document.documentElement.style.setProperty('--bcia_hd_secondary', $('.bcia_header_secondary_color').val());
            document.documentElement.style.setProperty('--bcia_hd_bg', $('.bcia_header_bg_color').val());
            document.documentElement.style.setProperty('--bcia_hd_search_bg', $('.bcia_header_search_bg_color').val());

            document.documentElement.style.setProperty('--bcia_ft_primary', $('.bcia_footer_primary_color').val());
            document.documentElement.style.setProperty('--bcia_ft_secondary', $('.bcia_footer_secondary_color').val());
            document.documentElement.style.setProperty('--bcia_ft_bg', $('.bcia_footer_bg_color').val());

            document.documentElement.style.setProperty('--bcia_prt_price', $('.bcia_product_price_color').val());
            document.documentElement.style.setProperty('--bcia_prt_bread_bg', $('.bcia_product_bread_bg_color').val());
            document.documentElement.style.setProperty('--bcia_prt_bread_text', $('.bcia_product_bread_text_color').val());
            document.documentElement.style.setProperty('--bcia_prt_sidebar_bg', $('.bcia_product_side_color').val());
            document.documentElement.style.setProperty('--bcia_prt_sidebar_text', $('.bcia_product_side_text_color').val());

            document.documentElement.style.setProperty('--bcia_prt_grid_bg', $('.bcia_product_grid_color').val());
            document.documentElement.style.setProperty('--bcia_prt_grid_text', $('.bcia_product_grid_text_color').val());
            document.documentElement.style.setProperty('--bcia_prt_detail_bg', $('.bcia_product_detail_color').val());
            document.documentElement.style.setProperty('--bcia_prt_detail_text', $('.bcia_product_detail_text_color').val());

            if ($( window ).width() < 769) {
                $(".navigation").hide();
                var nav_sidebar = '<div class="section-item-title nav-sections-item-title" data-role="collapsible"'
                +' role="tab" data-collapsible="true" aria-controls="menu.links" aria-selected="false" '+
                'aria-expanded="false" tabindex="0"><a class="nav-sections-item-switch" data-toggle="switch"'+
                'href="#menu.links">Menu</a> </div>';

                var nav_sidebar_content = '<div class="section-item-content nav-sections-item-content '+
                'nav-menu-items" id="menu.links" data-role="content" role="tabpanel" aria-hidden="false" '+
                'style="display:none"></div>';
                
                $(".section-items.nav-sections-items").append(nav_sidebar);
                $(".section-items.nav-sections-items").append(nav_sidebar_content);
                $(".section-items.nav-sections-items .nav-menu-items").append($(".navigation"));
                $(".section-items.nav-sections-items .nav-menu-items .navigation").show();
            }

            var productBgimg = $(".bcia-product-bg-img").val();
            $(".page-products .page-main").attr("style", "background-image: url("+productBgimg+")");
            $(".catalog-product-view .page-main").attr("style", "background-image: url("+productBgimg+")");
            $(".catalog-product-view .page-main .column.main").prepend($(".catalog-product-view .page-main .page-title-wrapper").prop('outerHTML'));

            if($(this).find(".cms-home").length == 1 || $(this).find(".page-products").length == 1 || $(this).find(".block.related").length == 1 || $(this).find(".block.crosssell").length == 1) {
                var parent_block = "";
                if($(this).find(".cms-home").length == 1) {
                    parent_block = ".cms-home";
                }
                if($(this).find(".page-products").length == 1) {
                    parent_block = ".page-products";
                }
                if($(this).find(".block.related").length == 1) {
                    parent_block = ".block.related";
                }
                if($(this).find(".block.crosssell").length == 1) {
                    parent_block = ".block.crosssell";
                }

                $.each($(parent_block+' .products-grid .product-item'), function( key, value ) {
                    var productId = $(value).find(".product-item-details .price-box").attr('data-product-id');

                    if($(".bcia-product-quickview").val() == 1) {
                        $(value).find(".product-item-actions").append("<div class='quickview' id='"+productId+"'></div>");
                        
                        var icon = '<button class="action-hover quick-view" title="Quick View" ><svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.8187 9.23958C26.9942 3.72865 21.4026 0 15 0C8.59737 0 3.00414 3.73125 0.181222 9.2401C0.0620767 9.47579 0 9.73617 0 10.0003C0 10.2643 0.0620767 10.5247 0.181222 10.7604C3.0057 16.2714 8.59737 20 15 20C21.4026 20 26.9958 16.2687 29.8187 10.7599C29.9379 10.5242 29.9999 10.2638 29.9999 9.99974C29.9999 9.73565 29.9379 9.47526 29.8187 9.23958V9.23958ZM15 17.5C13.5166 17.5 12.0666 17.0601 10.8332 16.236C9.59983 15.4119 8.63853 14.2406 8.07088 12.8701C7.50322 11.4997 7.35469 9.99168 7.64408 8.53682C7.93347 7.08197 8.64778 5.74559 9.69667 4.6967C10.7456 3.64781 12.0819 2.9335 13.5368 2.64411C14.9917 2.35472 16.4997 2.50325 17.8701 3.0709C19.2405 3.63856 20.4119 4.59985 21.236 5.83322C22.0601 7.06659 22.5 8.51664 22.5 10C22.5005 10.985 22.3068 11.9605 21.93 12.8707C21.5533 13.7809 21.0009 14.6078 20.3043 15.3044C19.6078 16.0009 18.7808 16.5533 17.8707 16.9301C16.9605 17.3068 15.985 17.5005 15 17.5V17.5ZM15 5C14.5537 5.00624 14.1103 5.07263 13.6817 5.1974C14.035 5.67743 14.2045 6.26817 14.1595 6.86247C14.1146 7.45677 13.8581 8.01528 13.4367 8.43672C13.0153 8.85815 12.4567 9.1146 11.8624 9.15956C11.2681 9.20452 10.6774 9.03501 10.1974 8.68177C9.92402 9.68885 9.97336 10.7563 10.3385 11.7339C10.7035 12.7114 11.366 13.5499 12.2326 14.1312C13.0992 14.7126 14.1262 15.0075 15.1692 14.9746C16.2122 14.9416 17.2186 14.5824 18.0468 13.9476C18.8749 13.3127 19.4832 12.4341 19.7858 11.4354C20.0885 10.4368 20.0704 9.36832 19.734 8.38051C19.3976 7.39269 18.7599 6.53523 17.9107 5.92881C17.0615 5.32239 16.0435 4.99754 15 5V5Z" fill="black"></path></svg></button>';
                        $(value).find(".product-item-actions .quickview").append(icon);

                        $(value).find(".product-item-details .product-item-actions .actions-primary").attr("style","display:none");
                        $(value).find(".product-item-details .swatch-opt-"+productId).attr("style","display:none");

                        var icon_cart = '<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7155 12.5H8.26453L8.52019 13.75H19.0053C19.6069 13.75 20.0528 14.3086 19.9194 14.8953L19.7039 15.8436C20.4341 16.198 20.9375 16.9464 20.9375 17.8125C20.9375 19.0313 19.9407 20.0173 18.7178 19.9998C17.5528 19.983 16.5948 19.0376 16.5633 17.8729C16.5461 17.2367 16.801 16.6601 17.2197 16.25H9.03031C9.43566 16.6471 9.6875 17.2002 9.6875 17.8125C9.6875 19.0552 8.65125 20.0559 7.3957 19.9976C6.28086 19.9458 5.37418 19.045 5.31558 17.9305C5.27035 17.0698 5.72324 16.3112 6.41133 15.9154L3.6673 2.5H0.9375C0.419726 2.5 0 2.08027 0 1.5625V0.9375C0 0.419726 0.419726 0 0.9375 0H4.94254C5.38789 0 5.77176 0.31332 5.86101 0.749609L6.21906 2.5H21.5621C22.1637 2.5 22.6096 3.05863 22.4763 3.64527L20.6297 11.7703C20.5327 12.1971 20.1532 12.5 19.7155 12.5ZM15.9375 6.5625H14.0625V5C14.0625 4.6548 13.7827 4.375 13.4375 4.375H12.8125C12.4673 4.375 12.1875 4.6548 12.1875 5V6.5625H10.3125C9.9673 6.5625 9.6875 6.8423 9.6875 7.1875V7.8125C9.6875 8.15769 9.9673 8.4375 10.3125 8.4375H12.1875V10C12.1875 10.3452 12.4673 10.625 12.8125 10.625H13.4375C13.7827 10.625 14.0625 10.3452 14.0625 10V8.4375H15.9375C16.2827 8.4375 16.5625 8.15769 16.5625 7.8125V7.1875C16.5625 6.8423 16.2827 6.5625 15.9375 6.5625Z" fill="black"></path></svg>';
                        $(value).find(".product-item-actions .actions-primary button.tocart").append(icon_cart);

                        $(value).find(".product-item-info").append('<div class="additional_card_info product-'+productId+'"></div>');

                        var additionalClose = '<div class="view_more_close_container" id="'+productId+'">'+
                            '<button class="view_more_close_btn" id="view_more_close_btn" type="button" role="button" area-lable="Close" title="Close">'+
                            '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.524505 0.524505C0.690347 0.358244 0.887359 0.226334 1.10426 0.13633C1.32116 0.046327 1.55368 0 1.78852 0C2.02335 0 2.25587 0.046327 2.47277 0.13633C2.68967 0.226334 2.88669 0.358244 3.05253 0.524505L12.5005 9.97602L21.9484 0.524505C22.1144 0.358513 22.3115 0.226841 22.5283 0.137006C22.7452 0.047172 22.9777 0.000934738 23.2124 0.000934738C23.4472 0.000934738 23.6796 0.047172 23.8965 0.137006C24.1134 0.226841 24.3104 0.358513 24.4764 0.524505C24.6424 0.690498 24.7741 0.887559 24.8639 1.10444C24.9538 1.32132 25 1.55377 25 1.78852C25 2.02326 24.9538 2.25572 24.8639 2.47259C24.7741 2.68947 24.6424 2.88653 24.4764 3.05253L15.0249 12.5005L24.4764 21.9484C24.6424 22.1144 24.7741 22.3115 24.8639 22.5283C24.9538 22.7452 25 22.9777 25 23.2124C25 23.4472 24.9538 23.6796 24.8639 23.8965C24.7741 24.1134 24.6424 24.3104 24.4764 24.4764C24.3104 24.6424 24.1134 24.7741 23.8965 24.8639C23.6796 24.9538 23.4472 25 23.2124 25C22.9777 25 22.7452 24.9538 22.5283 24.8639C22.3115 24.7741 22.1144 24.6424 21.9484 24.4764L12.5005 15.0249L3.05253 24.4764C2.88653 24.6424 2.68947 24.7741 2.47259 24.8639C2.25572 24.9538 2.02326 25 1.78852 25C1.55377 25 1.32132 24.9538 1.10444 24.8639C0.887559 24.7741 0.690498 24.6424 0.524505 24.4764C0.358513 24.3104 0.226841 24.1134 0.137006 23.8965C0.047172 23.6796 0.000934738 23.4472 0.000934738 23.2124C0.000934738 22.9777 0.047172 22.7452 0.137006 22.5283C0.226841 22.3115 0.358513 22.1144 0.524505 21.9484L9.97602 12.5005L0.524505 3.05253C0.358244 2.88669 0.226334 2.68967 0.13633 2.47277C0.046327 2.25587 0 2.02335 0 1.78852C0 1.55368 0.046327 1.32116 0.13633 1.10426C0.226334 0.887359 0.358244 0.690347 0.524505 0.524505Z" fill="black"></path></svg>'+
                            '</button>'+
                        '</div>';

                        var tocartBtn = $(value).find(".actions-primary").prop('outerHTML');
                        var productImage = $(value).find(".product-item-photo .product-image-photo").prop('outerHTML');
                                
                        $(value).find(".product-item-info .additional_card_info").append(additionalClose);
                        $(value).find(".product-item-info .additional_card_info").append("<div class='product-image'>"+productImage+"</div>");
                        $(value).find(".product-item-info .additional_card_info").append(tocartBtn);
                    }

                    $(value).find(".product-item-info .product-item-photo").removeAttr("href");

                    var wishlist = '<button class="action-hover wish-list"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.8824 12.9557L10.5021 19.3071C11.2981 20.2067 12.7019 20.2067 13.4979 19.3071L19.1176 12.9557C20.7905 11.0649 21.6596 8.6871 20.4027 6.41967C18.9505 3.79992 16.2895 3.26448 13.9771 5.02375C13.182 5.62861 12.5294 6.31934 12.2107 6.67771C12.1 6.80224 11.9 6.80224 11.7893 6.67771C11.4706 6.31934 10.818 5.62861 10.0229 5.02375C7.71053 3.26448 5.04945 3.79992 3.59728 6.41967C2.3404 8.6871 3.20947 11.0649 4.8824 12.9557Z"></path></svg></button>';
                    $(value).find(".product-item-actions .action.towishlist").append(wishlist);

                    var tocompare = '<button class="action-hover to-compare"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 19L12 11" stroke="#fff" stroke-width="4" stroke-linecap="round"></path> <path d="M17 19L17 15" stroke="#fff" stroke-width="4" stroke-linecap="round"></path> <path d="M7 19L7 6" stroke="#fff" stroke-width="4" stroke-linecap="round"></path></svg></button>';
                    $(value).find(".product-item-actions .action.tocompare").append(tocompare);
                });

                $(".quickview").on('click', function () {
                    var product_id = $(this).attr("id");
                    $(".product-item-info .additional_card_info.product-"+product_id).addClass("show_more_info");
                });

                $(".view_more_close_container").on('click', function () {
                    var product_close_id = $(this).attr("id");
                    $(".product-item-info .additional_card_info.product-"+product_close_id).removeClass("show_more_info");
                });
            }
            
            $.each($('.panel.header .header.links li a'), function( key, value ) {
                $(value).attr("title",value.innerText);
            });

            if(window.sessionStorage.getItem('bcia_ad_popup_close') == "true") {
                disableBciaAdPopup = true;
            }

            if(disableBciaAdPopup == false){
                $('.close_ad_popup .close_icon').addClass('icon_show');
                $('.bottom-nav-content').addClass('show_ad');
                $('.close_ad_popup').attr("title","Close");
            }
            if(disableBciaAdPopup == true){
                $('.close_ad_popup .info_icon').addClass('icon_show');
            }

            $(".block-search .control").addClass("bcia-search-show");
            var closeBtn = '<button type="button" class="close close-button" data-dismiss="modal" aria-label="Close" title="Close">'+
                '<span aria-hidden="true">×</span></button>';
            $(".block-search .bcia-search-show").append(closeBtn);
            var options = {
                type: 'popup',
                responsive: true,
                clickableOverlay: false,
                innerScroll: true,
                title: false,
                modalClass:'bcia-search-popup',  
                buttons: []
            };

            $('.block-search .label').on('click', function () {
                var popup = modal(options, $('.bcia-search-show'));
                $('.bcia-search-show').modal('openModal');
            });

            $(".bcia-search-show input").on('keyup', function (e) {
                var baseUrl = $(".bcia-base-url").val();
                var searchValue = $(".bcia-search-show input").val();
                if (e.key === 'Enter' || e.keyCode === 13) {
                    window.location = baseUrl+'catalogsearch/result/?q='+searchValue;
                }
            });

            $(".bcia-search-show .search-autocomplete").on('click', 'li', function (e) {
                var baseUrl = $(".bcia-base-url").val();
                var searchValue = $(this).find(".qs-option-name").text();
                window.location = baseUrl+'catalogsearch/result/?q='+searchValue;
            });

            $('.bcia-search-show .close-button').on('click', function () {
                $('.bcia-search-show').modal('closeModal');
            });
            
            $('.bcia-bottom-nav .close_ad_popup').on('click', function () {

                if($('.close_ad_popup .close_icon').hasClass('icon_show')) {
                    $('.close_ad_popup .close_icon').removeClass('icon_show');
                    $('.close_ad_popup .info_icon').addClass('icon_show');
                    $('.bottom-nav-content').removeClass('show_ad');
                    $('.close_ad_popup').attr("title","AD");
                    window.sessionStorage.setItem('bcia_ad_popup_close', true);
                } else if($('.close_ad_popup .info_icon').hasClass('icon_show')) {
                    $('.close_ad_popup .info_icon').removeClass('icon_show');
                    $('.close_ad_popup .close_icon').addClass('icon_show');
                    $('.bottom-nav-content').addClass('show_ad');
                    $('.close_ad_popup').attr("title","Close");
                }
            });
        });
    }
});