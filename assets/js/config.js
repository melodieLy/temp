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
