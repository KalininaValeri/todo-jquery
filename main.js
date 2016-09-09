var counterNotMadeItem = function () {
    $('#counterItems').text($('input[type=checkbox]:not(:checked)').length);
};

var visibleControlElements = function () {
    if ($("li").length !== 0) {
        $('.input-group-addon').addClass('visible');
        $('.row').addClass('active');
    } else {
        $('.input-group-addon').removeClass('visible');
        $('.row').removeClass('active');
    }
};

var handelClickList = function (e) {
    /*console.log($(e.target));*/
    var target = $(e.target), listItem = $(e.target).parents('li');

    if (target.prop('checked')) {
        listItem.addClass('made');
        counterNotMadeItem();
    } else {
        listItem.removeClass('made');
        counterNotMadeItem();
    }

    if (target.is('button')) {
        listItem.remove();
        counterNotMadeItem();
        visibleControlElements();
    }
};


var handelDblClickList = function (e) {
    /*console.log('1');*/
    var target = $(e.target),
        listItem = target.parents('li'),
        inputListItem = listItem.children('input');

    var editorInput = function () {
        if (inputListItem.val() === ''){
            listItem.remove();
        } else {
            target.text(inputListItem.val());
            listItem.removeClass('editor');
        }
    };

    if (target.is('.checkbox div')) {
        listItem.addClass('editor');
        inputListItem.focus();
        inputListItem.val(target.text());

        inputListItem.focusout(editorInput);
        inputListItem.keyup(function (e) {
            if (e.keyCode === 13) {
                editorInput();
            }
        });
    }
};

var handleKeyUp = function (event) {
    var mainInput = $('#dataEntry');

    if (event.keyCode !== 13) {
        return;
    }

    if (mainInput.val() === '') {
        return;
    }

    $('#list').append(
        '<li><div class="checkbox">' +
        '<button type="button" class="btn btn-link btn-xs pull-right">' +
        '</button>' +
        '<input type="checkbox">' +
        '<div>' + mainInput.val() + '</div>' +
        '</div><input type="text" class="form-control"></li>'
    );

    mainInput.val('');

    visibleControlElements();

    counterNotMadeItem();
};

$(function () {
    var mainInput = $('#dataEntry'),
        list = $('ul');


    list.bind('click', handelClickList);

    list.bind('dblclick', handelDblClickList);

    mainInput.keyup(handleKeyUp);

    visibleControlElements();

    counterNotMadeItem();

    $('.input-group-addon').click(function () {
        var n = [],
            listItem = $('li');
        $('[type=checkbox]:not(:checked)').each(function(indx){
            n.push($(this));
        });
        if( n.length === 0 ){
            $('[type=checkbox]').prop('checked', false);
            listItem.removeClass('made');
            counterNotMadeItem();
        } else {
            $('[type=checkbox]').prop('checked', true);
            listItem.addClass('made');
            counterNotMadeItem();
        }
    });

    $('#allItemsList').click(function () {
        $('ul').removeClass('only-active only-checked');
    });

    $('#activeItemsList').click(function () {
        $('ul').removeClass('only-checked');
        $('[type=checkbox]:checked').parents('ul').addClass('only-active');
    });

    $('#madeItemsList').click(function () {
        $('ul').removeClass('only-active');
        $('[type=checkbox]:not(:checked)').parents('ul').addClass('only-checked');
    });

    $('#deleteAllMade').click(function () {
        $('[type=checkbox]:checked').parents('li').remove();
        visibleControlElements();
    });
});
