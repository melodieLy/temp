get('calls/called/'+cookies.assoId+'?Page=1' , retrieveWelcomeCalls);

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

    $.get('components/pagination.html', function(templates) {
        var component = $(templates).filter('#pagination-comp').html();
        
        const paginationSetup = JSON.parse(data.getResponseHeader("X-Pagination"));
        const totalsArrayPage = Array.from({length: paginationSetup.totalPage}, (v, i) => i+1);
        paginationSetup.totalArrayPage = totalsArrayPage;
        paginationSetup.previousPage = function () {
            const result = this.PageNumber - 1;
            if(result == 0) return undefined;
            else return result;
        }

        paginationSetup.nextPage = function () {
            const result = this.PageNumber - 1;
            if(result > this.totalPage) return undefined;
            else return result;
        }

        $('#welcome-call').append(Mustache.render(component,paginationSetup));
    })
};
