
get('associations/'+cookies.assoId + '/contacts',retrieveContacts);

function retrieveContacts(data) {
    $.get('components/contacts_table.html', function(templates) {
        var component = $(templates).filter('#tpl-contacts-table').html();
        $('#contacts').append(Mustache.render(component,data));
        // $('#basic-contacts-table').DataTable({
        //     "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">',
        //     "initComplete": () => {$("#basic-contacts-table").show();}
        //   });
    });
};

// $document.ready(function(){
//     $('#myTable').DataTable({
//         "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">',
//         "ajax": {
//             "url": "https://recette-api.song-fr.com/associations/Aides/contacts",
//             "type": "GET",
//             "headers": {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Accept":"application/json",
//                 "Authorization": cookies.token
//             }
//         }
//     })
// })

