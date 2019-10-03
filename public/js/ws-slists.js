var ws = new WebSocket('ws://localhost:3000/lists/' + groupId);

var slistContainer = $('.slist-container');

ws.onmessage = function(msg) {
    var data = JSON.parse(msg.data);
    if (data.act == 'AddList') {
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

        var h3 = $('<h3/>').appendTo(slistHeader);
        h3.text(data.data.title);

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

        addButton.text('Добавить элемент');
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
            $('<div/>', {
                class: 'slist-item',
                id: data.data.item.id
            }).text(data.data.item.title).appendTo('.slist#' + data.data.listId + ' .items');
        }

    } else {
        alert(msg.data);
    }
}

ws.onclose = function(e) {
    alert('Соединение потеряно!');
}