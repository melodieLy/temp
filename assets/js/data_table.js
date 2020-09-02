// $(document).ready(function() {
//     jQuery('#hoverable-data-table').DataTable({
//      "aLengthMenu": [[20, 30, 50, 75, -1], [20, 30, 50, 75, "All"]],
//      "pageLength": 20,
//      "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
//     });
//    });

$.get('components/members_table.html', function(templates) {
    var component = $(templates).filter('#tpl-members-table').html();
    $.getJSON("assets/js/data_table.json", function (data){
        $('#test').append(Mustache.render(component,data));
    })
    $('#basic-data-table').DataTable({
        "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
    });
    document.getElementById("basic-data-table_wrapper").style.width = "100%";
});