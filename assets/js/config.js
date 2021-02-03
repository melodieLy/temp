const environnement = "prod";

function EnvironmentRedirection () {
    if(environnement == "prod") {
      window.location.replace("welcome-call.html");
    }
    else {
      window.location.replace("dashboard.html");
    }
  }