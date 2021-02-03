get('calls/called/'+cookies.assoId+'?Page=1' , retrieveWelcomeCalls);

function retrieveWelcomeCalls(data) {
    $.get('components/wc_table.html', function(templates) {
        var component = $(templates).filter('#tpl-wc-table').html();
        $('#welcome-call').append(Mustache.render(component,data));

        var paginationSetup = JSON.parse(pm.response.headers.get("X-Pagination"));
        const totalPage = paginationSetup.totalPage;
        pm.environment.set("nextPageLink", nextPageLink);

        // $('#basic-wc-table').DataTable({
        //     "pageLength":20,
        //     "serverSide": true,
        //     "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">',
        //     "initComplete": () => {$("#basic-wc-table").show();
        //     }
        //   });
    });
};