var addButtons = $('a.slist-add-items-button');

addButtons.click(addButtonClick);

function addButtonClick(e) {
    e.preventDefault();

    var listContainer = $(this).parent('footer').parent('.slist').children('.items');
    var listId = $(this).attr('slist');

    var newItem = $('<div/>', {
        class: 'slist-item new'
    }).appendTo(listContainer);

    var newItemInput = $('<input/>', {
        class: 'full-width',
        placeholder: 'Наименование',
        type: 'text',
        blur: function() {
            var title = $(this).val().trim();
            if (title && title != '') {
                
                ws.send(JSON.stringify({act: 'AddListItem', data: {title, listId}}));

                $(this).parent('.slist-item').text(title);
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