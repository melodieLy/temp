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

function checkValidateCookie() {
  const expiration = new Date(cookies.expires);
  const today = new Date();
  if(cookies === undefined) {
      window.location.replace("index.html");
      alert("Aucune connexion trouvée. Veuillez-vous authentifier");
  } else if (expiration < today) {
      deleteSession();
      window.location.replace('/index.html');
      showAlert("Connexion expirée. Veuillez-vous reconnecter");
  }
}
