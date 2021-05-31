
get('associations/'+sessionStorage.getItem("assoId") + '/contacts',retrieveContacts);

function retrieveContacts(data) {
    $.get('components/contacts_table.html', function(templates) {
        var component = $(templates).filter('#tpl-contacts-table').html();
        $('#contacts').append(Mustache.render(component,data));
        $('#basic-contacts-table').DataTable({
            "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">',
            "initComplete": () => {$("#basic-contacts-table").show();}
          });
        $('#basic-contacts-table_wrapper').css("width","100%");
    });
};

