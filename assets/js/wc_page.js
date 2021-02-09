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
            "Authorization": cookies.token
        },
        method: "GET",
        success: function (data, textStatus, request) {
            removeOldTable();

            $.get('components/wc_table.html', function(templates) {
                var component = $(templates).filter('#tpl-wc-table').html();
                if(!data) {
                    data.forEach(element => {
                        if(element.LastContact) element.LastContact = moment(element.LastContact).format('L');
                    });
                }
                $('#welcome-call').append(Mustache.render(component,data));
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

            $('#pagination-row').append(Mustache.render(
                '<a onclick="" href="#"><button class="btn mb-1 btn btn-pill btn-primary">Exporter</button></a>',
                {}));            
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

// function disabledPaginationButton(totalPages) {
//     let pageButton = document.getElementById("nav-page");
//     let navText = pageButton.getElementsByTagName('li');

//     for (let i = 0; i < navText.length; i++) {
//         let hash = navText[i].children[0].hash.replace('#','');
//         hash = parseInt(hash);
//         if(hash ) {

//         }
//         for (let j = 0; j < navText.length; j++) {
//             if(element.) {

//                 element[i].classList.toggle('active');
//                 let t = element[i].getElementsByTagName('ul');
//                 t[0].classList.toggle('show');
//             }
//         }
//     }
// }