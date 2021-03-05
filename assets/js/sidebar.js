function createAssoData(assoName, assoId) {
  let copy = [];
  for (let i = 0; i < assoName.length; i++) {
    if(cookies.actualAsso != i) {
      let element = {name: assoName[i], id: assoId[i]}
      copy.push(element);
    }
  }
  return copy;
}

function loadSimplySidebarHeader() {
  $.get('components/sidebar_header_simple.html', function(templates) {
  var component = $(templates).filter('#tpl-sidebar-simply').html();
  const rendered = Mustache.render(
    component,{
    img_src:retrieveAssoLogo(),
    Name: cookies.assoName[cookies.actualAsso]
  });
    $("#association").html(rendered).promise().done(showSelectedNavElement());
  })
};

function loadSidebarHeader(){
  let t = createAssoData(cookies.assoName, cookies.assoId);

  $.get('components/sidebar_header.html', function(templates) {
    var component = $(templates).filter('#tpl-sidebar-header').html();
    const rendered = Mustache.render(
      component, {
        img_src:retrieveAssoLogo(),
        associations : t, 
        actualName: cookies.assoName[cookies.actualAsso],
        actualId: cookies.assoId[cookies.actualAsso]
      })
    $('#association').html(rendered).promise().done(function() {
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
    });
  })
};

function showSelectedNavElement() {
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
};

function changeActualAssociation() {
  const newAsso = this.options[this.selectedIndex].value;

  if(newAsso === cookies.assoId[cookies.actualAsso]) return;
  else {
    changeAssociationPage(newAsso);
    loadSidebarHeader();
    document.location.replace("welcome-call.html");
  }
}

function changeAssociationPage(newAsso) {
  const names = ["username", "token","assoName", "assoId", "expires","actualAsso"];

  for (let i = 0; i < cookies.assoId.length; i++) {
    const element = cookies.assoId[i];
    if(element === newAsso) {
      cookies.actualAsso = i;
      break;
    }
  }

  names.forEach(element => {
    document.cookie = element+"="+ cookies[element] +";";
  });
}

function retrieveAssoLogo() {
  return 'https://recette-api.song-fr.com/public/associations/'+cookies.assoId[cookies.actualAsso] + '/logo'
}