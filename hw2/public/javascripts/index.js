// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>';

var insert = function(content){
  var newLi = $(tmpl).prependTo('.main');
  if(content !== undefined){
    newLi.find('span').text(content);
  }else{ // 增加新的空 <li>，應為編輯模式
    newLi.addClass('is-editing');
    newLi.find('input').focus();
  }
};

var save = function(){
  var arr = []; // 要存的陣列
  $('ul').find('span').each(function(){
    arr.unshift($(this).text());
  });
  
  console.log('saving', arr);
  localStorage.todoItems = JSON.stringify(arr);
};

var load = function(){
  var arr;
  if(localStorage.todoItems){
    arr = JSON.parse(localStorage.todoItems);        
    
    console.log('loading', arr);
    arr.forEach(function(content){
      insert(content);
    });
  }
};

$('#add').click(function(){
  insert();
});

$('ul').on('keyup', 'input', function(e){
  if(e.which === 13){
    var input = $(e.target),
        li = input.parents('.is-editing');
    
    li.find('span').text(input.val());
    li.removeClass('is-editing');
    save();
  }
});

load();

// 課堂練習一：
var sortableLists = $('.connected'),
    placeholder = $('#placeholder');

sortableLists.sortable({
  connectWith: '.connected',
  tolerance: 'pointer'
});

// 課堂練習二：
sortableLists.on('sortstart', function(){
  placeholder.addClass('is-dragging');
}).on('sortstop', function(){
  placeholder.removeClass('is-dragging');
});

// 課堂練習三：
$('.delete').on('sortreceive', function(e, ui){
  ui.item.remove();
  save();
});