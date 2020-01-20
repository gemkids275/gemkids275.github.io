// creat Chicken Class with parameter $chickenDiv
function Chicken($chickenDiv)
{
    // Tạo hàm đệ qui với setTimeout trong đó time out là ngẫu nhiên
    this.hatchEggs = function ()
    {
        if(scope.life>0){
            let random_index    = Math.floor(Math.random() * $("div.chicken").length);
            let $eachChickenDiv = $($("div.chicken")[random_index]);
            this.nextEgg        = new Egg($eachChickenDiv);
            let nextEggTime     = 2000;
            // calling function startFall of nextEgg object
            this.nextEgg.startFall();
            //calculate period when next egg will start falling in milliseconds
            // var nextEggTime = getRandomInt(time, time+(6-scope.level)*1000);
            // window.setTimeout(this.hatchEggs.bind(this), nextEggTime);
        }
    };


}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * max) + min;
}
