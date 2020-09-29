get('associations/'+cookies.assoId + '/contacts', retrieveContacts);

function retrieveContacts(data) {
    $.get('components/contacts_table.html', function(templates) {
        var component = $(templates).filter('#tpl-contacts-table').html();
        $('#contacts').append(Mustache.render(component,data));
        $('#basic-data-table').DataTable({
            "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
        });
        document.getElementById("basic-data-table_wrapper").style.width = "100%";
    });   
};