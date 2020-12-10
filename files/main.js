/*
* lazy loads elements with default selector as '.lozad'
*/
$(function(){
  lozad().observe();
})
// Hover карусель изображений
$(function(){
  $(".mouseHoverImgCarousel").HoverMouseCarousel().on('click', function (e) {if(getClientWidth() <= 991) {e.preventDefault()}});
})
// Fancybox default
$.fancybox.defaults.lang = "ru";
$.fancybox.defaults.i18n = {
    ru: {
        CLOSE: "Закрыть",
        NEXT: "Вперёд",
        PREV: "Назад",
        ERROR: "Контент не может быть загружен. <br/> Пожалуйтста попробуйте ещё раз.",
        DOWNLOAD: "Скачать",
        SHARE: "Поделиться",
        ZOOM: "Увеличить"
    }
};
$.fancybox.defaults.wheel = false;
$.fancybox.defaults.smallBtn = true;
$.fancybox.defaults.animationEffect = 'fade';
$.fancybox.defaults.transitionEffect = false;
$.fancybox.defaults.hideScrollbar = true;
$.fancybox.defaults.toolbar = false;
$.fancybox.defaults.infobar = false;
$.fancybox.defaults.touch = false;
$.fancybox.defaults.buttons = [
    "close"
]
/*
* Noty default
*/ 
Noty.overrideDefaults({
  layout: "bottomRight",
  theme: 'metroui',
  timeout: "3000",
  killer: true,
  progressBar: true,
  animation: {
    open: 'animated bounceInRight', 
    close: 'animated bounceOutRight'
  }
});  
// Возвращает правильное окончание для слова
function genWordEnd(num, e, m, mm) {
  // Если забыли указать окончания
  if(typeof (e) == "undefined") { e = ''; }
  if(typeof (m) == "undefined") { e = 'а'; }
  if(typeof (mm) == "undefined"){ e = 'oв'; }
  // Если передали пустую строку, вместо цифры
  if(0 == num.length) { num = 0; }
  // Превращаем цифру в правильный INT
  num = GetSum(num).toString();
  // Получаем последний символ цифры
  ch1 = num.substring(num.length-1);
  // Получаем последний символ цифры
  ch2 = num.length == 1 ? 0 : num.substring(num.length-2, num.length-1);
  // Если последняя цифра - 1, вернем единственное число
  if(ch2!=1 && ch1==1)               {return e;}
  // Если последняя цифра - от 2 до 4х , вернем множественное чило из массива с индексом 2
  else if(ch2!=1 && ch1>1 && ch1<=4) {return m;}
  // Если последняя цифра - от 5 до 0 , вернем множественное чило из массива с индексом 3
  else if(ch2==1 || ch1>4 || ch1==0) {return mm;}
}

// Считает сумму  33 599,65 + 2000 - 1910-41,6
function GetSum(val,precision) {
  if(typeof (precision) == "undefined" || precision < 0) { precision = 0; }
  // Возводим в степень точности 10 для округления
  var p = Math.pow(10,precision);  
  try {return Math.round(parseFloat(eval(val.toString().replace(/\s/gi, "").replace(/,/gi, ".")))*p)/p;} catch (e) {return 0;}
}

// Форматирует цену
function number_format(n,e,t,r){var i=n,a=e,o=function(n,e){var t=Math.pow(10,e);return(Math.round(n*t)/t).toString()};i=isFinite(+i)?+i:0,a=isFinite(+a)?Math.abs(a):0;var u,d,f="undefined"==typeof r?",":r,h="undefined"==typeof t?".":t,l=a>0?o(i,a):o(Math.round(i),a),s=o(Math.abs(i),a);s>=1e3?(u=s.split(/\D/),d=u[0].length%3||3,u[0]=l.slice(0,d+(0>i))+u[0].slice(d).replace(/(\d{3})/g,f+"$1"),l=u.join(h)):l=l.replace(".",h);var c=l.indexOf(h);return a>=1&&-1!==c&&l.length-c-1<a?l+=new Array(a-(l.length-c-1)).join(0)+"0":a>=1&&-1===c&&(l+=h+new Array(a).join(0)+"0"),l}
// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000 
function addSpaces(nStr){
  if(typeof nStr == 'number'){
	  nStr = String(nStr);
  }

  return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}  
// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}

// Функция определения ширины экрана пользователя
function getClientWidth() {return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;}

// Работа с cookie файлами. 
// Получение переменной из cookie
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Установка переменной в cookie
function setCookie(name, value, options) {
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) { 
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];    
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

