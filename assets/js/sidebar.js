$(function(){
  $("#association").append(Mustache.render('<img src="{{img_src}}" class="brand-icon" width="70" id="logo" /><span class="brand-name text-truncate">{{Name}}</span>',{
    img_src:retrieveAssoLogo(),
    Name: cookies.asso
  }))
});

function retrieveAssoLogo() {
  return 'https://recette-api.song-fr.com/public/associations/'+cookies.assoId + '/logo'
}