
// function retrieveContacts(data) {
        $(document).ready(function() {
            $('#basic-data-table').DataTable({
                // "aLengthMenu": [[10, 30, 50, 75, -1], [10, 30, 50, 75, "All"]],
                // "pageLength": 10,
                "processing": true,
                "serverSide": true,
                "ajax": {
                    url: "https://recette-api.song-fr.com/"+'associations/'+cookies.assoId + '/contacts',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept":"application/json",
                        "Authorization": cookies.token
                    },
                    method: "GET",
                    "data": function ( d ) {
                        console.log("att");
                        var component = $(templates).filter('#tpl-contacts-table').html();
                        $('#contacts').append(Mustache.render(component,d)); 
                    }
                },
                "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
            });
            // $.get('components/contacts_table.html', function(templates) {
            //     var component = $(templates).filter('#tpl-contacts-table').html();
            //     $('#contacts').append(Mustache.render(component,data)); 
            // });
        });
    // });
// };
// $(document).ready(function() {
//     jQuery('#hoverable-data-table').DataTable({
//      "aLengthMenu": [[20, 30, 50, 75, -1], [20, 30, 50, 75, "All"]],
//      "pageLength": 20,
//      "dom": '<"row justify-content-between top-information"lf>rt<"row justify-content-between bottom-information"ip><"clear">'
//     });
//    });