function createNotify(status, message) {
    var notifyId = "notify-info";
    if (status == 'Fail') notifyId = 'notify-error';

    var notify = $('<div/>', {
        id: notifyId,
        class: 'new'
    }).text(message).appendTo('body');

    setTimeout(() => notify.removeClass('new'), 100);

    setTimeout(function() {
        notify.addClass('rm');
        setTimeout(() => notify.remove(), 200);
    }, 4000);
}