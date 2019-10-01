var invite_buttons = $('.invite-button');

invite_buttons.click(function(e) {
    e.preventDefault();
    var inviteId = $(this).attr('invite-id');
    var inviteAction = $(this).attr('invite-action');
    $.ajax({
        url: '/groups/invite',
        type: 'POST',
        data: {
            id: inviteId,
            action: inviteAction,
        },
        success: function(data) {
            data = JSON.parse(data);
            if (data.status == 'OK') {
                alert("Green! " + data.message);
            } else {
                alert("Red! " + data.message);
            }
        },
        error: function() {
            alert('Возникла ошибка!');
        }
    });
});