// Удаление переменной из cookie
function deleteCookie(name, options ) {
  options = options || {};
  options.expires = -1;
  setCookie(name, "", options)
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var 
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.html(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel 
  LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
  if(cnt>13) { return false; }
  $(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
  num = (num==6)?0:num;
  setTimeout(function(){RefreshImageAction(img, num+1, cnt+1);}, 50);
}

// Показать пароль 
function showPass(){
    $('.showPass').on('click', function(){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    return false;
  });
}
$(function(){
  showPass()
});
// Галочка политики
$(function () {
  $('.pp-checkbox').on('change', function () {
    $(this).closest('form').find('[type=submit]').toggleClass('_disabled')
  })
})
// Основные функции
function mainFunctions() {
  $(function(){
    // Вызов функции редиректа при обратном звонке
    // Возвращаем пользователя на страницу с которой был сделан обратный звонок
    $('.callbackredirect').val(document.location.href);
      
    // Добавление товара в корзину
    $(document).on('click', '.add-cart', function() {
      var $btn  = $(this);
      $btn.addClass('_loading')
      $btn.find('span').html('<i class="fal fa-spinner fa-spin"></i>')
  
      var form = $(this).closest('form');
      if ($(this).hasClass('_cart-page')) {
        form.attr('rel', 'cartPage')
      }      
      if ($(this).hasClass('quick')) {
        form.attr('rel', 'quick');
      } else {
        var rel = form.attr('rel');
        if (rel) {
          form.attr('rel', rel.replace('quick', ''));
        }
      }
      form.trigger('submit');
      return (false);
    })
    // 
    hoverAnimBtn();
    // Слайдер в подвале
    $('#footer .block.collapse .title').on('click', function(){
      if(getClientWidth() <= 991){
        $(this).toggleClass('active').next('.block-content').slideToggle();
      }
    })
    // Раскрытие корзины на сайте
    $(document).on('click', function (e) {
      var $this  = $(e.target)
      if(!$this.closest('.header-tools').length){
          $('.header-tools, .header-toolsCol, .header-toolsLink').removeClass('_active')
        }
    })
    $('.header-toolsLink').on('click', function(e){
      if(getClientWidth() < 992){
        return (true)
      }
      e.preventDefault();
      if($(this).hasClass('_active')) {
        $('.header .header-tools').removeClass('_active');
        $(this).removeClass('_active')
        return
      }
      $('.header .header-tools').addClass('_active')

      $('.header-tools').find('.header-toolsLink').removeClass('_active')
      $(this).addClass('_active')

      $('.header-tools').find('.dropdown').removeClass('_active')
      $(this).parent().find('.dropdown').addClass('_active')

      $('.header-tools').find('.header-toolsCol').removeClass('_active')
      $(this).closest('.header-toolsCol').addClass('_active')
    })


  tippy('.selectBox', {
    theme: 'material',
    onShow(instance) {
      var $link = $(instance.reference);
      var titleName = $link.attr('title');

      $link.removeAttr('title');
      $link.attr('data-title', titleName);
      instance.setContent($link.attr('data-title'))
      // console.log(titleName);
    }
  });

  // Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
  $("#myform, .feedbackForm, .clientForm, .goodsDataOpinionAddForm, .callbackForm").each(function(){
    $(this).validate({
      rules: {
        reg_name: "required"
      }
    })
  });

  // Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
  // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });

  });
}

// Запуск блока Вы смотрели
function viewed(){
  // Вы смотрели
  $("#viewed .viewed-items").owlCarousel({
    items: 5,
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
      0:{items:1,margin: 5},
      320:{items:1,margin: 5},
      480:{items:2,margin: 10},
      1200:{items:5,margin: 10}
    }
  });  
}
function tippyViewBtn() {
  $(function () {
    tippy('.view-mode-btn', {
      theme: 'material',
      onShow(instance) {
        var $link = $(instance.reference);
        var titleName = $link.attr('title');
        $link.removeAttr('title');
        $link.attr('data-title', titleName);
        instance.setContent($link.attr('data-title'));
      }
    });     
  }) 
}

// Hover эффект на кнопках
function hoverAnimBtn() {
  $(function () {
    if(getClientWidth() <= 991) {
      $(".add-cart, .button").find('.hover-anim').remove();
      return;
    };
    $(".add-cart, .button")
    .find('.hover-anim').remove()
    .end()
    .append('<i class="hover-anim"></i>')
    .on("mouseenter", function(e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this)
        .find(".hover-anim")
        .css({ top: relY, left: relX });
    })
    .on("mouseout", function(e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this)
        .find(".hover-anim")
        .css({ top: relY, left: relX });
    });    
  })  
}
$(window).on('resize', $.debounce(300, hoverAnimBtn))
// Добавление товара в корзину
function AddCart() {
  $('.goodsDataForm, .goodsToCartFromCompareForm, .goodsListForm').off('submit').on('submit', function() {    
    // Выносим функции из шаблонов
    if ($(this).attr('rel') === 'quick') {
      quickOrder(this);
      return (false);
    }
    
    $('#header .cart').addClass('have-items');
    $('.cart .count').animate({opacity: 0,display: "none"},500);
    $('.cart .count').animate({display: "inline",opacity: 1} , 500 );
    
    // Находим форму, которую отправляем на сервер, для добавления товара в корзину
    var formBlock = $($(this).get(0));
    
      // Проверка на существование формы отправки запроса на добавление товара в корзину
      if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
        alert('Не удалось найти форму добавления товара в корзину');
        return false;
      }
      
      // Получаем данные формы, которые будем отправлять на сервер
      var formData = formBlock.serializeArray();
      // Сообщаем серверу, что мы пришли через ajax запрос
      formData.push({name: 'ajax_q', value: 1});
      // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
      //formData.push({name: 'fast_order', value: 1});
      // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
      $.ajax({
        type: "POST",
        cache: false,
        url: formBlock.attr('action'),
        data: formData,
        success: function(data) {
          var $btn = $('.add-cart._loading').removeClass('_loading').find('span').html("В корзину");

          var msg = $(data).find('.notify').html();
          var type = $(data).find('.notify').hasClass('good') ? 'success' : 'error'
          var iconTemplate = ('success' == type) ? '<i class="fal fa-check"></i>' : '<i class="fal fa-times"></i>';

          if('success' == type){$.fancybox.close();};
          // Если есть функция, которая отображает сообщения пользователю
          if(typeof(Noty) == "function") {
            new Noty({
              text: '<div class="noty__content">'+ iconTemplate + '<div class="noty__content-text">' + msg + '</div>' +'</div>',
              type: type,
              layout: "bottomRight",
              timeout: "2000",
              animation: {
                  open: 'animated fadeInRight', 
                  close: 'animated fadeOutRight',
                  easing: 'swing',
                  speed: 500                  
              }              
            }).show();
          }
          $btn.removeClass('_added').find('span').html('Купить');

          if(formBlock.attr('rel') === 'cartPage' && type === 'success'){
            document.location.href = '/cart'
          }          

          // Обновляем данные корзины
          $('.header .cart .count').html($(data).filter('#newCartCount').html());
          $('.header .cart .dropdown').html($(data).filter('#newCartData').html());
          // Анимация на кнопках
          hoverAnimBtn()
        }
      });
    return false;
  });
}
// Добавление в сравнение и избранное
function Addto() {
  $(function(){
    tippy('.add-compare, .add-wishlist', {
      theme: 'material',
      onShow(instance) {
        var $link = $(instance.reference);
        var title = $link.hasClass('added') ? $link.data('del-tooltip') : $link.data('add-tooltip');

        $link.removeAttr('title');        
        instance.setContent(title);
      }
    });
  })
  // Добавление/удаление товара на сравнение/избранное через ajax
  $('.add-compare').off('click').on('click', function(){
    // Объект ссылки, по которой кликнули
    var 
      a = $(this)
      ,addUrl = a.attr('data-action-add-url')
      ,delUrl = a.attr('data-action-delete-url')
      ,addTitle = a.attr('data-action-add-title')
      ,delTitle = a.attr('data-action-delete-title')
      ,isAdd = a.attr('data-action-is-add')
      ,pName = a.attr('data-prodname')
      ,pImage = a.attr('data-prodimage')
      ,pPrice = a.attr('data-mod-id-price')
      ,pUrl = a.attr('data-produrl')
      ,pDataid = a.attr('data-id')
      ,pDataprice = a.attr('data-mod-id')
      ,pDataGoodsid = a.attr('data-goodsid')
      ,aText = a.parent().find('.add-compare')
      ,addTooltip = a.attr('data-add-tooltip')
      ,delTooltip = a.attr('data-del-tooltip')
      requestUrl = a.attr('href')
    ;
    var flag = 0;
    $('#compare-items li.item').each(function(){   
      if($(this).attr('data-id') == pDataid){  
      flag = 1;
      }
      if(flag == 1){
        $(this).remove();
        return false;
      }
      return flag;
    });
    $('.compare #compare-items .empty').hide();
    $('.compare #compare-items .actions').show();
    
    // Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
    if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
      requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsDataMainModificationId').val());
    }
    
    // Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
    if(addUrl && delUrl) {
      $.ajax({
        type : "POST",
        dataType: 'json',
        cache : false,
        url : requestUrl,
        data : {
          'ajax_q': 1
        },
        success: function(data) {
          if(flag == 0){   
            $('#compare-items .compare-items-list').prepend(
                "<li class=\"item\" data-id=\"" + pDataid +  "\">" +
                    "<a data-href=\"" + delUrl + "?id=" + pDataprice + "\" data-goods-mod-id=\"" + pDataprice + "\" class=\"remove item-remove\" title=\"Убрать товар из списка сравнения\" onclick=\"removeFromCompare($(this))\"></a>" +
                    "<a href=\"" + pUrl + "\" title=\"" + pName + "\" class=\"product-image\">" + 
                      "<img src=\"" + pImage + "\" alt=\"" + pName + "\" class=\"goods-image-icon\">" +
                    "</a>" + 
                    "<div class=\"product-details\">" + 
                      "<p class=\"product-name\">" + 
                        "<a href=\"" + pUrl + "\" title=\"" + pName + "\">" + pName + "</a>" +
                      "</p>" + 
                      "<span class=\"price RUB\" data-price=\"" + pPrice + "\"><span><span class=\"num\">" + addSpaces(String(pPrice)) + "&nbsp;</span></span></span>"+
                    "</div>"+
                "</li>"
              );
          }
          if('ok' == data.status) {
            if(isAdd == 1) {
              var 
                from = addUrl
                ,to = delUrl
                ,newIsAddStatus = 0
                ,newTitle = delTitle ? delTitle : ''
                ,newTooltip = delTooltip ? delTooltip : ''
              ;
              a.addClass('added');
            } else {
              var 
                from = delUrl
                ,to = addUrl
                ,newIsAddStatus = 1
                ,newTitle = addTitle ? addTitle : ''
                ,newTooltip = addTooltip ? addTooltip : ''
              ;
              a.removeClass('added');
            }
            
            // Если указано, что изменилось число товаров на сравнении
            if(typeof(data.compare_goods_count) != 'undefined') {
              // Блок информации о том, что есть товары на сравнении
              var sidecount = $('.compare .count');
              // Если на сравнении больше нет товаров
              // Указываем информацию о новом количестве товаров на сравнении
              // Блок обновления списка сравнения в каталога
              sidecount.animate({opacity: 0,display: "none"},500,function(){
              sidecount.text(data.compare_goods_count);                 
                if(data.compare_goods_count > 0){
                  $('.compare').addClass('have-items');
                  $('.compare #compare-items .empty').hide();
                  $('.compare #compare-items .actions').show();              
                }else{
                  $('.compare').removeClass('have-items');
                  $('.compare #compare-items .empty').show();
                  $('.compare #compare-items .actions').hide();               
                }
              }).animate({display: "inline",opacity: 1} , 500 );
            }
            
            // Обновляем ссылку, на которую будет уходить запрос и информацию о ней
            a.attr('href', a.attr('href').replace(new RegExp(from), to))
             .attr('title', newTitle)
             .attr('data-tooltip', newTooltip)
             .attr('data-action-is-add', newIsAddStatus);
          }
          
          var msgType = ('ok' == data.status) ? 'success' : 'error';
          var message = ('ok' == data.status) ? data.message.replace('сравнения', '<a href="/compare" class="underline">сравнения</a>') : data.message;
          var iconTemplate = ('ok' == data.status) ? '<i class="fal fa-check"></i>' : '<i class="fal fa-times"></i>';
          // Если есть функция, которая отображает сообщения пользователю
          if(typeof(Noty) == "function") {
            new Noty({
              text: '<div class="noty__content">'+ iconTemplate + '<div class="noty__content-text">' + message + '</div>' +'</div>',
              type: msgType,
              layout: "bottomRight",
              timeout: "2000",
              animation: {
                  open: 'animated fadeInRight', 
                  close: 'animated fadeOutRight',
                  easing: 'swing',
                  speed: 500                  
              }              
            }).show();                
          }

        }
      });
      return false;
    }
  });

  // Добавление/удаление товара на сравнение/избранное через ajax
  $('.add-wishlist').off('click').on('click', function(){
    // Объект ссылки, по которой кликнули
    var 
      a = $(this)
      ,addUrl = a.attr('data-action-add-url')
      ,delUrl = a.attr('data-action-delete-url')
      ,addTitle = a.attr('data-action-add-title')
      ,delTitle = a.attr('data-action-delete-title')
      ,isAdd = a.attr('data-action-is-add')
      ,aText = a.parent().find('.add-wishlist')
      ,pName = a.attr('data-prodname')
      ,pImage = a.attr('data-prodimage')
      ,pUrl = a.attr('data-produrl')
      ,pDataid = a.attr('data-id')
      ,pDataprice = a.attr('data-mod-id')
      ,pPrice = a.attr('data-mod-id-price')
      ,pDataGoodsid = a.attr('data-goodsid')
      ,addTooltip = a.attr('data-add-tooltip')
      ,delTooltip = a.attr('data-del-tooltip')
      requestUrl = a.attr('href')
    ;
    var flag = 0;
    $('#favorites-items li').each(function(){       
      if($(this).attr('data-id') == pDataid){  
      flag = 1;
      }
      if(flag == 1){
        $(this).remove();
        return false;
      }
      return flag;
    });

    
    // Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
    if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
      requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsDataMainModificationId').val());
    }
    
    // Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
    if(addUrl && delUrl) {
      $.ajax({
        type : "POST",
        dataType: 'json',
        cache : false,
        url : requestUrl,
        data : {
          'ajax_q': 1
        },
        success: function(data) {
          if(data.status != 'error'){
            $('.favorites #favorites-items .empty').hide();
            $('.favorites #compare-items .actions').show();            
          }
          
          if(flag == 0 && data.status != 'error'){   
            $('#favorites-items .favorites-items-list').prepend(
              "<li class=\"item\" data-id=\"" + pDataid +  "\">" + 
                "<a data-href=\"" + delUrl + "?id=" + pDataprice + "\" data-goods-mod-id=\"" + pDataprice + "\" class=\"remove item-remove\" title=\"Убрать товар из списка сравнения\" onclick=\"removeFromFavorites($(this))\"></a>"+
                "<a href=\"" + pUrl + "\" title=\"" + pName + "\" class=\"product-image\">"+
                  "<img src=\"" + pImage + "\" alt=\"" + pName + "\" class=\"goods-image-icon\">"+
                "</a>"+
                "<div class=\"product-details\">"+
                  "<p class=\"product-name\">"+
                    "<a href=\"" + pUrl + "\" title=\"" + pName + "\">" + pName + "</a>"+
                  "</p>"+
                  "<span class=\"price RUB\" data-price=\"" + pPrice + "\"><span><span class=\"num\">" + addSpaces(String(pPrice)) + "&nbsp;</span></span></span>"+
                "</div>"+
              "</li>"
            );
          }
          if('ok' == data.status) {
            if(isAdd == 1) {
              var 
                from = addUrl
                ,to = delUrl
                ,newIsAddStatus = 0
                ,newTitle = delTitle ? delTitle : ''
                ,newTooltip = delTooltip ? delTooltip : ''
              ;
              a.addClass('added');
            } else {
              var 
                from = delUrl
                ,to = addUrl
                ,newIsAddStatus = 1
                ,newTitle = addTitle ? addTitle : ''
                ,newTooltip = addTooltip ? addTooltip : ''
              ;
              a.removeClass('added');
            }
            
            // Если указано, что изменилось число товаров на сравнении
            if(typeof(data.favorites_goods_count) != 'undefined') {
              // Блок информации о том, что есть товары на сравнении
              var sidecount = $('.favorites .count');
              // Если на сравнении больше нет товаров
              // Указываем информацию о новом количестве товаров на сравнении
              // Блок обновления списка сравнения в каталога
              sidecount.animate({opacity: 0,display: "none"},500,function(){
              sidecount.text(data.favorites_goods_count);                 
                if(data.favorites_goods_count > 0){
                  $('.favorites').addClass('have-items');
                  $('.favorites #favorites-items .empty').hide();
                  $('.favorites #favorites-items .actions').show();                     
                }else{
                  $('.favorites').removeClass('have-items');
                  $('.favorites #favorites-items .empty').show();
                  $('.favorites #favorites-items .actions').hide();                   
                }
              }).animate({display: "inline",opacity: 1} , 500 );
            }
            
            // Обновляем ссылку, на которую будет уходить запрос и информацию о ней
            a.attr('href', a.attr('href').replace(new RegExp(from), to))
             .attr('title', newTitle)
             .attr('data-tooltip', newTooltip)
             .attr('data-action-is-add', newIsAddStatus);
          }
          
          var msgType = ('ok' == data.status) ? 'success' : 'error';
          var message = ('ok' == data.status) ? data.message.replace('избранное', '<a href="/user/favorites" class="underline">избранное</a>') : data.message;
          var iconTemplate = ('ok' == data.status) ? '<i class="fal fa-check"></i>' : '<i class="fal fa-times"></i>';
          // Если есть функция, которая отображает сообщения пользователю
          if(typeof(Noty) == "function") {
              new Noty({
                text: '<div class="noty__content">'+ iconTemplate + '<div class="noty__content-text">' + message + '</div>' +'</div>',
                type: msgType,
                layout: "bottomRight",
                timeout: "2000",
                animation: {
                    open: 'animated fadeInRight', 
                    close: 'animated fadeOutRight',
                    easing: 'swing',
                    speed: 500                  
                }              
              }).show();                
          }
          
        }
      });
      return false;
    }
  });
}
  
