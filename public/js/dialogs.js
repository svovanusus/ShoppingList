function openDialog(title, text, confirmFunction) {
    var body = $('body')
        .addClass('blocked');

    var overlay = $('<div/>', { class: 'overlay transparent' })
        .appendTo(body);

    var dialog = $('<div/>', { class: 'dialog hidden' })
        .appendTo(overlay);
    
    setTimeout(function() {
        overlay.removeClass('transparent');
        dialog.removeClass('hidden');
    }, 50);

    var dialogHeader = $('<header/>', { class: 'dialog-header' })
        .appendTo(dialog);

    var closeButton = $('<a/>', { href: '#', class: 'close-button to-right' })
        .click(function(e) {
            e.preventDefault();
            overlay.addClass('transparent');
            dialog.addClass('hidden');
            setTimeout(function() {
                overlay.remove();
                body.removeClass('blocked');
            }, 200);
        }).appendTo(dialogHeader);

    $('<i/>', { class: 'fas fa-times' })
        .appendTo(closeButton);

    $('<h3/>')
        .text(title)
        .appendTo(dialogHeader);


    var dialogContent = $('<div/>', { class: 'dialog-content' })
        .appendTo(dialog);

    $('<p/>')
        .text(text)
        .appendTo(dialogContent);


    var dialogFooter = $('<footer/>', { class: 'dialog-footer' })
        .appendTo(dialog);

    var confirmButton = $('<a/>', { href: '#', class: 'button confirm-button' })
        .html('<i class="fas fa-check"></i> Да')
        .click(function(e) {
            e.preventDefault();
            overlay.addClass('transparent');
            dialog.addClass('hidden');
            setTimeout(function() {
                overlay.remove();
                body.removeClass('blocked');
            }, 200);
            confirmFunction();
        }).appendTo(dialogFooter);

    var cancelButton = $('<a/>', { href: '#', class: 'button button-dark cancel-button' })
        .html('<i class="fas fa-times"></i> Отмена')
        .click(function(e) {
            e.preventDefault();
            overlay.addClass('transparent');
            dialog.addClass('hidden');
            setTimeout(function() {
                overlay.remove();
                body.removeClass('blocked');
            }, 200);
        }).appendTo(dialogFooter);
}