$.getScript("assets/js/config.js", function () {});

function Auth(theForm) {
  $.ajax({
    url: "https://recette-api.song-fr.com/swatoken",
    headers: {
      'content-Type': "application/x-www-form-urlencoded"
    },
    method: "POST",
    withCredentials: true,
    data : {
      grant_type:"password",            
      username: theForm.email.value,
      password: theForm.password.value,
    }
  })
    .done(function(result) {
      const time = 1000;
      let actualDate = new Date();
      actualDate.setTime(actualDate.getTime()+ (result.expires_in * time));
      createCookieAuth(result, actualDate, theForm.email.value);
      findAsso(result);
    })

    .fail(function(xhr) {
      if(xhr.status === 400) {
        alert('Connexion impossible. Veuillez vérifier votre identifiant et mot de passe.');
      }
    })
}

function createCookieAuth(setup,time,username) {
  document.cookie = "expires=" + time +";"; 
  document.cookie = "token="+setup.access_token+";";
  document.cookie = "username="+username+";";
};

function createCookieAsso(setup) {
  let assoNameList = "";
  let assoIdList = "";
  
  for ( i = 0; i < setup.length; i++) {
    if(setup[i].Role.Id.toUpperCase() === "FORMS-MANAGER") {
      if(i < 1) {
        rights.push(setup[i].Role.Id.toUpperCase());
        assoNameList = setup[i].Association.Name +",";
        assoIdList = setup[i].Association.Id +",";
      } else if (i == setup.length - 1) {
        assoNameList += setup[i].Association.Name;
        assoIdList += setup[i].Association.Id ;
      } else {
        assoNameList += setup[i].Association.Name +",";
        assoIdList += setup[i].Association.Id +",";
      }
    }
  }

  if(assoIdList.length == 0) return false;

  document.cookie = "assoName=" + assoNameList +";";
  document.cookie = "assoId=" + assoIdList + ";";
  document.cookie = "actualAsso=" + 0 + ';' 
};

function findAsso(param) {
  const token ="bearer " + param.access_token;
  $.ajax({
    url: "https://recette-api.song-fr.com/context/current-roles",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept":"application/json",
        "Authorization": token
    },
    method: "GET"
  })
  .done(function(result) {
    const rights = createCookieAsso(result);
    if(rights === false) alert("Vous n'avez pas les droits pour accéder au site. ");
    else EnvironmentRedirection();
  })

  .fail(function(xhr) {
      window.location.reload();
      alert(xhr.status + ' : Erreur lors du chargement des données. Veuillez-vous authentifier de nouveau. ');
  });
}