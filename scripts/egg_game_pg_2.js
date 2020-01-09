// jQuery for Catch the Eggs Game


// Download DOM before running jQuery script
$(document).ready(onLoad);

// Create global object so jQuery doesn't have to
// repeat the search for elements in the DOM
var scope = {};

// begin jQuery execution
function onLoad(){

    scope.$wolf = $('div.wolf');
    scope.$allChickens = $('div.chicken');
    scope.pointer_width = 0;
    scope.wolf_width = $(".wolf").width();
    scope.basket_width = $(".basket").width();
    //Vị trí con trỏ trên cái giỏ
    scope.pointer_position = scope.basket_width / 2;
    //Position của phần tử cha
    scope.parentRect = $(".container")[0].getBoundingClientRect();

// add keydown event listener to move basket
  $(document).keydown(moveWolf);

// start hatching eggs for all chicken divs
    window.setTimeout(chickensStartHatch, 100);
};

//add mouse over event to move basket
$(document).on('mousemove', function (e) {
    //Nếu con trỏ vượt qua mép trái or phải thì ko di chuyển giỏ
    if(e.pageX-scope.pointer_position> scope.parentRect.left && e.pageX +scope.pointer_position < scope.parentRect.right ){
        scope.$wolf.css('left', e.pageX-scope.pointer_position)
    }
});
//add touchmove event to move basket on mobile
$(document).on('touchmove', function (e) {
    let cursor = e.originalEvent.touches[0].pageX;
    //Nếu con trỏ vượt qua mép trái or phải thì ko di chuyển giỏ
    if(cursor-scope.pointer_position > scope.parentRect.left && cursor +scope.pointer_position < scope.parentRect.right ){
        scope.$wolf.css('left', cursor-scope.pointer_position)
    }
});

function HorizontallyBound($parentDiv, $childDiv) {
    var parentRect = $parentDiv[0].getBoundingClientRect();
    var childRect = $childDiv[0].getBoundingClientRect();
    return childRect.left+50 < parentRect.left || childRect.right>= parentRect.right;
}



function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

 // create event handler for keydown event
function moveWolf(event){
  // check for right and left arrow keys
  // if right key then move basket to the right
  if (event.key == 'ArrowRight'){
    scope.$wolf.css('left', '+=50').removeClass('wolf-left');
// if left key then move basket to the left
  } else if (event.key == 'ArrowLeft'){
    scope.$wolf.css('left', '-=50').addClass('wolf-left');
  }
};


// this.startPos = chickens[Math.floor(Math.random()*4)].position()

// select all 4 chicken divs
function chickensStartHatch(){
  var $allChickenDivs = $('div.chicken')
// use .each to execute function for each element in the array of chicken divs
                        .each(function(index) {
// 'this' in context of enclosed function represents each html element
                                  var $eachChickenDiv = $(this);
// create object chicken object from Chicken clas
                                  var $eachChickenObject = new Chicken($eachChickenDiv);
// envoke method hatchEggs in each instance of Chicken Class
                                  window.setTimeout(function(){
                                       $eachChickenObject.hatchEggs();
                                     }, (index + 1) * 5000
                                  );
                              });

}

