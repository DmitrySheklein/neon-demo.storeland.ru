// Функции для главной страницы
function indexPage() {
    // Слайдер на главной
    $('#slideshow .owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      rewind: true,
      lazyLoad: true,
      nav: true,
      navText: ["<i class='slideshow-nav fal fa-angle-left' aria-hidden='true'></i>", "<i class='slideshow-nav fal fa-angle-right' aria-hidden='true'></i>"],
      dots: true,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 500,
      dotsSpeed: 400,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      onChange: function(){
        lozad('.sl-lozad', {load: changeSlideshowImage}).observe();
      }
    });
    lozad('.sl-lozad', {load: changeSlideshowImage}).observe();

    function changeSlideshowImage(el){
      var $img = $(el);
      var desktopLink = 'desktop-src';
      var mobileLink = 'mobile-src';
      var bgLink = '';
      var webpSupport = (!!$img.data('webp')) && support_format_webp();
      var prefix = (webpSupport) ? 'webp-' : '';

      if(getClientWidth() < 991) {
        bgLink = $img.data(prefix + mobileLink);  
      } else {
        bgLink = $img.data(prefix + desktopLink);  
      }
      
      if(bgLink){
        $img.css('background-image', 'url("' + bgLink + '")');
      }
    }
    $(window).on('resize', $.debounce(300, 
      function(){
      $('.sl-lozad').each(function(i, el){changeSlideshowImage(el);})
      })
    );
    function support_format_webp(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))&&0==e.toDataURL("image/webp").indexOf("data:image/webp")}
    support_format_webp()

    // Преимущества
    $("#features .features-list").owlCarousel({
      items: 4,
      loop: false,
      rewind: true,
      lazyLoad: false,
      nav: false,
      dots: false,
      autoplay: false,
      smartSpeed: 500,
      touchDrag: true,
      pullDrag: true,
      responsiveClass: true,
      responsiveRefreshRate: 100,
      responsive: {
        0:{items:1},
        320:{items:1,margin: 5},
        480:{items:2,margin: 10},
        991:{items:3,margin: 10},
        1200:{items:4,margin: 30,mouseDrag: false}
      }
    });  
    // Категории на главной
    $("#categories-index .owl-carousel").owlCarousel({
      loop: false,
      rewind: true,
      lazyLoad: false,
      nav: false,
      dots: false,
      autoplay: false,
      smartSpeed: 500,
      touchDrag: true,
      pullDrag: true,
      navContainer: '#categories-index .navigation',
      navText: [, ],
      navText: ["<i class='slideshow-nav fal fa-angle-left' aria-hidden='true'></i>", "<i class='slideshow-nav fal fa-angle-right' aria-hidden='true'></i>"],      
      responsiveClass: true,
      responsiveRefreshRate: 100,
      responsive: {
        0:{items:1},
        320:{items:1,margin: 10},
        370:{items:2,margin: 10},
        480:{items:2,margin: 10},
        991:{items:3,margin: 10},
        1200:{items:5,margin: 10}
      }
    });  
    // Товары на главной
    if(goodsIndexTemplateView === 'tabs'){
      (function(element){
          var $element = $(element);
          var itemNav = $('.item-nav', $element);
          var itemContent = $('.products-container', $element);    
          itemNav.on('click', function(){
            var $this = $(this);
            var navPosition = $this.position().left
            var navWidth = $this.outerWidth();
            if($this.hasClass('tab-nav-actived')) return false;
            itemNav.removeClass('tab-nav-actived');
            $this.addClass('tab-nav-actived');
            var itemActive = '.' + $this.data('href');
            itemContent.hide()
            $(itemActive, $element).fadeIn()
            $element.find('.nav-splitter').css({'left': navPosition + 'px', 'width': navWidth})
          });
        $element.find('.nav-splitter').css('width', itemNav.first().outerWidth())
      })('#producttabs');
      //Функция показать больше 
      $('.products-button-load').on('click', function () {
        var $btn = $(this);
  
        if($btn.hasClass('_loaded')){
          $btn.closest('.products-container').find('.products-grid .item').filter('._visible').removeClass('_visible').hide();
          $btn
            .removeClass('_loaded')
            .find('span')
            .text('Показать все')
        }else{ 
          $btn.closest('.products-container').find('.products-grid .item').not(':visible').addClass('_visible').show();
          $btn
            .addClass('_loaded')
            .find('span')    
            .text('Скрыть')
        }
      })
    }
    if(goodsIndexTemplateView === 'carousel'){

      $(".products-container").each(function () {
        var $navBlock = $(this).find('.navigation');

        $(this).find('.products-grid').owlCarousel({
          margin: 10,
          loop: false,
          rewind: true,
          lazyLoad: true,
          nav: true,
          dots: false,
          autoplay: false,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          navContainer: $navBlock,
          navText: [, ],
          navText: ["<i class='slideshow-nav fal fa-angle-left' aria-hidden='true'></i>", "<i class='slideshow-nav fal fa-angle-right' aria-hidden='true'></i>"],
          smartSpeed: 500,
          mouseDrag: true,
          touchDrag: true,
          pullDrag: true,
          responsiveClass: true,
          responsiveRefreshRate: 100,
          responsive: {
            0:{items:1},
            320:{items:2},
            480:{items:2},
            540:{items:2},
            768:{items:3},
            992:{items:3},
            1200:{items:5}
          },          
          onInitialized: changeNavBtn
        });        
      })

      function changeNavBtn(event){
        var items = event.item.count;
        var size = event.page.size;
        var $nav = $(event.target).siblings('.block-title').find('.navigation');
        
        if (items > size){
          $nav.show();
        } else {
          $nav.hide();
        }
      }      
    }
    // Установшка ширины .nav-splitter при загрузке
    setTimeout(function(){
      $('#news .tabs-headerList').find('.nav-splitter').css('width', $('#news .tabs-headerList .tabs-headerItem').first().outerWidth())  
    }, 300);    
    // Клик по табам в блоке новости
    $('#news .tabs-headerList').on('click', '.tabs-headerLink', function(event){
      event.preventDefault()
      
      var $link = $(this);
      var $parent = $link.parent('.tabs-headerItem');
      var tabId = $link.data('href');
      
      if ($parent.hasClass('active')){
        return;
      };
  
      preloadShow($('#news .tabs-body .preloader'));
      
      var $splitter = $link.closest('.tabs-headerList').find('.nav-splitter');
      $splitter.css('width', $link.outerWidth()).css('left', $link.position().left)
      $parent.addClass('active').siblings().removeClass('active')
      $('#news .tabs-body .tabs-content').removeClass('active').filter('[id="' + tabId +'"]').addClass('active');
      
      preloadHide($('#news .tabs-body .preloader'))
    })
    // Слайдер новостей (все новости без группировки)
    $("#news .all.owl-carousel").owlCarousel({
      margin: 10,
      loop: false,
      rewind: true,
      lazyLoad: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      autoHeight: false,
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      responsiveClass:true,
      responsive:{
        0:{items:1},
        767:{items:2},
        768:{items:3},
        992:{items:3},
        1199:{items: 5}
      }
    });
    // Слайдер новостей (группы)
    $("#news .owl-carousel").owlCarousel({
      margin: 10,
      loop: false,
      rewind: true,
      lazyLoad: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      autoHeight: false,
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      onRefresh: function (event){
        var $preloader = $(event.target).closest('.tabs-body').find('.preloader');
        
        preloadHide($preloader)
      },
      responsiveClass:true,
      responsive:{
        0:{items:1},
        767:{items:2},
        768:{items:3},
        992:{items:3},
        1199:{items:5}
      }
    });
  
  }