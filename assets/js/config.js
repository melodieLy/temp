const environnement = "prod";

function checkEnvironnement () {
    if(environnement == "prod") {
      window.location.replace("welcome-call.html");
    }
    else {
      window.location.replace("dashboard.html");
    }
  }