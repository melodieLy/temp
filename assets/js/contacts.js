
get('associations/'+cookies.assoId + '/contacts',retrieveContacts);
function retrieveContacts(data) {
    $.get('components/contacts_table.html', function(templates) {
        var component = $(templates).filter('#tpl-contacts-table').html();
        $('#contacts').append(Mustache.render(component,data)); 
    });
};