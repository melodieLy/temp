// get('calls/called/'+cookies.assoId+'?Page=1' , retrieveWelcomeCalls);

$.ajax({
    url: "https://recette-api.song-fr.com/calls/called/"+cookies.assoId+'?Page=1',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept":"application/json",
        "Authorization": cookies.token
    },
    method: "GET",
    success: function (data, textStatus, request) {
        $.get('components/wc_table.html', function(templates) {
            var component = $(templates).filter('#tpl-wc-table').html();
            $('#welcome-call').append(Mustache.render(component,data));
        });

        $.get('components/pagination.html', function(templates) {
            var component = $(templates).filter('#pagination-comp').html();
            console.log(request.getResponseHeader("X-Pagination"));
            console.log(request.getResponseHeader());
            const paginationSetup = JSON.parse(request.getResponseHeader("Content-Type"));
    
            console.log(paginationSetup);
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
        });
    }
})

.fail(function(xhr,textStatus, errorThrown) {
    getError(xhr,textStatus, errorThrown);
});

// function retrieveWelcomeCalls(data, Status,XMLHttpRequest) {
//     $.get('components/wc_table.html', function(templates) {
//         var component = $(templates).filter('#tpl-wc-table').html();
//         $('#welcome-call').append(Mustache.render(component,data));

//         // $('#basic-wc-table').DataTable({
//         //     "pageLength":20,
//         //     "serverSide": true,
//         //     "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">',
//         //     "initComplete": () => {$("#basic-wc-table").show();
//         //     }
//         //   });
//     });

    // $.get('components/pagination.html', function(templates) {
    //     var component = $(templates).filter('#pagination-comp').html();
        
    //     const paginationSetup = JSON.parse(XMLHttpRequest.getResponseHeader("X-Pagination"));

    //     console.log(paginationSetup);
    //     const totalsArrayPage = Array.from({length: paginationSetup.totalPage}, (v, i) => i+1);
    //     paginationSetup.totalArrayPage = totalsArrayPage;
    //     paginationSetup.previousPage = function () {
    //         const result = this.PageNumber - 1;
    //         if(result == 0) return undefined;
    //         else return result;
    //     }

    //     paginationSetup.nextPage = function () {
    //         const result = this.PageNumber - 1;
    //         if(result > this.totalPage) return undefined;
    //         else return result;
    //     }

    //     $('#welcome-call').append(Mustache.render(component,paginationSetup));
//     })
// };
