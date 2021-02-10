if(!window.location.hash.includes("#")) {
    let data = 1;
    getWCPage(data, null);
}

// get("association"+cookies.assoId+"/areas", getWCSearchbar);
get("association/LNCC/areas", getWCSearchbar);

function getWCSearchbar(data) {
    $.get('components/wc_searchbar.html', function(templates) {
        var component = $(templates).filter('#tpl-wc-search').html();
        if(data == null) {
            let tagToHide = component.document.getElementById('area-select');
            tagToHide.setAttribute("style","display:none;");
        }
        fillSearchPageWithSessionStorage(component);
        $('#welcome-call').append(Mustache.render(component,data));
    });
}

function fillSearchPageWithSessionStorage(component) {
    let area = component.getElementById('area');
    area.value = localStorage.getItem("area");

    let inputs = component.getElementsByTagName('input');
    for(const element of inputs) {
        element.value = localStorage.getItem(element.name);
    };
}

function getWCPage (data,param) {
    const urlParam = getUrlParam(param);

    $.ajax({
        url: "https://recette-api.song-fr.com/calls/called/"+cookies.assoId+'?Page='+data + urlParam,
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
                // $.getJSON("assets/js/wc_page.json", function (data) {
                    if(data) {
                        data.forEach(element => {
                            if(element.LastContact) element.LastContact = moment(element.LastContact).format('L');
                        });
                    }
                    $('#welcome-call').append(Mustache.render(component,data));
                // })
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

};

function getWCPageWithParam (data) {
    const param = getUrlParam(data);

    $.ajax({
        url: "https://recette-api.song-fr.com/calls/called/"+cookies.assoId+'?'+param,
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
                // $.getJSON("assets/js/wc_page.json", function (data) {
                    if(data) {
                        data.forEach(element => {
                            if(element.LastContact) element.LastContact = moment(element.LastContact).format('L');
                        });
                    }
                    $('#welcome-call').append(Mustache.render(component,data));
                // })
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

function copyId(ongId) {
    const el = document.createElement('textarea');
    el.value = ongId;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

function getUrlParam (form) {
    if(form != null || form != "") {
        const yourSelect = document.getElementById( "area-select" ).value;
        const input = form.getElementsByTagName("input");
    
        let url = '&area='+yourSelect;
        for(const element of input) {
            url += '&' + element.name + '=' + element.value;
        };
        searchHistory(yourSelect,input);
        return url;
    }
    return "";
}

function searchHistory(select,inputs) {
    if(select != "") sessionStorage.setItem("area", select.value);
    for(const element of inputs) {
        if(element.value) sessionStorage.setItem(element.name, element.value);
    };
}