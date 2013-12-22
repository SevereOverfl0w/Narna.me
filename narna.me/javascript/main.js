//function calcBoxes(){
//    var currentTallest = 0,
//         currentRowStart = 0,
//         rowDivs = new Array(),
//         $el,
//         topPosition = 0;
//
//     $('.donate').each(function(){
//         $(this).css('margin-top', '');
//     });
// 
//     $('.option').each(function(){
//         $(this).css('height', '');
//     });
//
//
//     $('.option').each(function() {
//    
//       $el = $(this);
//       topPostion = $el.position().top;
//       
//       if (currentRowStart != topPostion) {
//    
//         // we just came to a new row.  Set all the heights on the completed row
//         for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
//           rowDivs[currentDiv].children('.donate').css( "margin-top", currentTallest - rowDivs[currentDiv].height());
//           rowDivs[currentDiv].height(currentTallest);
//         }
//    
//         // set the variables for the new row
//         rowDivs.length = 0; // empty the array
//         currentRowStart = topPostion;
//         currentTallest = $el.height();
//         rowDivs.push($el);
//    
//       } else {
//    
//         // another div on the current row.  Add it to the list and check if it's taller
//         rowDivs.push($el);
//         currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
//    
//      }
//       
//      // do the last row
//       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
//         rowDivs[currentDiv].css('height', '');
//         console.log(currentTallest, rowDivs[currentDiv].height(), currentDiv)
//         rowDivs[currentDiv].children('.donate').css( "margin-top", currentTallest - rowDivs[currentDiv].height());
//         rowDivs[currentDiv].height(currentTallest);
//       }
//       
//    });
//}
//
function calcBoxes(){
    var currentTallest = 0;
    $('.option').css('height', '');
    $('.donate').css('margin-top', ''); // Height of box is affected by this margin

    $('.option').each(function(){
        $el = $(this);
        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    });

    $('.option').each(function(){
        $el = $(this);
        $el.children('.donate').css('margin-top', currentTallest-$el.height());
        $el.height(currentTallest);
    });

}

$(window).load(calcBoxes);
$(window).resize(calcBoxes);

function updateCount(){ 
            $.getJSON('https://api.syfaro.net/minecraft/1.2/server/info?ip=sv.narna.me', function(data){
                $('#playerCount').text(data.players + " / " + data.maxPlayers + " Online");
            });
}

updateCount();
setInterval(updateCount, 5000);
