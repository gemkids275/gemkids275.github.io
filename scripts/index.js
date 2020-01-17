function checkLogin(e) {
    let user = getStorage("user"); // user object contains phone + name
    if (!user || !user.phone || !user.phone.match(/^[0-9]{10}$/g)) {
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
                            warning('Bạn chưa nhập họ tên');
                            return false;
                        }
                        if (!phone.match(/^[0-9]{10}$/g)) {
                            warning('Số điện thoại không đúng định dạng');
                            return false;
                        }
                        let user = {};
                        user.username = name;
                        user.phone = phone;
                        setStorage("user",user);
                        redirectToGame();
                    }
                },
                cancel: {
                    text: 'Hủy',
                    btnClass: 'btn-red',
                    action: function () {
                    }
                },
            },
        });
    } else {
        $.confirm({
            title: 'Tiếp tục chơi',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Họ và tên</label>' +
                '<input type="text" placeholder="Nhập nick name" class="username-input form-control" required' +
                ' value="' + user.username + '" readonly/>' +
                '<label>Số điện thoại</label>' +
                '<input type="text" placeholder="Nhập số điện thoại" class="phone-input form-control" required value="' + user.phone + '" readonly/>' +
                '</div>' +
                '</form>',
            columnClass : 'col-md-5 col-sm-12',
            buttons: {
                formSubmit: {
                    text: 'Tiếp tục',
                    btnClass: 'btn-blue',
                    action: function () {
                        redirectToGame();
                    }
                },
                somethingElse: {
                    text: 'Người chơi mới',
                    btnClass: 'btn-green',
                    action: function () {
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
                                        if (!name) {
                                            warning("Bạn chưa nhập họ tên");
                                            return false;
                                        }
                                        if (!phone.match(/^[0-9]{10}$/g)) {
                                            warning("Số điện thoại không đúng định dạng");
                                            return false;
                                        }
                                        removeStorage("user"); // xóa user cũ
                                        let user = {};
                                        user.username = name;
                                        user.phone = phone;
                                        setStorage("user",user);
                                        redirectToGame();
                                    }
                                },
                                cancel: {
                                    text: 'Hủy',
                                    btnClass: 'btn-red',
                                    action: function () {
                                    }
                                },
                            },
                        });
                    }
                },
                cancel: {
                    text: 'Hủy',
                    btnClass: 'btn-red',
                    action: function () {
                    }
                },
            },
        });
    }
}

function getScoreboardToday() {
    $.dialog({
        title: 'Bảng điểm hôm nay',
        content: function () {
            var self = this;
            return $.ajax({
                // async: false, // remove when api is available
                url: 'https://order.hoanghamobile.com/api/gamea51/scoreboard',
                dataType: 'json',
                method: 'GET'
            }).done(function (response) {
                let players = response.players;
                console.log(players)
            }).fail(function () {
                console.log("Failed!")
            }).always(function () {
                console.log("Normal ajax call")
            });
        },
        contentLoaded: function (data, status, xhr) {
            console.log(data)
        },
        onContentReady: function () {
        }
    });
}

function getScoreboardAllTime() {
    $.dialog({
        title: 'Bảng điểm cả tuần',
        content: function () {
            var self = this;
            return $.ajax({
                // async: false, // remove when api is available
                url: 'https://order.hoanghamobile.com/api/gamea51/scoreboard?time=all',
                dataType: 'json',
                method: 'GET'
            }).done(function (response) {
                let players = response.players
                console.log(players)
            }).fail(function () {
                console.log("Failed!")
            }).always(function () {
                console.log("Normal ajax call")
            });
        },
        contentLoaded: function (data, status, xhr) {
            console.log(data)
        },
        onContentReady: function () {
            // console.log("Content ready!")
        }
    });
}