// Быстрый заказ
function quickOrder(formSelector) {
  // Находим форму, которую отправляем на сервер, для добавления товара в корзину
  var formBlock = $($(formSelector).get(0));
  // Проверка на существование формы отправки запроса на добавление товара в корзину
  if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
    alert('Не удалось найти форму добавления товара в корзину');
    return false;
  }
  // Получаем данные формы, которые будем отправлять на сервер
  var formData = formBlock.serializeArray();
  // Сообщаем серверу, что мы пришли через ajax запрос
  formData.push({name: 'ajax_q', value: 1});
  // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа 
  formData.push({name: 'fast_order', value: 1});
  // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
  $.ajax({
    type    : "POST",
    cache	  : false,
    url		  : formBlock.attr('action'),
    data		: formData,
    beforeSend: function () {
      loadFile('cartPage', 'css');
      loadFile('cartPage', 'js');
    },
    success: function(data) {
      $('.add-cart.quick._loading').removeClass('_loading').find('span').text("Купить в 1 клик")      
      $.fancybox.open(data, {
        keyboard: false,
        baseClass: "_quickOrder",
        afterShow(){
          var loaded = loadFile('cartPage', 'css') && loadFile('cartPage', 'js');

          if(loaded) {
            $(function(){ quickOrderScripts()});
            $(function(){ OrderScripts()});
            $(function(){ address()});
            $(function(){ coupons()});
            $('.zoneSelect select').off('change').on('change',function(){
              optValue = $(this).find('option:selected').attr('value');
              $('.zones input[value="'+optValue+'"]').click();
              WithZone =  $('.deliveryZoneRadio:checked').attr('price');
              $('.changeprice').text(WithZone); 
            });
            $(function () {
              preloadHide(null, true)
            });            
          }
        }
      })
    }
  });
  return false;
}

