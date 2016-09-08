$(document).ready(function(){
    var showOh = function () {
        $('div.oh').toggle("slow"); //Thanks should appears
        $('img.oh').toggle("slow"); //Emoji should appears
        $('.oh').toggle("slow"); //Emoji and text should disapear
    }

    $('.mood').on('click', showOh);
    $('.oh').toggle(false);
});
