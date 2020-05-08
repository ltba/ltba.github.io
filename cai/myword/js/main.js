$(function() {
//left width
var w = $(".zsfk").width();
$(".jtys,.gj,.lz,.cl").css("width",w);
//tip
var $tooltip = $();
var $win = $(window),
winWidth,
winHeight,
width,
height;
$('#main').on({
    'mouseenter.minetip': function(e) {
    $tooltip.remove();
    var $elem = $(this),
    title = $elem.attr('data-minetip-title');
    if (title === undefined) {
        title = $elem.attr('title');
        if (title !== undefined) {
            title = $.trim(title.replace(/&/g, '\\\\&'));
            $elem.attr('data-minetip-title', title);
        }
    }
    if (title === undefined || title !== '' && title.replace(/&([0-9a-fl-or])/g, '') === '') {
        var childElem = $elem[0],
        childTitle;
        do {
            if (childElem.hasAttribute('title')) {
                childTitle = childElem.title;
            }
            childElem = childElem.firstChild;
        } while ( childElem && childElem . nodeType === 1 );
        if (childTitle === undefined) {
            return;
        }
        if (!title) {
            title = '';
        }
        title += $.trim(childTitle.replace(/&/g, '\\\\&'));
        $elem.attr('data-minetip-title', title);
    }
    if (!$elem.data('minetip-ready')) {
        $elem.find('[title]').addBack().removeAttr('title');
        $elem.data('minetip-ready', true);
    }
    if (title === '') {
        return;
    }
    var content = '<span class=\"minetip-title\">' +  title + '&r</span>';
    var description = $.trim($elem.attr('data-minetip-text'));

        content += '<span class=\"minetip-description\">' + description + '&r</span>';

    while (content.search(/&[0-9a-fl-o]/) > -1) {
        content = content.replace(/&([0-9a-fl-o])(.*?)(&r|$)/g, '<span class=\"format-$1\">$2</span>&r');
    }
    content = content.replace(/&r/g, '');
    $tooltip = $('<div id=\"minetip-tooltip\">');
    $tooltip.html(content).appendTo('body');
    winWidth = $win.width();
    winHeight = $win.height();
    width = $tooltip.outerWidth(true);
    height = $tooltip.outerHeight(true);
    $elem.trigger('mousemove', e);
},
'mousemove.minetip': function(e, trigger) {
    if (!$tooltip.length) {
        $(this).trigger('mouseenter');
        return;
    }
    e = trigger || e;
    var top = e.clientY - 34;
    var left = e.clientX + 14;
    if (left + width > winWidth) {
        left -= width + 36;
    }
    if (left < 0) {
        left = 0;
        top -= height - 22;
        if (top < 0) {
            top += height + 47;
        }
    } else if (top < 0) {
        top = 0;
    } else if (top + height > winHeight) {
        top = winHeight - height;
    }
    $tooltip.css({
        top: top,
        left: left
    });
},
'mouseleave.minetip': function() {
    if (!$tooltip.length) {
        return;
    }
    $tooltip.remove();
    $tooltip = $();
}
},
'.minetip, .invs-item');

});
$(function(){
var Dynamic = function(parentElem, parentSelector) {
    var select = parentElem.querySelectorvar 
    select = parentElem.querySelector(parentSelector + ' > .dyn-show');
    $(select).removeClass('dyn-show');
    var $nextFrame = $(select&&select.nextElementSibling || parentElem.firstElementChild);
    return $nextFrame.addClass('dyn-show');
};
setInterval(function() {
    $('#main').find('.dyn').each(function() {
        var $nextFrame = Dynamic(this, '.dyn');

    });
},
2000);
//show crafttable
$(".click").click(function(){
	if ($(this).parent(".non").length===0) {
	$(".show-table").css("display","block");
	$('.CraftTable').hide();
	var id = $(this).attr("gameid");
	$('.'+id).show();
	}
});
// dyn left width
$(window).resize(function() { 
var w = $(".zsfk").width();
$(".jtys,.gj,.lz,.cl").css("width",w);
}); 
});
