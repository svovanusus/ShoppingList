var ws = new WebSocket('ws://localhost:3000/lists/' + groupId);

var slistContainer = $('.slist-container');

ws.onmessage = function(msg) {
    var data = JSON.parse(msg.data);
    if (data.act == 'Notify') {
        createNotify(data.status, data.message);
    } else if (data.act == 'AddList') {
        if (slistContainer.length == 0) {
            slistContainer = $('<div/>', {
                class: 'slist-container grid'
            }).appendTo($('section.page-section#slists > .section-content'));
            $('section.page-section#slists > .section-content > p.is-empty').remove();
        }

        var newSlist = $('<div/>', {
            class: 'slist',
            id: data.data.id
        }).appendTo(slistContainer);

        var slistHeader = $('<header/>', {
            class: 'slist-header'
        }).appendTo(newSlist);

        $('<h3/>').text(data.data.title).appendTo(slistHeader);

        var delButton = $('<a/>', {
            class: 'del-button'
        }).click(listDelClick).appendTo(slistHeader);

        $('<i/>', {
            class: 'fas fa-trash-alt'
        }).appendTo(delButton);

        $('<div/>', {
            class: 'items'
        }).appendTo(newSlist);

        var slistFooter = $('<footer/>', {
            class: 'slist-footer'
        }).appendTo(newSlist);

        var addButton = $('<a/>', {
            class: 'slist-add-items-button',
            href: '#',
            slist: data.data.id
        }).appendTo(slistFooter);

        addButton.html('<i class="fas fa-plus"></i> Добавить');
        addButton.click(addButtonClick);
    } else if (data.act == 'AddListItem') {
        var newListItems = $('.slist#' + data.data.listId + ' .slist-item.new');
        
        if (newListItems.length > 0) {
                newListItems.each(function() {
                if ($(this).text() == data.data.item.title) {
                    $(this).removeClass('new').attr('id', data.data.item.id);
                }
            });
        } else {
            var newItem = $('<div/>', {
                class: 'slist-item',
                id: data.data.item.id
            }).text(data.data.item.title).click(listItemClick).appendTo('.slist#' + data.data.listId + ' .items');

            var itemLink = $('<a/>', {
                class: 'del-button'
            }).click(listItemDelClick).appendTo(newItem);

            $('<i/>', {
                class: 'fas fa-trash-alt'
            }).appendTo(itemLink);
        }

    } else if (data.act == 'ChangeStateListItem') {
        var item = $('.slist-item#' + data.data.itemId);
        if (data.data.isDone) {
            if (!item.hasClass('done')) item.addClass('done');
        } else {
            if (item.hasClass('done')) item.removeClass('done');
        }
    } else if (data.act == 'DeleteListItem') {
        $('.slist-item#' + data.data.itemId).remove();
    } else if (data.act == 'DeleteList') {
        $('.slist').remove('#' + data.data.listId);
    } else {
        createNotify('info', msg.data);
    }
}

ws.onclose = function(e) {
    createNotify('Fail', 'Соединение потеряно!');
}