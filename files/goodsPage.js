// Скрипты для карточки товара
function goodspage() {
    // Стилизация селектов
    $('[name="form[properties][]"]').styler()
  
    // Скролл по ссылкам
    $('.scroll-link').on('click', function(evt){
      evt.preventDefault();
      var href = $(this).attr('href');
      var tabNumber = href.slice(-1);
    
      tabSwitch(tabNumber);
      $('html, body').animate({scrollTop : jQuery(href).offset().top}, 700);
    })
  
    // Фильтр отзывов
    $('.goodsDataOpinionListNavigateTop > a').click(function(){
      var $btn = $(this);
      var $reviews = $btn.parent().next('.goodsDataOpinionList').find('.bord');
      
      $btn.addClass('active').siblings().removeClass('active');
      
      if($btn.hasClass('goodOpinions')){
        $reviews.filter('.good').fadeIn();
        $reviews.filter('.bad').hide();
      }
      else if($btn.hasClass('badOpinions')){
        $reviews.filter('.good').hide();  
        $reviews.filter('.bad').fadeIn();
      }else{
        $reviews.fadeIn()
      }
    })
  
    // Добавление отзыва о товаре. Рейтинг
    if(typeof($('.goodsDataOpinionRating').rating) == "function" ) {
      $('.goodsDataOpinionRating input').rating({
        split: 2,
        required: true
      });
    }
  
    // Список отзывов о товаре. Ссылка на отображение формы для добавление отзыва о товаре
    $('.goodsDataOpinionShowAddForm').click(function(){
      if(0 == $('#goodsDataOpinionAddBlock:visible').length) {
        $('#goodsDataOpinionAddBlock').show('blind');
        $('html, body').animate({scrollTop : jQuery('.goodsDataOpinionAddForm').offset().top}, 400);
      } else {
        $('#goodsDataOpinionAddBlock').hide('blind');
        $('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 60}, 400);
        return false;
      }
    });
  
    // Добавление отзыва о товаре. кнопка reset скрывающая форму добавления отзыва о товаре
    $('.goodsDataOpinionFormReset').click(function(){
      $('#goodsDataOpinionAddBlock').hide('blind');
      $('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 60}, 400);
      return false;
    });
  
    // Иконка для обновления изображение капчи
    $('.goodsDataOpinionCaptchaRefresh').click(function(){
      RefreshImageAction(this,1,1);
      $('.goodsDataOpinionCaptchaImg').attr('src',$('.goodsDataOpinionCaptchaImg').attr('src')+'&rand'+Math.random(0,10000));
      return false;
    });
  
    // С этим товаром смотрят
    $(".related-views .products-grid").owlCarousel({
      margin: 10,
      loop: false,
      rewind: true,
      lazyLoad: true,
      nav: false,
      dots: false,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      navContainer: '.related-views .navigation',
      navText: [ , ],      
      navText: ["<i class='slideshow-nav fal fa-angle-left' aria-hidden='true'></i>", "<i class='slideshow-nav fal fa-angle-right' aria-hidden='true'></i>"],  
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      responsiveClass: true,
      responsiveRefreshRate: 100,
      responsive: {
        0:{items:1},
        320:{items:1},
        480:{items:1},
        540:{items:2},
        768:{items:3},
        992:{items:3},
        1200:{items:5}
      },
      onInitialized: changeNavBtn
    });
    // Сопутствующие товары
    $(".related-goods .products-grid").owlCarousel({
      margin: 10,
      loop: false,
      rewind: true,
      lazyLoad: true,
      nav: false,
      dots: false,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      navContainer: '.related-goods .navigation',
      navText: [ , ],      
      navText: ["<i class='slideshow-nav fal fa-angle-left' aria-hidden='true'></i>", "<i class='slideshow-nav fal fa-angle-right' aria-hidden='true'></i>"],
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      responsiveClass: true,
      responsiveRefreshRate: 100,
      responsive: {
        0:{items:1},
        320:{items:1},
        480:{items:1},
        540:{items:2},
        768:{items:3},
        992:{items:3},
        1200:{items:5}
      },
      onInitialized: changeNavBtn
    });
    function changeNavBtn(event){
      var items = event.item.count;
      var size = event.page.size;
      var $nav = $(event.target).prev('.block-title').find('.navigation');
      
      if (items > size){
        $nav.show();
      } else {
        $nav.hide();
      }    
    }
  
  }
  
  // Скрипты для изображения товара
  function goodsImage() {
  // Другие изображения товара
  $(function(){
    var owl = $(".thumblist-box .owl-carousel");
    // Показывать\Скрывать навигацию
    owl.on('initialized.owl.carousel changed.owl.carousel', function(event) {
      var items = event.item.count;
      var size = event.page.size;
      if (items > size){
        $('.thumblist-box.navigation .prev, .thumblist-box.navigation .next').show();
      } else {
        $('.thumblist-box.navigation .prev, .thumblist-box.navigation .next').hide();
      }
    });
    owl.owlCarousel({
      margin: 15,
      loop: false,
      rewind: true,
      lazyLoad: false,
      nav: false,
      dots: false,
      autoplay: false,
      autoplayHoverPause: true,
      smartSpeed: 500,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      responsiveClass: true,
      responsiveRefreshRate: 100,
      responsive: {
        0:{items:1},
        320:{items:2},
        480:{items:3},
        640:{items:4},
        768:{items:4},
        992:{items:3},
        1200:{items:4}
      }
    });
    // Кнопки навигации
    $('.thumblist-box.navigation .next').click(function(event) {
      event.preventDefault();
      owl.trigger('next.owl.carousel');
    });
    $('.thumblist-box.navigation .prev').click(function(event) {
      event.preventDefault();
      owl.trigger('prev.owl.carousel');
    });
  });
  
  // Увеличение изображения при нажатии изображение
  $(function() {
    $('a[rel="gallery"]').fancybox();
    // Увеличение изображение при клике на него и открытие галереи изображений
    $('.goodsImageZoom a, .thumblist a').click(function(){
      if($(this).closest('.thumblist').length) {
        $('.goodsImageZoom').attr('data', $(this).attr('data'));
        return(true);
      }
      $('.goodsImageList a[data="' + $('.goodsImageZoom').attr("data") + '"]').trigger('click');
      return(false);
    });
    // Увеличение при нажатии на кнопку
    $("#zoom1").click(function(event){
      event.preventDefault();
      $(".goodsImageZoom a").click();
    });
  });
  
  }
  // Инициализация табов на странице товара
function initTabs() {
$('.tabs').find('.nav-splitter').css('width', $('.tabs .tabs-item').first().outerWidth())  
// Блок в котором находятся табы
var tabBlock = $('.product-tabs');
if(!tabBlock.length) {
    return false;
}
// По умолчанию делаем отметку о том что активного таба не найдено
var isFind = 0;
tabBlock.find('.tabs a').each(function(i){
    // Если нашёлся активный там
    if($(this).hasClass('active')) {
    // Инициализируем найденный таб
    $(this).click();
    // Ставим отметку, о том что не нужно инициализировать первый таб на странице
    isFind = 1;
    }
});
// Если не найдено ни одного таба с отметкой о том что он активен
if(!isFind) {
    // Ставим активным первый таб на странице.
    var tab = $('ul.tabs > li > a').attr('id').slice(-1);
    tabSwitch(tab, true);
}
// Проверяет хэш и если по нему была открыта вкладка, то эта функция автоматически откроет её.
checkTabHash();
// Если текущий адрес страницы предполагает добавление отзыва
if('#goodsDataOpinionAdd' == document.location.hash) {
    $('#goodsDataOpinionAddBlock').show();
    $('html, body').animate({scrollTop : jQuery('.goodsDataOpinion').offset().top - 160}, 400);
} else if (document.location.hash.indexOf('show_tab_')  !== -1){
    var id = document.location.hash.slice(-1);
    
    if($('#tab_' + id).length) {
    $('html, body').animate({scrollTop : jQuery('#tab_' + id ).offset().top - 10}, 400);  
    }
}
// Биндим изменение хэша - проверка какой таб нужно открыть.
$(window).bind('hashchange', function() { checkTabHash(); });
}

// Проверяет хэш, переданый пользователем и открывает соответствующий раздел
function checkTabHash() {
// Определяем текущий хэш страницы
var hash = window.location.hash.substr(1);
if(hash == 'goodsDataOpinionAdd') {
    hash = 'show_tab_4';
}
if(!hash.length || hash.indexOf('show_tab_') == -1) {
    return false;
}
// Открываем тот таб, который был указан в hash-е
tabSwitch(hash.replace("show_tab_", ''))
}

// Выбор вкладки на странице товара
function tabSwitch(nb, noScroll) {
var tabBlock = $('.product-tabs');
tabBlock.find('.tabs a').removeClass('active');
tabBlock.find('div.tab-content').hide();
$('#tab_' + nb).addClass('active');
$('#content_' + nb).show();
var navPosition = $('#tab_' + nb).parent().position().left;
var navWidth =  $('#tab_' + nb).parent().outerWidth();
$('.tabs').find('.nav-splitter').css({'left': navPosition + 'px', 'width': navWidth})

if('#goodsDataOpinionAdd' != document.location.hash && !noScroll) {
    // Записываем в хэш информацию о том какой таб сейчас открыт, для возможности скопировать и передать ссылку с открытым нужным табом
    document.location.hash = "#show_tab_" + nb;  
}
}
  
  // Функция собирает свойства в строку, для определения модификации товара
  function getSlugFromGoodsDataFormModificationsProperties(obj) {
    var properties = new Array();
    $(obj).each(function(i){
      properties[i] = parseInt($(this).val());
    });
    return properties.sort(function(a,b){return a - b}).join('_');
  }
   
  var 
    // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
    goodsDataProperties = $('form.goodsDataForm select[name="form[properties][]"]'),
    // Запоминаем блоки с информацией по модификациям, для ускорения работы
    goodsDataModifications = $('div.goodsDataMainModificationsList');
    
  // Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
  function updateVisibility (y) {
    // Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
    goodsDataProperties.each(function(j){
      // Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
      if( j != y ) {
        // Проходим по всем значениям текущего свойства модификации товара
        $(this).find('option').each(function(){
          // Записываем временный массив свойств, которые будем использовать для проверки существования модификации
          var checkProperties = new Array();
          $(goodsDataProperties).each(function(i){
            checkProperties[i] = parseInt($(this).val());
          });
          // Пытаемся найти модификацию соответствующую выбранным значениям свойств
          checkProperties[j] = parseInt($(this).attr('value'));
          // Собираем хэш определяющий модификацию по свойствам
          slug = checkProperties.sort(function(a,b){return a - b}).join('_');
          // Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
          if(!goodsDataModifications.filter('[rel="'+slug+'"]').length) {
           $(this).attr('disabled', true);
          // Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
          } else {
            $(this).attr('disabled', false);
          }
        });
      }
    });
  }
  // Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
  // Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
  updateVisibility (0);
  // Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
  updateVisibility (1);

  // Изменение цены товара при изменении у товара свойства для модификации
  goodsDataProperties.each(function(){
    $(this).on('change', function(){
      var slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties),
        modificationBlock             = $('.goodsDataMainModificationsList[rel="'+slug+'"]'),
        modificationId                = parseInt(modificationBlock.find('[name="id"]').val()),
        modificationArtNumber         = modificationBlock.find('[name="art_number"]').val(),
        modificationPriceNow          = parseInt(modificationBlock.find('[name="price_now"]').val()),
        modificationPriceNowFormated  = modificationBlock.find('.price_now_formated').html(),
        modificationPriceOld          = parseInt(modificationBlock.find('[name="price_old"]').val()),
        modificationPriceOldFormated  = modificationBlock.find('.price_old_formated').html(),
        modificationRestValue         = parseFloat(modificationBlock.find('[name="rest_value"]').val()),
        modificationDescription       = modificationBlock.find('.description').html(),
        modificationMeasureId         = parseInt(modificationBlock.find('[name="measure_id"]').val()),
        modificationMeasureName       = modificationBlock.find('[name="measure_name"]').val(),
        modificationMeasureDesc       = modificationBlock.find('[name="measure_desc"]').val(),
        modificationMeasurePrecision  = modificationBlock.find('[name="measure_precision"]').val(),
        modificationIsHasInCompareList= modificationBlock.find('[name="is_has_in_compare_list"]').val(),
        goodsModificationId           = $('.goodsDataMainModificationId'),
        goodsPriceNow                 = $('.goodsDataMainModificationPriceNow'),
        goodsPriceOld                 = $('.goodsDataMainModificationPriceOld'),
        goodsAvailable                = $('.goodsDataMainModificationAvailable'),
        goodsAvailableTrue            = goodsAvailable.find('.available-true'),
        goodsAvailableFalse           = goodsAvailable.find('.available-false'),
        goodsAvailableAddCart         = $('.add-to-form .add-to-cart'),
        goodsAvailableQty             = $('.add-to-form .wrap-qty'),
        goodsArtNumberBlock           = $('.goodsDataMainModificationArtNumber'),
        goodsArtNumber                = goodsArtNumberBlock.find('span'),
        goodsCompareAddButton         = $('.goodsDataCompareButton.add'),
        goodsCompareDeleteButton      = $('.goodsDataCompareButton.delete'),
        goodsModDescriptionBlock      = $('.goodsDataMainModificationsDescriptionBlock'),
        goodsModEmpty      = $('.goodsDataMainModificationEmpty');
       
      // Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
      if(modificationBlock.length) {
        // Цена товара
        goodsPriceNow.html(modificationPriceNowFormated);
        // Старая цена товара
        if(modificationPriceOld > modificationPriceNow) {
          goodsPriceOld.html(modificationPriceOldFormated);
        } else {
          goodsPriceOld.html('');
        }
        // Есть ли товар есть в наличии
        if(modificationRestValue>0) {
          goodsAvailableTrue.show();
          goodsAvailableFalse.hide();
          goodsAvailableAddCart.show();
          goodsAvailableQty.show();
          goodsModEmpty.hide();
        // Если товара нет в наличии
        } else {
          goodsAvailableTrue.hide();
          goodsAvailableFalse.show();
          goodsAvailableAddCart.hide();
          goodsAvailableQty.hide();
          goodsModEmpty.show();
        }
        // Если товар есть в списке сравнения
        if(modificationIsHasInCompareList>0) {
          goodsCompareAddButton.hide();
          goodsCompareDeleteButton.show();
        // Если товара нет в списке сравнения
        } else {
          goodsCompareAddButton.show();
          goodsCompareDeleteButton.hide();
        }
        // Покажем артикул модификации товара, если он указан
        if(modificationArtNumber.length>0) {
          goodsArtNumberBlock.show();
          goodsArtNumber.html(modificationArtNumber);
        // Скроем артикул модификации товара, если он не указан
        } else {
          goodsArtNumberBlock.hide();
          goodsArtNumber.html('');
        }
        // Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
        if(modificationDescription.length > 0) {
          goodsModDescriptionBlock.show().html('<div>' + modificationDescription + '</div>');
        } else {
          goodsModDescriptionBlock.hide().html();
        }
        // Идентификатор товарной модификации
        goodsModificationId.val(modificationId);
      } else {
        // Отправим запись об ошибке на сервер
        sendError('no modification by slug '+slug);
        alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
      }
    });
  });