// Функция Быстрого просмотра товара c модификацией
function quickViewMod() {
  // Действие при нажатии на кнопку в корзину товара c модификацией
  $(function() {
    $(document).on('mouseover', '.item._with-mod', function (params) {
      var isLoad = loadFile('goodsPage', 'css') && loadFile('goodsPage', 'js');
      if(isLoad) {
        $(document).off('mouseover', '.item._with-mod');
      }     
    })
    $(document).on('click', 'a.quickviewmod', function() {
      if (!$(this).hasClass('quick')) {
        $(this).addClass('_loading');
      }      
      var href = $(this).attr('href');
      href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
      quickViewShowMod(href);
      return false;
    });
  });
}
// Быстрый просмотр товара с модификацией
function quickViewShowMod(href, atempt) {
  // Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
  if(typeof(document.quickviewPreload) == 'undefined') {
    document.quickviewPreload = [];
  }
  var $btn = $('.quickviewmod._loading');
  $btn.find('.fal').remove();
  $btn.find('span').html('<i class="fal fa-spinner fa-spin"></i>')

  $.ajax({
    type    : "GET",
    cache	  : false,
    url		  : href,
    beforeSend: function () {
      loadFile('goodsPage', 'css');
      loadFile('goodsPage', 'js');
    },
    success: function(data) {
      $btn.removeClass('_loading').find('span').html('В корзину')

      $.fancybox.close();
      $.fancybox.open(data, {
        padding: 0,
        autoSize: true,
        maxWidth: 500,
        baseClass: "_modification",
        afterShow: function() {
          $('.fancybox-container._modification .block-bg').prepend('<div class="preloader"><span class="content-loading"></span></div>')          
          var isLoad = loadFile('goodsPage', 'css') && loadFile('goodsPage', 'js');

          if(isLoad){
            // Обновление доступности модификаций
            goodsMods($('.fancybox-content.product-view'));
            goodsPage();
            AddCart();
            quantity();
            hoverAnimBtn();
            // Стилизация селектов
            $('.fancybox-inner .product-view [name="form[properties][]"]').styler();

            if($('.wrapper').hasClass('_cart-page')){
              $('.fancybox-inner .add-cart.button').addClass('_cart-page');
            }
            $('.fancybox-inner .product-view .product-order').removeClass('col-md-4 col-md-6 col-lg-6');
            $('.fancybox-container._modification .product-view .block-bg > .row').css({visibility: 'visible',opacity: 1})
            preloadHide($('.fancybox-container._modification .block-bg .preloader'), true);
          };
        }
      });
    }
  });

}


