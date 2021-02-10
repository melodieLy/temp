if(!window.location.hash.includes("#")) {
    let data = 1;
    getWCPage(data);
}

function getWCPage (data) {
    $.ajax({
        url: "https://recette-api.song-fr.com/calls/called/"+cookies.assoId+'?Page='+data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": "bearer " + cookies.token
        },
        method: "GET",
        success: function (data, textStatus, request) {
            removeOldTable();

            $.get('components/wc_table.html', function(templates) {
                var component = $(templates).filter('#tpl-wc-table').html();
                //remove the first line $getjson after the end of the test please
                    $.getJSON("assets/js/wc_page.json", function (data) {
                    if(data) {
                        data.forEach(element => {
                            if(element.LastContact) element.LastContact = moment(element.LastContact).format('L');
                        });
                    }
                    $('#welcome-call').append(Mustache.render(component,data));
                })
            });
            
            $.get('components/pagination.html', function(templates) {
                var component = $(templates).filter('#pagination-comp').html();
                let paginSetup = JSON.parse(request.getResponseHeader("X-Pagination"));
                $('#pagination-row').append(Mustache.render(component, {
                    "PageSize":paginSetup.PageSize,
                    "PageNumber":paginSetup.PageNumber,
                    "TotalCount":paginSetup.TotalCount,
                    "TotalPages":paginSetup.TotalPages,
                    "nextPage": function () {
                        const result = paginSetup.PageNumber + 1;
                        if(result >= paginSetup.TotalPages) return paginSetup.TotalPages;
                        else return result;
                    },
                    "previousPage": function () {
                        const result = paginSetup.PageNumber - 1;
                        if(result == 0) return 1;
                        else return result;
                    }
                }));

            });
        }
    })
    .fail(function(xhr) {
        getError(xhr);
    });
}

function getWCPageWithParam (data) {
    const param = urlParam(data);

    $.ajax({
        url: "https://recette-api.song-fr.com/calls/called/"+cookies.assoId+'?='+data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept":"application/json",
            "Authorization": "bearer " + cookies.token
        },
        method: "GET",
        success: function (data, textStatus, request) {
            removeOldTable();

            $.get('components/wc_table.html', function(templates) {
                var component = $(templates).filter('#tpl-wc-table').html();
                //remove the first line $getjson after the end of the test please
                    $.getJSON("assets/js/wc_page.json", function (data) {
                    if(data) {
                        data.forEach(element => {
                            if(element.LastContact) element.LastContact = moment(element.LastContact).format('L');
                        });
                    }
                    $('#welcome-call').append(Mustache.render(component,data));
                })
            });
            
            $.get('components/pagination.html', function(templates) {
                var component = $(templates).filter('#pagination-comp').html();
                let paginSetup = JSON.parse(request.getResponseHeader("X-Pagination"));
                $('#pagination-row').append(Mustache.render(component, {
                    "PageSize":paginSetup.PageSize,
                    "PageNumber":paginSetup.PageNumber,
                    "TotalCount":paginSetup.TotalCount,
                    "TotalPages":paginSetup.TotalPages,
                    "nextPage": function () {
                        const result = paginSetup.PageNumber + 1;
                        if(result >= paginSetup.TotalPages) return paginSetup.TotalPages;
                        else return result;
                    },
                    "previousPage": function () {
                        const result = paginSetup.PageNumber - 1;
                        if(result == 0) return 1;
                        else return result;
                    }
                }));

            });
        }
    })
    .fail(function(xhr) {
        getError(xhr);
    });
}

function removeOldTable() {
    if($('table')) {
        $('table').remove();
        $('nav#nav-page').remove();
    }
}

function urlParam(data) {
    
}

function copyId(ongId) {
    const el = document.createElement('textarea');
    el.value = ongId;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }


function test (t) {
    const p = t.getElementsByTagName("input");
    console.log(p);
    for(const element of p) {
        console.log(element.value);
    };
    const yourSelect = document.getElementById( "area-select" ).value;

    let url = 'area='+yourSelect;
    for(const element of p) {
        url += '&' + element.name + "=" + element.value;
    };
    alert(url);
}