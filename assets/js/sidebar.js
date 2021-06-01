function createAssoData(assoDigestList) {
  console.log(assoDigestList)
  let copy = [];
  const actualAsso = sessionStorage.getItem("assoId");

  for (let i = 0; i < assoDigestList.length; i++) {
    if(actualAsso != i) {
      let element = { name: assoDigestList[i].Value, id: assoDigestList[i].Id}
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
      Name: sessionStorage.getItem("assoId")
    });
    $("#association").html(rendered).promise().done(function() {
      showSelectedNavElement();
    })
  })
};

function loadSidebarHeader(){  
  get("associations/digest-list", function(data) {
    const dataAsso = createAssoData(data);

    $.get('components/sidebar_header.html', function(templates) {
      var component = $(templates).filter('#tpl-sidebar-header').html();
      const rendered = Mustache.render(
        component, {
          img_src:retrieveAssoLogo(),
          associations : dataAsso, 
          actualName: sessionStorage.getItem("assoName"),
          actualId: sessionStorage.getItem("assoId")
        })
      $('#association').html(rendered).promise().done(function() {
        showSelectedNavElement();
      });
    })
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

  if(newAsso === sessionStorage.getItem("assoId")) return;
  else {
    changeAssociationPage(newAsso);
    loadSidebarHeader();
    document.location.replace("welcome-call.html");
  }
}

function changeAssociationPage(newAsso) {
  const element = sessionStorage.getItem("assoId");
  if(element === newAsso)
  {
    sessionStorage.setItem("assoId", newAsso);
    sessionStorage.setItem("assoName", newAsso);
  }
}

function retrieveAssoLogo() {
  return 'https://recette-api.song-fr.com/public/associations/'+sessionStorage.getItem("assoId") + '/logo';
}