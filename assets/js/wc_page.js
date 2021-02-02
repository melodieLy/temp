
get('calls/called/'+cookies.assoId , retrieveWelcomeCalls);

function retrieveWelcomeCalls(data) {
    $.get('components/wc_table.html', function(templates) {
        var component = $(templates).filter('#tpl-wc-table').html();
        $('#welcome-call').append(Mustache.render(component,data));
        $('#basic-wc-table').DataTable({
            "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">',
            "initComplete": () => {$("#basic-wc-table").show();}
          });
        $('#basic-wc-table_wrapper').css("width","100%");
    });
};

