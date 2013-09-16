// 插入 <ul> 之 <li> 樣板
var tmpl = '<li><input type="text"><span></span></li>';

var insert = function(content){
  var newLi = $(tmpl).prependTo('.main');
  if(content !== undefined){
    newLi.find('span').text(content.text);

    if (content.status) {
      newLi.addClass("is-done");
    };

  }else{ // 增加新的空 <li>，應為編輯模式
    newLi.addClass('is-editing');
    //  新增確認按鈕？
    // newLi.append($("<button>確認</button>"));
    newLi.find('input').focus();
  }
};

var save = function(){
  var arr = []; // 要存的陣列

  $("ul").find("li").each(function(){
    var item = {};
    item.text = $(this).find("span").text();
    if($(this).hasClass("is-done")){
      item.status = true;
    }

    arr.unshift(item);
  });
  
  console.log('saving', arr);
  localStorage.todoItems = JSON.stringify(arr);
};

var load = function(){

  $("ul").empty();

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
    var input = $(e.target);
    var li = input.parents('.is-editing');
    
    li.find('span').text(input.val());
    li.removeClass('is-editing');
    save();
  }
});

load();

// 課堂練習一：
var sortableLists = $('.connected');
var placeholder = $('#placeholder');

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
  // alert(ui.item.find("span").text());
  ui.item.remove();
  save();
});

//  homework2 - drag <li> to div.done
$(".done").on("sortreceive", function(event, ui){
  ui.item.addClass("is-done");
  save();
  load();
});

//  homework2 - click on any area to complete input
// $("body").on("click", function(){
//   alert("not-editing");  
// });