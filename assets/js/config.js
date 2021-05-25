/// Main parameter to configure the environment
/// 25.05.21 : The recette environment need to be check again see the main page is dashboard
const environment = "prod";

/// Depending of the environment, redirect the user.
/// Don't really useful for now since the dashboard is not use right now
function EnvironmentRedirection () {
  if(environment == "prod") {
    window.location.replace("welcome-call.html");
  }
  else {
    window.location.replace("welcome-call.html");
    //window.location.replace("dashboard.html");
  }
}

/// Change the years of the copyrights
$(document).ready(function() {
  var d = new Date();
  var year = d.getFullYear();
  document.getElementById("copy-year").innerHTML = year;
});

/// To Check - Verify the cookies
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