// Функция + - для товаров
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty-plus').off('click').click(function(){
    var 
      quantity = $(this).parent().find('.quantity, .cartqty'),
      currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('change');
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.qty-minus').off('click').click(function(){
    var 
      quantity = $(this).parent().find('.quantity, .cartqty'),
      currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal) && !(currentVal <= 1) ){
      quantity.val(currentVal - 1);
      quantity.trigger('change');
    }
    return false;
  });
  // Если вводят 0 то заменяем на 1
  $('.qty-wrap .quantity').off('change').change(function(){
    if($(this).val() < 1){
      $(this).val(1); 
    }
  });
  }

// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(e){
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
  var del = e;
  var num = $('.compare .count').text();
  e.parent().fadeOut().remove();
  url = del.data('href');
  goodsModId = $(del).attr('data-goods-mod-id');
  $.ajax({ 
    cache : false,
    url		: url,
    success: function(d){
      var oldCount = num;
      var newCount = oldCount - 1;
      $('.compare .count').text(newCount);
      var flag = 0;
      
      if(newCount != 0){
        $('#compare-items li.item').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.compare').removeClass('have-items');
          $('.compare #compare-items .empty').show();
          $('.compare .actions').hide();
        }
      var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
        .removeAttr("title")
        .removeClass("added")
        .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(e){
  if(confirm('Вы точно хотите очистить корзину?')){
  var del = e;
  url = del.data('href');

  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      // Очищаем активные кнопки сравнения на товарах
      $('.compare #compare-items .item .item-remove').each(function(){
        var goodsModId = $(this).attr('data-goods-mod-id');
        var obj = $('.add-compare[data-mod-id="' + goodsModId + '"]');
         
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }         
      })
      
      $('.compare').removeClass('have-items');
      $('.compare .count').text("0");
      $('.compare .actions').hide();
      $('.compare #compare-items .item').remove();
      $('.compare #compare-items .empty').show();
      $('.add-compare').removeAttr("title").removeClass("added");
		}
  })
  }
}

// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(e){
  if(confirm('Вы точно хотите удалить товар из избранного?')){
  var del = e;
  var num = $('.favorites .count').text();
  e.parent().fadeOut().remove();
  url = del.data('href');
  goodsModId = $(del).attr('data-goods-mod-id');
  $.ajax({ 
    cache    : false,
    url		  : url,
    success: function(d){
      var oldCount = $('.favorites .count').text();
      var newCount = oldCount - 1;
      $('.favorites .count').text(newCount);
      var flag = 0;
      
      if(newCount != 0){
        $('#favorites-items li.item').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.favorites').removeClass('have-items');
          $('.favorites #favorites-items .empty').show();
          $('.favorites .actions').hide();          
        }
      var obj = $('.add-wishlist[data-mod-id="' + goodsModId + '"]');
      if(obj.length) {
        obj.attr("data-action-is-add", "1")
        .removeAttr("title")
        .removeClass("added")
        .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
      }
		}
  })
  }
}

// Удаление ВСЕХ товаров из Избранное без обновлении страницы
function removeFromFavoritesAll(e){
  if(confirm('Вы точно хотите очистить избранное?')){
  var del = e;
  url = del.data('href');
  
  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      // Очищаем активные кнопки избранное на товарах
      $('.favorites #favorites-items .item .item-remove').each(function(){
        var goodsModId = $(this).attr('data-goods-mod-id');
        var obj = $('.add-wishlist[data-mod-id="' + goodsModId + '"]');
        
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href").replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }        
      })    
      
      $('.favorites').removeClass('have-items');
      $('.favorites .count').text("0");
      $('.favorites .actions').hide();
      $('.favorites #favorites-items .item').remove();
      $('.favorites #favorites-items .empty').show();
      $('.add-wishlist').removeAttr("title").removeClass("added");
		}
  })
  }
}

// Удаление товара из корзины без обновлении страницы
function removeFromCart(e){
  if(confirm('Вы точно хотите удалить товар из корзины?')){
  var del = e;  
  e.parent().fadeOut().remove();
  url = del.data('href');
  quantity = del.data('count');
  
  $('.total-sum').animate({opacity: 0},500);
  $.ajax({
    cache   : false,
		url		  : url,
    success: function(d){
      var oldCount = $('.cart .count').text();
      var oldQuantity = quantity;
      var newCount = oldCount - oldQuantity;
      
      $('.cart .count').text(newCount);
      $('.total-sum').animate({opacity: 1},500);
      $('.total-sum').html($(d).find('.total-sum').html());
        var flag = 0; 
        if(newCount != 0){
        $('.cart-products-list li.item').each(function(){
          if(flag == 0){
            if($(this).css('display') == 'none'){
              $(this).show();
            flag++;
            }
          }
        })}else{
          $('.header .cart .cart-content .cart-products-list').hide();
          $('.header .cart  .cart-content .subtotal').hide();
          $('.header .cart  .cart-content .actions').hide();
          $('.header .cart  .cart-content .empty').show();
        }
      }
    })
  }
}

