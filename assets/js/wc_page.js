// get('calls/called/'+cookies.assoId+'?Page=1' , retrieveWelcomeCalls);

if(!window.location.hash.includes("#")) {
    const data;
    data.pagenumber = 1; 
    getWCPage(data);
}

function getWCPage (data) {
    if(data.pagenumber < 0 || data.pagenumber > data.max) {
        return showAlert("La page demandé est hors limite du nombre de page existant.")
    }

    $.ajax({
        url: "https://recette-api.song-fr.com/calls/called/"+cookies.assoId+'?Page='+data.pagenumber,
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
            
            removeOldTable();

            $.get('components/pagination.html', function(templates) {
                var component = $(templates).filter('#pagination-comp').html();
                let paginSetup = JSON.parse(request.getResponseHeader("X-Pagination"));
                // data.totalArrayPage = Array.from({length: paginSetup.TotalPages}, (v, i) => i+1);
                $('#welcome-call').append(Mustache.render(component, {
                    "PageSize":paginSetup.PageSize,
                    "PageNumber":paginSetup.PageNumber,
                    "TotalCount":paginSetup.TotalCount,
                    "TotalPages":paginSetup.TotalPages,
                    "nextPage": function () {
                        const result = this.PageNumber + 1;
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
}

function removeOldTable() {
    if($('table')) {
        $('table').remove();
        $('nav#nav-page').remove();
    }
}