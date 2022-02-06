function onNavigation(e) {
    if (e.progress == 2) {
        player.pause();
    }
}
Flowtime.showProgress(true);
Flowtime.addEventListener("flowtimenavigation", onNavigation, false);
Flowtime.start();
$(function() {
    var docUrl = document.URL.split('#')[0];
    setInterval(function() {
        $(".showtip").removeClass("showtip").hide().siblings("span").addClass("showtip").fadeIn();
    }, 5000);
    var bgmMusic = document.getElementById("bgmMusic");
    $("#on").click(function() {
        bgmMusic.pause();
        $("#on").hide(200);
        $("#off").css({ "display": "inline-block" }, 300);
    });
    $("#off").click(function() {
        bgmMusic.play();
        $("#off").hide(200);
        $("#on").css({ "display": "inline-block" }, 300);
    });

   
});
