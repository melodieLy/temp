$(function(){
  $("#association").append(Mustache.render(
    template,{
    img_src:retrieveAssoLogo(),
    // Name: cookies.assoName[cookies.actualAsso]
  }))
});

function retrieveAssoLogo() {
  return 'https://recette-api.song-fr.com/public/associations/'+cookies.assoId[cookies.actualAsso] + '/logo'
}

var url = window.location.href;
let element = document.getElementsByClassName("has-sub");
for (let i = 0; i < element.length; i++) {

    let navText = element[i].getElementsByTagName('a');
    for (let j = 0; j < navText.length; j++) {
        if(navText[j].href == url) {

            element[i].classList.toggle('active');
            element[i].classList.toggle('expand');
            let t = element[i].getElementsByTagName('ul');
            t[0].classList.toggle('show');
        }
    }
}

const template = 
`<img src="{{img_src}}" class="brand-icon" width="56px;" id="logo" />
<form>
<select class="brand-association">
<option value="">League contre le cancer</option>
<option value="">Medecin du monde</option>
</select>
</form>`