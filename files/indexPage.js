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
      pullDrag: true
    });
    lozad('.sl-lozad', {load: changeSlideshowImage}).observe();
    function changeSlideshowImage(el){
      var $img = $(el);
      var desktopLink = $img.data('desktop-src');
      var mobileLink = $img.data('mobile-src');
      var bgLink = '';
      if(getClientWidth() < 991) {
        bgLink = mobileLink;
      } else {
        bgLink = desktopLink;
      }
      $img.css('background-image', 'url("' + bgLink + '")');
    }
    $(window).on('resize', $.debounce(300, function(){
      $('.sl-lozad').each(function(i, el){changeSlideshowImage(el);})
    })
    );
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
    $("#categories-index .categories").owlCarousel({
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
        320:{items:1,margin: 10},
        480:{items:2,margin: 10},
        991:{items:3,margin: 10},
        1200:{items:5,margin: 10,mouseDrag: false}
      }
    });  
    // Товары на главной
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
    // Установшка ширины .nav-splitter при загрузке
    $('#news .tabs-headerList').find('.nav-splitter').css('width', $('#news .tabs-headerList .tabs-headerItem').first().outerWidth())
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