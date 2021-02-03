
get('calls/called/'+cookies.assoId , retrieveWelcomeCalls);

function retrieveWelcomeCalls(data) {
    $.get('components/wc_table.html', function(templates) {
        var component = $(templates).filter('#tpl-wc-table').html();
        $('#welcome-call').append(Mustache.render(component,data));
        // $('#basic-wc-table').DataTable({
        //     "pageLength":20,
        //     "serverSide": true,
        //     "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">',
        //     "initComplete": () => {$("#basic-wc-table").show();
        //     }
        //   });
    });
};