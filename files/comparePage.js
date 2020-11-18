// Сравнение товаров
function comparePage(){
    // Сравнение товаров. Инвертирование свойств для сравнения товара
    $('.CompareCheckbox.invert').click(function(){
      var checked = true,
      checkboxes = $('.CompareCheckbox:not(.invert)');
      checkboxes.each(function(){
        if($(this).attr('checked')) {
          checked = false;
          return false;
        }
      });
      checkboxes.each(function(){
        $(this).attr('checked', checked);
      });
      $(this).attr('checked', checked);
    });
    
    // Сравнение товаров. Скрытие характеристик товара, которые выделил пользователь
    $('.CompareGoodsHideSelected').click(function(){
      $('.CompareGoodsTableTbodyComparisonLine').each(function(){
        var CheckedCheckbox = $(this).find('.CompareCheckbox:checked:not(.invert)');
        if(CheckedCheckbox.length>0) {
          $(this).hide();
        }
      });
      // отменяем выделение характеристик товаров
      $('.CompareCheckbox').attr('checked',false);
      return false;
    });
    
    // Сравнение товаров. Скрытие характеристик товара, которые выделил пользователь
    $('.CompareGoodsHideSelected').click(function(){
      $('.CompareGoodsShowAll').show();
      $('.CompareGoodsTableTbodyComparisonLine').each(function(){
        var CheckedCheckbox = $(this).find('.CompareCheckbox:checked:not(.invert)');
        if(CheckedCheckbox.length>0) {
          $(this).hide();
        }
      });
      // отменяем выделение характеристик товаров
      $('.CompareCheckbox').attr('checked',false);
      return false;
    });
    
    // Сравнение товаров. Отображение скрытых характеристик товара
    $('.CompareGoodsShowAll').click(function(){
      $(this).hide();
      $('.CompareGoodsTableTbodyComparisonLine:hidden').show();
      return false;
    });
    
    // Сравнение товаров. Верхняя навигация изменение фильтра на отображение всех характеристик товаров
    $('.CompareGoodsTableFilterShowAll').click(function(){
      $('.CompareGoodsTableFilterSelected').removeClass('CompareGoodsTableFilterSelected');
      $('.CompareGoodsTableTbodyComparisonLine:hidden').show();
      $(this).addClass('CompareGoodsTableFilterSelected');
      return false;
    });
  
    // Сравнение товаров. Фильтр в верхней навигации. Отображение только различающихся характеристик товара
    $('.CompareGoodsTableFilterShowOnlyDifferent').click(function(){
      $('.CompareGoodsTableFilterSelected').removeClass('CompareGoodsTableFilterSelected');
      $('.CompareGoodsTableTbodyComparisonLine:not(.same)').show();
      $('.CompareGoodsTableTbodyComparisonLine.same').hide();
      $(this).addClass('CompareGoodsTableFilterSelected');
      return false;
    });
    
    // При клике по строке выделяем свойство
    $('.CompareGoodsTableTbodyComparisonLine td:not(.cell)').click(function(){
      var CompareCheckbox = $(this).parent().find('.CompareCheckbox');
      if(CompareCheckbox.attr('checked')) {
        CompareCheckbox.attr('checked', false);
      } else {
        CompareCheckbox.attr('checked', true);
      }
    });
    
    function compareGetVars () {
      return new Array(
        $('.CompareGoodsTableTbody tr:first td').length - 1,
        parseInt($('.CompareGoodsTableTbody tr:first td:visible:not(.cell)').attr('class').replace(new RegExp('compare\-td compare\-td\-'), '')),
        parseInt($('.CompareGoodsTableTbody tr:first td:visible:last').attr('class').replace(new RegExp('compare\-td compare\-td\-'), ''))
      );
    }
    
    // Прокрутка списка сравнения вправо
    $('.CompareGoodsTableNext').click(function(){
      // Определяем используемые поля
      var data = compareGetVars(); 
      // Изменяем их если это возможно.
      if(data[0] > data[2]) {
        $('.compare-td-' + data[1]).hide();
        $('.compare-td-' + (data[2] + 1)).show();
        if((data[2] + 1) >= data[0]) {
          $(this).find('a').addClass('disable');
        }
        if(data[1] + 1 != 1) {
          $('.CompareGoodsTablePrev a').removeClass('disable');
        }
      }
      return false;
    });
    
    // Прокрутка списка сравнения влево
    $('.CompareGoodsTablePrev').click(function(){
      // Определяем используемые поля
      var data = compareGetVars(); 
      // Изменяем их если это возможно.
      if(1 < data[1]) {
        $('.compare-td-' + (data[1] - 1)).show();
        $('.compare-td-' + data[2]).hide();
        if((data[1] - 1) <= 1) {
          $(this).find('a').addClass('disable');
        }
        if(data[2] - 1 != data[0]) {
          $('.CompareGoodsTableNext a').removeClass('disable');
        }
      }
      return false;
    });
}