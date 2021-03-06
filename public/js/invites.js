var invite_buttons = $('.invite-button');

// Перехвачиваем клик по кнопке и отправляем AJAX запрос
invite_buttons.click(function(e) {
    e.preventDefault();
    var _this = $(this);
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
                createNotify(data.status, data.message);

                // Если пользователь подтвердил участие в группе, добавляем группу в список
                if (inviteAction == 'apply') {
                    var group = $('<div/>', {
                        class: 'group grid'
                    }).appendTo($('.groups-container'));

                    var groupLink = $('<a/>', {
                        href: '/groups/' + data.group.id,
                        class: 'group-link grid'
                    }).appendTo(group);

                    $('<p/>', {
                        class: 'title'
                    }).text(data.group.title).appendTo(groupLink);

                    $('<p/>', {
                        class: 'members-conut'
                    }).html('<i class="fas fa-user"></i> ' + (data.group.Users.length + 1)).appendTo(groupLink);

                    $('<p/>', {
                        class: 'lists-count'
                    }).html('<i class="fas fa-clipboard-list"></i> ' + (data.group.Lists.length + 1)).appendTo(groupLink);
                }

                var invite = _this.parent('.invite');
                var inviteContainer = invite.parent('.section-content');
                var inviteSection = inviteContainer.parent('section.page-section');

                // Удаляем приглашение из списка
                invite.remove();
                if (inviteContainer.children().length == 0) inviteSection.remove();
            } else {
                // Уведомляем пользователя, если что-то не так
                createNotify(data.status, data.message);
            }
        },
        error: function() {
            // Уведомляем пользователя, если что-то не так
            createNotify('Fail', 'Возникла ошибка!');
        }
    });
});