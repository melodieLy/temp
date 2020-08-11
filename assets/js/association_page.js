$.get('components/flux_principal.html', function(templates) {
    var component = $(templates).filter('#tpl-flux-pri').html();
    const data = {}
    $('#flux').append(Mustache.render(component,data));
});