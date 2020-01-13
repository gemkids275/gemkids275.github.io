// Download DOM before running jQuery script
$(document).ready(onLoad);

// Create global object so jQuery doesn't have to
// repeat the search for elements in the DOM
var scope = {};
//Event click button play
$(document).on("click","#play",function (e) {
    let username = $("#username").val();
    let tel      = $("#tel").val();
    let tel_regex = new RegExp('^\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4,5})$');
    if(username == ""){
        alert("Bạn chưa nhập họ tên");
    }else if(!tel_regex.test(tel)){
        alert("Số điện thoại không đúng định dạng");
    }else{
        // start hatching eggs for all chicken divs
        window.setTimeout(chickensStartHatch, 100);
    }
    e.preventDefault();
});
// begin jQuery execution
function onLoad()
{
    let i;
    scope.$wolf            = $("div.wolf");
    scope.$allChickens     = $("div.chicken");
    scope.$lifeContainer   = $("div.life-container");
    scope.$life            = `<div class="life"></div>`;
    scope.pointer_width    = 0;
    scope.wolf_width       = $(".wolf").width();
    scope.basket_width     = $(".basket").width();
    //Số điểm tăng thêm khi hứng được
    scope.point            = 10;
    //Số mạng chơi
    scope.life             = 3;
    //Số điểm
    scope.score            = 0;
    //Số điểm tăng cấp mỗi level
    scope.score_per_lever  = 100;
    //Level lúc đầu
    scope.level            = 1;
    //Level max
    scope.level_max        = 5;
    //Tốc độ(milliseconds)
    scope.speed            = 10;
    //Vị trí con trỏ trên cái giỏ
    scope.pointer_position = scope.basket_width / 2;
    //Position của phần tử cha
    scope.parentRect       = $("div.game")[0].getBoundingClientRect();
    //Set life
    for(i =1;i<=scope.life;i++){
        let life = $(scope.$life).addClass("life-"+i);
        $(scope.$lifeContainer).append($(life));
    }
};

//add mouse over event to move basket
$(document).on("mousemove", function (e)
{
    //Nếu con trỏ vượt qua mép trái or phải thì ko di chuyển giỏ
    if (e.pageX - scope.pointer_position > scope.parentRect.left && e.pageX + scope.pointer_position <
        scope.parentRect.right)
    {
        scope.$wolf.css("left", e.pageX - scope.pointer_position);
    }
});

//add touchmove event to move basket on mobile
$(document).on("touchmove", function (e)
{
    let cursor = e.originalEvent.touches[0].pageX;
    //Nếu con trỏ vượt qua mép trái or phải thì ko di chuyển giỏ
    if (cursor - scope.pointer_position > scope.parentRect.left && cursor + scope.pointer_position <
        scope.parentRect.right)
    {
        scope.$wolf.css("left", cursor - scope.pointer_position);
    }
});

function getOffset(el)
{
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top : rect.top + window.scrollY
    };
}


// this.startPos = chickens[Math.floor(Math.random()*4)].position()

// select all 4 chicken divs
function chickensStartHatch()
{
    //use .each to execute function for each element in the array of chicken divs
    scope.$allChickens.each(function (index)
          {
              // Lấy ngẫu nhiên 1 trong các div chicken để ấp trứng
              let random_index = Math.floor(Math.random()*scope.$allChickens.length);
              let $eachChickenDiv    = $(scope.$allChickens.splice(random_index,1));
              // var $eachChickenDiv    = $($(scope.$allChickens)[Math.floor(Math.random()*scope.$allChickens.length)]);
              // create object chicken object from Chicken class
              let $eachChickenObject = new Chicken($eachChickenDiv);
              // Sau (random_index+1)*2 giây hàm ấp trứng sẽ thực hiện
              window.setTimeout(function (){
                                    $eachChickenObject.hatchEggs();
                                }, (index + 1) * 2000
              );
          });

}

