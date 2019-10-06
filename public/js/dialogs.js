// Функция для отображения диалога
function openDialog(title, text, confirmFunction) {
    // Блокируем контент страницы
    var body = $('body')
        .addClass('blocked');

    // Отображаем зетенение фона
    var overlay = $('<div/>', { class: 'overlay transparent' })
        .appendTo(body);

    // Отображаем диалоговое окно
    var dialog = $('<div/>', { class: 'dialog hidden' })
        .appendTo(overlay);
    
    // Задержка для анимации
    setTimeout(function() {
        overlay.removeClass('transparent');
        dialog.removeClass('hidden');
    }, 50);

    // Заголовок окна
    var dialogHeader = $('<header/>', { class: 'dialog-header' })
        .appendTo(dialog);

    // Кнопка закрытия окна
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

    // Иконка в кнопке закрытия окна
    $('<i/>', { class: 'fas fa-times' })
        .appendTo(closeButton);

    // Текстовый заголовок
    $('<h3/>')
        .text(title)
        .appendTo(dialogHeader);

    // Блок с контентом окна
    var dialogContent = $('<div/>', { class: 'dialog-content' })
        .appendTo(dialog);

    // Блок с текстом сообщения в окне
    $('<p/>')
        .text(text)
        .appendTo(dialogContent);

    // Подвал окна
    var dialogFooter = $('<footer/>', { class: 'dialog-footer' })
        .appendTo(dialog);

    // Кнопка подтверждения
    $('<a/>', { href: '#', class: 'button confirm-button' })
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
        }).appendTo(dialogFooter).focus();

    // Кнопка отмены
    $('<a/>', { href: '#', class: 'button button-dark cancel-button' })
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