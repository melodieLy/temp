get('associations/'+cookies.assoId + '/flows', retrieveFlows);

function retrieveFlows(data) {
    $.get('components/flux_model.html', function(templates) {
        var component = $(templates).filter('#tpl-flux-pri').html();
        $('#flux').append(Mustache.render(component,data));
    });

    $.get('components/FTP_serv_model.html', function(templates) {
        var component = $(templates).filter('#tpl-ftp-serv').html();
        const r = data.DropServers;
        $('#serv').append(Mustache.render(component,data));
    });
}

$.get('components/flux_histo_model.html', function(templates) {
    var component = $(templates).filter('#tpl-flux-histo').html();
    const data = {}
    $('#histo').append(Mustache.render(component,data));
});
