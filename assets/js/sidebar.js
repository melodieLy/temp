$(function(){
  $("#association").append(Mustache.render(
    template,{
    img_src:retrieveAssoLogo(),
    name : function () {
      return hardCopy(cookies.assoName);
    },
    id : function () {
      return hardCopy(cookies.assoId);
    },
    actualName: cookies.assoName[cookies.actualAsso]
  }))
});

function hardCopy(originalArray) {
  let copy = [];
  for (let i = 0; i < originalArray.length; i++) {
    if(cookies.actualAsso != i) {
      const element = originalArray[i];
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
  {{#name}}
  <option value="{{id}}">{{name}}</option>
  {{/name}}  
  </select>
</form>`