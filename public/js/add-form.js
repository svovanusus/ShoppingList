var form = $('.add-form > form');

form.submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: $(this).serialize(),
        success: function(data) {
            data = JSON.parse(data);
            
            if (data.status == 'OK') {
                if (data.redirect) window.location.replace(data.redirect);
            }
            
            if (data.message) createNotify(data.status, data.message);
        },
        error: function() {
            createNotify('Fail', "Возникла ошибка!");
        }
    });
    $(this).children('input:not(input[type="submit"])').val('');
});