get("public/associations/"+cookies.assoId+"/logo", retrieveAssoLogo);

function retrieveAssoLogo(data) {
    $.get('components/mails-summary.html', function(templates) {
        var component = $(templates).filter('#association').html();
        $('#logo').append(Mustache.render(component,data));
    });
}