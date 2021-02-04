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
            console.log(request.getAllResponseHeaders());
            console.log("pagi: " + request.getResponseHeader("X-Pagination"));
            // const paginationSetup = JSON.parse(request.getResponseHeader("Content-Type"));
    
            // console.log(paginationSetup);
            // const totalsArrayPage = Array.from({length: paginationSetup.totalPage}, (v, i) => i+1);
            // paginationSetup.totalArrayPage = totalsArrayPage;
            // paginationSetup.previousPage = function () {
            //     const result = this.PageNumber - 1;
            //     if(result == 0) return undefined;
            //     else return result;
            // }
    
            // paginationSetup.nextPage = function () {
            //     const result = this.PageNumber - 1;
            //     if(result > this.totalPage) return undefined;
            //     else return result;
            // }
    
            // $('#welcome-call').append(Mustache.render(component,paginationSetup));
        });
    }
})

.fail(function(xhr,textStatus, errorThrown) {
    getError(xhr,textStatus, errorThrown);
});