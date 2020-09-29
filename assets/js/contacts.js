get('associations/'+cookies.assoId + '/contacts', retrieveContacts);

function retrieveContacts(data) {
    $.get('components/contacts_table.html', function(templates) {
        var component = $(templates).filter('#tpl-contacts-table').html();
        $('#contacts').append(Mustache.render(component,data));
        $(document).ready(function() {
            $('#contacts').DataTable({
                // "aLengthMenu": [[10, 30, 50, 75, -1], [10, 30, 50, 75, "All"]],
                // "pageLength": 10,
                "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
            });
            document.getElementById("basic-data-table_wrapper").style.width = "100%";
        });
    });
};
// $(document).ready(function() {
//     jQuery('#hoverable-data-table').DataTable({
//      "aLengthMenu": [[20, 30, 50, 75, -1], [20, 30, 50, 75, "All"]],
//      "pageLength": 20,
//      "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
//     });
//    });