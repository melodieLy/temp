
get('associations/'+cookies.assoId + '/contacts',retrieveContacts);

function retrieveContacts(data) {
    $.get('components/wc_table.html', function(templates) {
        var component = $(templates).filter('#tpl-wv-table').html();
        $('#welcome-call').append(Mustache.render(component,data));
        $('#basic-contacts-table').DataTable({
            "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">',
            "initComplete": () => {$("#basic-contacts-table").show();}
          });
        $('#basic-contacts-table_wrapper').css("width","100%");
    });
};

