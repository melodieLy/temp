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
  
  setup.forEach(element => {
    if(element.Role.Id === "FORMS-MANAGER") {
      assoNameList += element.Association.Name +",";
      assoIdList += element.Association.Id +",";
    }
  });
  document.cookie = "assoName=" + assoNameList +";";
  document.cookie = "assoId=" + assoIdList + ";";
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
    createCookieAsso(result);
    EnvironmentRedirection();
  })

  .fail(function(xhr) {
      window.location.reload();
      alert(xhr.status + ' : Erreur lors du chargement des données. Veuillez-vous authentifier de nouveau. ');
  });
}