// Удаление ВСЕХ товаров из Корзины без обновлении страницы
function removeFromCartAll(e){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить корзину?')){
  var del = e;  
  e.parent().fadeOut().remove();
  url = del.data('href');
  $.ajax({ 
    cache   : false,
    url		  : url,
    success: function(d){
      $('.cart .count').text("0");
      $('.header .cart  .cart-content .cart-products-list').hide();
      $('.header .cart  .cart-content .subtotal').hide();
      $('.header .cart  .cart-content .actions').hide();
      $('.header .cart  .cart-content .empty').show();
		}
  })
  }
}

// Наверх
$(function(){
  // hide #back-top first
  $("#back-top").hide();
	// fade in #back-top
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').addClass('_bordered').show().prev().removeClass('_bordered');
		} else {
			$('#back-top').removeClass('_bordered').hide().prev().addClass('_bordered');
		}
	});
	// scroll body to 0px on click
	$('#back-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});

// Загрузчик файлов 
function loadFile(fileName, ext, cb){
  if(!fileName){console.error('Не передано имя загружаемого файла');return;}
  if(!ext){console.error('Не передано расширение загружаемого файла');return;}
  if(!(typeof cb === 'function')){cb = function(){}};

  var $file = $('#' + fileName + '-' + ext);  
  var attrName = (ext === 'css') ? 'href' : 'src';
  
  if(!$file.length){console.error('Файл не найден в разметке и не может быть загружен');return;}
  // Если файл уже загружен
  if($file.attr(attrName)){
    cb();
    // console.log('Already loaded');
    return (true);
  }
  $file.on('load', cb)
  $file.attr(attrName, $file.data(attrName));
}

// Предзагрузчик
function preloadHide(currentPreloader, nodelay) {
  var $preloader = currentPreloader || $('.preloader'),
  $spinner = $preloader.find('.content-loading');
  $spinner.fadeOut();
  $preloader.delay((nodelay)? 0 : 500).fadeOut('fast');
}

function preloadShow(currentPreloader) {
  var $preloader = currentPreloader || $('.preloader'),
  $spinner = $preloader.find('.content-loading');
  $spinner.show();
  $preloader.show();
}

// Адаптивное меню и каталог
function OpenMenu() {
// Иконки в мобильной версии
function headerIcons() {
  $('.header-icons').on('click', '.header-iconsItem', function(evt){
    var $icon = $(this);
    var id = $icon.attr('data-target');
    var $icons = $icon.siblings();
  
    $icons.each(function(index, icon){
    var id = $(icon).attr('data-target');
  
    $(icon).removeClass('active');
    $(id).slideUp()
    })
  
    $icon.toggleClass('active')
    $(id).slideToggle()
  })
  
  $(document).on('click', function(e){
    if(getClientWidth() <= 991){
    if(!$(e.target).parents('.header-top,._header-mobile').length && !$(e.target).hasClass('_header-mobile')) {
      $('._header-mobile').slideUp();
      $('.header-iconsItem').removeClass('active');
    }
    }
  })
  }
  headerIcons();
  
  // Основной каталог в шапке
  function headerCatalog() {
    var e,
        $headerCatalog = $(".header-catalog"),
        $catalogBtn = $(".header-catalogBtn"),
        $catalogMenu = $(".header-catalogMenu"),
        $catalogItem = $(".header-catalogItem"),
        $headerSubcatalog = $(".header-subcatalog"),
        $headerOverlay = $(".header-overlay");                          
        $headerCloseBtn = $('.header-closeBtn')
        
        $headerCatalog.hover(
          function() {
            if (getClientWidth() > 992) {
              (e = setTimeout(function() {
                  $catalogMenu.add($headerOverlay).addClass("_visible")
              }, 200))                                
            }
        },
          function() {
          if (getClientWidth() > 992) {
            (clearTimeout(e),
                setTimeout(function() {
                    $catalogMenu.add($headerOverlay).removeClass("_visible")
                }, 200))                              
          }
        });
        $catalogItem.hover(
          function() {
           if (getClientWidth() > 992) {
              $(this).find('.header-catalogLink').addClass("hover");
              $(this).find($headerSubcatalog).addClass("_visible");                              
            }
          },
          function() {
            if (getClientWidth() > 992) {
              $(this).find('.header-catalogLink').removeClass("hover")
              $headerSubcatalog.removeClass("_visible")                              
            }
        })
      // Мобильная версия
      $catalogBtn.click(function() {
        if (getClientWidth() <= 991) {
          ($catalogMenu.add($headerOverlay).addClass("_visible"),
          $("body").addClass("modal-open"))                                
        }
      }),
      $headerOverlay.add($headerCloseBtn).click(function() {
        if (getClientWidth() <= 991) {
          ($catalogMenu.add($headerOverlay).removeClass("_visible"),
          $("body").removeClass("modal-open"))                                
        }
      })
      $catalogMenu.on('click', '.parent .header-arrow', function(evt){
        if (getClientWidth() <= 991) {
          evt.preventDefault()
          
          var $arrow = $(this);
          var $link = $arrow.parent();
          
          if($arrow.hasClass('active')){
            $arrow.removeClass('active')
            $link.removeClass('active').next('.sub').slideUp();
          } else {
            $arrow.addClass('active')
            $link.addClass('active').next('.sub').slideDown() ;
          }
          
        }                              
      });
  }
  headerCatalog();
  
  function removeActiveLinks(){
    if (getClientWidth() > 992) {
      var $headerCatalog = $('.header-catalogMenu');
      
      $headerCatalog.find('.header-catalogLink, .header-subcatalogTitle, .header-catalogMenu').removeClass('active');
      $headerCatalog.find('.header-subcatalog-third, .sub').show();
    }
  }
  $(window).on('resize', $.debounce(300, removeActiveLinks))

}

// Загрузка основных функций шаблона
$(function(){
  mainFunctions();
  AddCart();
  Addto();
  quantity();
  OpenMenu();  
  viewed();
  quickViewMod();
  mainnav();
});

// Запуск основных функций для разных разрешений экрана
$(function(){
  if(getClientWidth() > 767){
    
  }
  // Запуск функций при изменении экрана
  $(window).resize(function(){
    if(getClientWidth() > 767){
      
    }
  });
});

// Модальное окно
$(function(){
  function modal() {
    if(!$.cookie('modal')){
      // Если cookie не установлено появится окно с задержкой 3 секунды
      var delay = 3000;
      var data = $("#fancybox-popup").html();
      setTimeout(function(){
        $.fancybox.open(data, {
          autoSize: true,
          maxWidth: 700,
          padding: 15,
          content: data
        });       
      }, delay)
      
     // Запоминаем в куках, что посетитель уже заходил
     $.cookie('modal', true, {
      // Время хранения cookie в днях
       expires: 1,
       path: '/'
     });    
    }
  }  
  // Уберите комментарии // со строчек ниже для запуска
  // modal();
})
// Баннер уведомления
$(function(){
  function banner() {
    // Если в куках нет записи
    if(!$.cookie('banner-top')){
     var $bannerTop = $('.banner-top');
     // Показываем баннер
     $bannerTop.show()
     
     $('.banner-top .banner-top-closeBtn').on('click', function(){
       // Скрываем баннер
       $bannerTop.hide()
       // Запоминаем в куках, что посетитель уже заходил
       $.cookie('banner-top', true, {
        // Время хранения cookie в днях
         expires: 1,
         path: '/'
       });         
     })
    }
  }  
  // Уберите комментарии // со строчек ниже для запуска
  // banner();
})

// Дополнительные пункты меню в шапке Перенос пунктов меню
function mainnav(){
  var overMenuExist = $('.overflowMenu li').length;
  if(overMenuExist){
   $('.overflowMenu li').removeClass('mainnav__replaced');
   $('.mainnav .mainnav__more').remove();
   $('.overflowMenu li').each(function(){
     $('.mainnav .mainnav__list').append($(this));
   })
  }
  menuWidth = $('.mainnav').width();
  menuCount = $('.mainnav .mainnav__list li').length + 1;
  var nextCheck = 0;
  var CurrentWidthCounter = 0;
  for(var i=1; i < menuCount;  i++){
    currentWidth = parseInt(Math.ceil($('.mainnav .mainnav__list li:nth-child('+i+')').width())) + 46;
    nextCheck += currentWidth;
    if(nextCheck > menuWidth){
      var a = i;
      for(a;a < menuCount;a++){
        $('.mainnav .mainnav__list li:nth-child('+ a +')').addClass('mainnav__replaced');
      }
      $('.mainnav .mainnav__list').append('<li class="mainnav__item mainnav__more"><a class="mainnav__link">Еще...</a></li>');
      $('.mainnav__more').append($('<ul>').addClass('overflowMenu'))
      $('.mainnav .mainnav__replaced').each(function(){
        $('.overflowMenu').append($(this));
      });
      menuMorePosition = parseInt($('.mainnav__more').position().left);
      $('.mainnav .mainnav__more').on('click',function(){
        $(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
        $('.overflowMenu').hasClass('active') ? $('.overflowMenu').removeClass('active') : $('.overflowMenu').addClass('active');
        $('.mainnav .mainnav__list').hasClass('active') ? $('.mainnav .mainnav__list').removeClass('active') : $('.mainnav .mainnav__list').addClass('active');
      });
      $(function($){
        $(document).on('mouseup', function (e){ 
          var div = $(".overflowMenu.active"); 
          var btn = $(".mainnav .mainnav__more");
          if (!div.is(e.target) && div.has(e.target).length === 0 && !btn.is(e.target)) {
            div.removeClass('active');
            btn.removeClass('active');
            $('.mainnav .mainnav__list').removeClass('active');
          }
        });
      });
      return false;
    }
  }
}
// Поиск в шапке
$(function(){
  function toggleSearch() {
    $('.header-search .search').toggleClass('_active')
  }
  $('.header-search .search-close').on('click', function(e){
    toggleSearch();
  }
  )
  $('.header-search .header-searchLink, .header-search .search-overlay').on('click', function(e){
    e.preventDefault()
    toggleSearch();
  })

})
// Файл в форме контактов
function feedbackPage(){
  $(function () {
    $('#feedback_file').on('change',function(e){
      var $btn = $('.file .button');
      var $clearBtn = $('#clear-file');
      
      if(e.target.files.length){
        var fileName = e.target.files[0].name;
        $btn.text(fileName);
        $clearBtn.show()
      } else {
        $btn.text('Выберите файл');
        $clearBtn.hide()
      }
    })
    $('#clear-file').on('click', function(){
      var $input = $('#feedback_file');
      
      if($input[0].files.length) {
        $input.val(null)
        $('.file .button').text('Выберите файл')
        $(this).hide()
      }
    })    
  })
}