
$(document).ready(function () {
    $.ajax({ method: 'GET', url: '/Home/GetDesignations' }).done(function (response) {
        var arr = JSON.parse(response);
        for (var i = 0; i < arr.length; i++) {
            var newrow = '<tr><td class="td">' + arr[i].id + '</td><td class="td" id="dn' + arr[i].id+'">' + arr[i].name + '</td>';
            newrow += '<td><button type="button" class="btn btn-primary btn-sm" onclick="update_des(' + arr[i].id + ')"><span class="glyphicon glyphicon-pencil" ></span ></button ></td ></tr > ';
            $('#des_table').append(newrow);
        }
    });

    $('#close_form').click(function () {
        $('#name').val('');
        $('#des_form').hide();
    });
    $('#close_update_form').click(function () {
        console.log("cf");
        $('#update_name').val('');
        $('#update_form').hide();
    });

    $('#add_des').click(function () {
        $('#des_form').show();

    });

    $('#des_form').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    });

    $('#submit').click(function () {
        var submit_data = {
            "id": "12",
            "operation": "add",
            "name": $('#name').val()
        };
        $('#des_form').hide();
        console.log(JSON.stringify(submit_data));
        $.ajax({ method: 'POST', url: '/Home/DesignationFunctions', data: submit_data }).done(function (response) {
            console.log(response);
            $('#name').val('');
            $('#des_form').hide();
            $('#des_table').html('<thead><tr class="tr"><th>ID</th><th>Name</th><th></th></tr></thead >');
            $.ajax({ method: 'GET', url: '/Home/GetDesignations' }).done(function (response) {
                var arr = JSON.parse(response);
                for (var i = 0; i < arr.length; i++) {
                    var newrow = '<tr><td class="td">' + arr[i].id + '</td><td class="td" id="dn' + arr[i].id + '">' + arr[i].name + '</td>';
                    newrow += '<td><button type="button" class="btn btn-primary btn-sm" onclick="update_des(' + arr[i].id + ')"><span class="glyphicon glyphicon-pencil" ></span ></button ></td ></tr > ';
                    $('#des_table').append(newrow);
                }
            });
        }).fail(function () {
            swal("Oops! We faced an error.",
                {

                    icon: "warning",
                    timer: 900,
                    buttons: false
                });
        });
    });

    $('#submit_update').click(function () {
        var submit_data = {
            "id": $('#update_id').val(),
            "operation": "update",
            "name": $('#update_name').val()
        };
        $('#update_form').hide();
        console.log(JSON.stringify(submit_data));
        $.ajax({ method: 'POST', url: '/Home/DesignationFunctions', data: submit_data }).done(function (response) {
            console.log(response);
            $('#name').val('');
            $('#des_form').hide();
            $('#des_table').html('<thead><tr class="tr"><th>ID</th><th>Name</th><th></th></tr></thead >');
            $.ajax({ method: 'GET', url: '/Home/GetDesignations' }).done(function (response) {
                var arr = JSON.parse(response);
                for (var i = 0; i < arr.length; i++) {
                    var newrow = '<tr><td class="td">' + arr[i].id + '</td><td class="td" id="dn' + arr[i].id + '">' + arr[i].name + '</td>';
                    newrow += '<td><button type="button" class="btn btn-primary btn-sm" onclick="update_des(' + arr[i].id + ')"><span class="glyphicon glyphicon-pencil" ></span ></button ></td ></tr > ';
                    $('#des_table').append(newrow);
                }
            });
        }).fail(function () {
            swal("Oops! We faced an error.",
                {

                    icon: "warning",
                    timer: 900,
                    buttons: false
                });
        });
    });
});

function update_des(id) {
    var nid = '#dn' + id;
    console.log($(nid).html())
    $('#update_id').val(id);
    $('#update_name').val($(nid).html());
    $('#update_form').show();
}