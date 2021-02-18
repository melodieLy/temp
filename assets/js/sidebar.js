$(function(){
  $("#association").append(Mustache.render(
    template,{
    img_src:retrieveAssoLogo(),
    associations : function () {
      return createAssoData(cookies.assoName, cookies.assoId);
    },
    actualName: cookies.assoName[cookies.actualAsso]
  }))
});

function createAssoData(assoName, assoId) {
  let copy = [];
  for (let i = 0; i < assoName.length; i++) {
    if(!cookies.actualAsso != i) {
      const element = '{name:' + assoName[i] + ', id:'+ assoId[i] +'}';

      copy.push(element);
    }
  }
  return copy;
}

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
`<a href="welcome-call.html" title="ONG Conseil Dashboard" >
  <img src="{{img_src}}" class="brand-icon" width="56px;" id="logo" />    
</a>
<form class="brand-flex">
  <select class="brand-association">
  <option value="">{{actualName}}</option>
  {{#associations}}
  <option value="{{id}}">{{name}}</option>
  {{/associations}}  
  </select>
</form>`