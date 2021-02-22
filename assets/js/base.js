$.getScript("assets/js/config.js", function () {
    if(environment == "prod") {
        $(function(){
            $("#sidebar").load("sidebar.html");
            getPublic('public/associations/'+cookies.assoId[cookies.actualAsso] + '/logo', test);
            get("context/current-user",callheader);
        });
        if(!window.location.pathname.includes("welcome-call")) {
            window.location.replace("welcome-call.html");
        }
    }
    else {
        $(function(){
            $("#sidebar").load("sidebar.recette.html");
            $.getScript("assets/js/sidebar.js", function () {
            });
            get("context/current-user",callheaderDev);
        });
    }
   
});

//Get element with Jquery + moustache
function callheader(result){
    $.get('header.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}

//Get element with Jquery + moustache
function callheaderDev(result){
    $.get('header.recette.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}
//
//
function createAssoData(assoName, assoId) {
    let copy = [];
    for (let i = 0; i < assoName.length; i++) {
      if(!cookies.actualAsso != i) {
        console.log("name : " + assoName[i]);
        let element = {name: assoName[i], id: assoId[i]}
        copy.push(element);
        console.log('copy : ' + copy);
      }
    }
    return copy;
  }
  
  function test(data){
    $.get('components/sidebar_header.html', function(templates) {
      var component = $(templates).filter('#tpl-sidebar-header').html()
      $("#association").append(Mustache.render(
        component, {
          img_src:data,
          associations : createAssoData(cookies.assoName, cookies.assoId),
          actualName: cookies.assoName[cookies.actualAsso],
          actualId: cookies.assoId[cookies.actualAsso]
        }
      ))
    })
  };
  
  function changeActualAssociation() {
    const newAsso = this.options[this.selectedIndex].value;
  
    if(newAsso === cookies.assoId[cookies.actualAsso]) return;
    else {
      changeAssociationPage(newAsso);
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
  
//   function retrieveAssoLogo() {
//     return 'https://recette-api.song-fr.com/public/associations/'+cookies.assoId[cookies.actualAsso] + '/logo'
//   }
  
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