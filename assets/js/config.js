const environment = "prod";

function EnvironmentRedirection () {
  if(environment == "prod") {
    window.location.replace("welcome-call.html");
  }
  else {
    window.location.replace("dashboard.html");
  }
}

$(document).ready(function() {
  var d = new Date();
  var year = d.getFullYear();
  document.getElementById("copy-year").innerHTML = year;
});

function isValidateCookie() {
  if (cookies === undefined) {
    window.location.replace("");
    alert("Aucune connexion trouvée. Veuillez-vous authentifier",'info');
    return false;
  }
  const expiration = new Date(cookies.expires);
  const today = new Date();
  if (expiration < today) {
      deleteSession();
      window.location.replace("/temp/index.html");
      alert("Connexion expirée. Veuillez-vous reconnecter",'danger');
      return false;
  } else {
    if(!checkRightForthePage()) {
      window.location.replace("404.html") 
      return false;
    }
    return true;
  }
}
