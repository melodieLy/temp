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
            let paginSetup = JSON.parse(request.getResponseHeader("X-Pagination"));
            //let totalsArrayPage = Array.from({length: paginationSetup.TotalPages}, (v, i) => i+1);
            data.totalArrayPage = [1,2];
            // const dataResult = JSON.stringify(paginationSetup);
            console.log(dataResult);
            $('#welcome-call').append(Mustache.render(component, {
                "PageSize":paginSetup.PageSize,
                "PageNumber":paginSetup.PageNumber,
                "TotalCount":paginSetup.TotalCount,
                "TotalPages":data.totalArrayPage,
                "nextPage": function () {
                    const result = this.PageNumber - 1;
                    if(result > this.totalPage) return undefined;
                    else return result;
                },
                "previousPage": function () {
                    const result = this.PageNumber - 1;
                    if(result == 0) return undefined;
                    else return result;
                }
            }));
        });
    }
})
.fail(function(xhr,textStatus, errorThrown) {
    getError(xhr,textStatus, errorThrown);
});
