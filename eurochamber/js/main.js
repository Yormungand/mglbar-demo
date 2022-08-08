/* zoom image */

$(document).ready(function(){
    $('#images').find('img').each(function (i,el) {
        var imgSrc = $(el).attr('src');
        var imgCaption = $(el).siblings('figcaption').html();
        if(imgCaption !== undefined){
            $(el).wrap('<a class="fancybox" data-caption="'+imgCaption.replace(/<[^>]*>?/gm, '')+'" data-fancybox="images" rel="group" href="'+imgSrc.replace('_m','')+'"></a>');
        }else{
            $(el).wrap('<a class="fancybox" data-fancybox="images" rel="group" href="'+imgSrc.replace('_m','')+'"></a>');
        }
    });
    $('[data-fancybox="images"]').fancybox({
        buttons : [
            "slideShow",
            'share',
            'fullScreen',
            'close',
            'zoom',
            'thumbs'
        ],
        transitionEffect: "fade",
        beforeShow: function(){
            var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
            $('.article-header__wrapper').css('margin-right', scrollBarWidth);
        },
        afterClose: function(){
            $('.article-header__wrapper').css('margin-right', '');
        }
    });

    $('[data-fancybox="images1"]').fancybox({
        buttons : [
            "slideShow",
            'share',
            'fullScreen',
            'close',
            'zoom',
            'thumbs'
        ],
        transitionEffect: "fade",
        beforeShow: function(){
            var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
            $('.article-header__wrapper').css('margin-right', scrollBarWidth);
        },
        afterClose: function(){
            $('.article-header__wrapper').css('margin-right', '');
        }
    });

    $.fancybox.defaults.hash = false;
});
//article content
if( $(".c-content img").css('float') == 'left') {
    $(".c-content img").css('margin-right', '8px');
}else if($(".c-content img").css('float') == 'right'){
    $(".c-content img").css('margin-left', '8px');
}

if( $(".c-content .image").css('float') == 'left') {
    $(".c-content .image").css('margin-right', '8px');
}else if($(".c-content .image").css('float') == 'right'){
    $(".c-content .image").css('margin-left', '8px');
}