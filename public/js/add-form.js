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
                if (data.message) alert(data.message);
            }
            else alert(data.message);
        },
        error: function() {
            alert('Возникла ошибка!');
        }
    });
});