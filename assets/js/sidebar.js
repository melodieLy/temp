get("public/associations/"+cookies.assoId+"/logo", retrieveAssoLogo);

function retrieveAssoLogo(data) {
    $.get('components/logo.html', function(templates) {
        console.log(data);
        var component = $(templates).filter('#association').html();
        $('#logo').append(Mustache.render(component,data));
    });
}