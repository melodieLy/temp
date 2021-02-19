function createAssoData(assoName, assoId) {
  let copy = [];
  for (let i = 0; i < assoName.length; i++) {
    if(!cookies.actualAsso != i) {
      let element = {name: assoName[i], id: assoId[i]}
      copy.push(element);
    }
  }
  return copy;
}

function changeActualAssociation() {
  const newAsso = this.options[this.selectedIndex].value;

  if(newAsso === cookies.assoId[cookies.actualAsso]) return;
  else {
    console.log('else enter : ' + newAsso);
    changeActualAssociation(newAsso);
    document.location.reload();
  }
}

function changeAssociationPage(newAsso) {
  for (let i = 0; i < cookies.assoId.length; i++) {
    const element = cookies.assoId[i];
    if(element === newAsso) {
      document.cookie.replace("actualAsso="+cookies.actualAsso, "actualAsso="+i);
      console.log(document.cookie);
      cookies.actualAsso = i;
      alert("new asso : " +cookies.actualAsso);

    }
  }
}

$(function(){
  const t = createAssoData(cookies.assoName, cookies.assoId);
  $.get('components/sidebar_header.html', function(templates) {
    var component = $(templates).filter('#tpl-sidebar-header').html()
    $("#association").append(Mustache.render(
      component, {
        img_src:retrieveAssoLogo(),
        associations : t,
        actualName: cookies.assoName[cookies.actualAsso],
        actualId: cookies.assoId[cookies.actualAsso]
      }
    ))
  })
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