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
                var el = $('#playerCount');
                if (data.status == "error") {
                    el.text(data.error);
                } else {
                    el.text(data.players + " / " + data.maxPlayers + " Online");
                }
            });
}

updateCount();
setInterval(updateCount, 5000);
