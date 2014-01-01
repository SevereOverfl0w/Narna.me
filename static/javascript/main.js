var $options = $('.option');
var $donate = $('.donate');

var calcBoxes = function() {
    var currentTallest = 0;

    $options.css('height', '');
    $donate.css('margin-top', ''); // Height of box is affected by this margin

    $options.each(function(){
        $el = $(this);
        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    });

    $options.each(function(){
        $el = $(this);
        $el.children('.donate').css('margin-top', currentTallest-$el.height());
        $el.height(currentTallest);
    });

}

$(window).load(calcBoxes);
$(window).resize(calcBoxes);

var updateCount;
var $playercount = $('#playerCount');

(updateCount = function() { 
    $.getJSON('https://api.syfaro.net/minecraft/1.2/server/info?ip=sv.narna.me', function(data){
        if (data.status == "error") {
            $playercount.text(data.error);
        } else {
            $playercount.text(data.players + " / " + data.maxPlayers + " Online");
        }
    });
})();

setInterval(updateCount, 5000);

$('.alert .close').click(function(){
    $(this).parent().fadeOut($(this).remove);
});
