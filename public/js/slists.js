var addButtons = $('a.slist-add-items-button');

addButtons.click(addButtonClick);

function addButtonClick(e) {
    e.preventDefault();

    var listContainer = $(this).parent('footer').parent('.slist').children('.items');
    var listId = $(this).attr('slist');

    var newItem = $('<div/>', {
        class: 'slist-item new editable'
    }).appendTo(listContainer);

    var newItemInput = $('<input/>', {
        class: 'full-width',
        placeholder: 'Наименование',
        type: 'text',
        blur: function() {
            var title = $(this).val().trim();
            if (title && title != '') {
                
                ws.send(JSON.stringify({act: 'AddListItem', data: {title, listId}}));

                var item = $(this).parent('.slist-item').removeClass('editable').text(title).click(listItemClick);

                var link = $('<a/>', {
                    href: '#',
                    class: 'del-button'
                }).click(listItemDelClick).appendTo(item);

                $('<i/>', {
                    class: 'fas fa-trash-alt'
                }).appendTo(link);
            } else {
                $(this).parent('.slist-item').remove();
            }
        },
        keyup: function(e) {
            if (e.which == 13) {
                $(this).parent('.slist-item').parent('.items').parent('.slist').children('footer').children('a.slist-add-items-button').click();
                $(this).blur();
            } else if (e.which == 27) $(this).val('').blur();
        }
    }).appendTo(newItem);

    newItemInput.focus();
};

$('.slist-item').click(listItemClick);

function listItemClick(e) {
    if (e.target != this) return;

    $(this).toggleClass('done');
    ws.send(JSON.stringify({act: 'ChangeStateListItem', data: {itemId: $(this).attr('id'), isDone: $(this).hasClass('done')}}));
}

$('.slist-item a.del-button').click(listItemDelClick);

function listItemDelClick(e) {
    e.preventDefault();

    ws.send(JSON.stringify({act: 'DeleteListItem', data: {itemId: $(this).parent('.slist-item').attr('id')}}));
}

$('.slist header.slist-header a.del-button').click(listDelClick);

function listDelClick(e) {
    e.preventDefault();

    ws.send(JSON.stringify({act: 'DeleteList', data: {listId: $(this).parent('header').parent('.slist').attr('id')}}));
}