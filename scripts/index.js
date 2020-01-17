function checkLogin (e) {
    let phone = localStorage.getItem('currentUserPhone');
    if (!phone) {
        $.confirm({
            title: 'Thông tin người chơi',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Họ và tên</label>' +
                '<input type="text" placeholder="Nhập tên" class="name-input form-control" required />' +
                '<label>Số điện thoại</label>' +
                '<input type="text" placeholder="Nhập số điện thoại" class="phone-input form-control" required />' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Chơi',
                    btnClass: 'btn-blue',
                    action: function () {
                        let name = this.$content.find('.name-input').val();
                        let phone = this.$content.find('.phone-input').val();
                        if(!name){
                            $.alert('Bạn chưa nhập họ tên');
                            return false;
                        }
                        if (!phone.match(/^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4,5})$/g)) {
                            $.alert('Số điện thoại không đúng định dạng');
                            return false;
                        }
                        localStorage.setItem('phone', phone);
                        localStorage.setItem('name', name);
                        let href = window.location.href;
                        href = href.replace('index.', 'game.');
                        window.location.href = href
                    }
                },
                cancel: {
                    text: 'Hủy',
                    btnClass: 'btn-red',
                    action: function () {
                    }
                },
            },
            // onContentReady: function () {
            //     // bind to events
            //     var jc = this;
            //     this.$content.find('form').on('submit', function (e) {
            //         // if the user submits the form by pressing enter in the field.
            //         e.preventDefault();
            //         jc.$$formSubmit.trigger('click'); // reference the button and click it
            //     });
            // }
        });
    }
    else {
        let href = window.location.href;
        href = href.replace('index.', 'game.');
        console.log(href);
        window.location.replace(href)
    }
}

function getCurrentUserPhoneNumber() {
    return localStorage.getItem('currentUserPhone')
}