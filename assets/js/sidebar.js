get("public/associations/"+cookies.assoId+"/logo", retrieveAssoLogo);

$(function(){
    $("#association").append(Mustache.render('<span class="brand-name text-truncate">{{Name}}</span>',{name: cookies.asso}))
  });

function retrieveAssoLogo(data) {
    $.get('components/logo.html', function(templates) {
        var component = $(templates).filter('#association').html();
        $('#logo').append(Mustache.render(component,data));
    });
}