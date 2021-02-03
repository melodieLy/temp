const environment = "prod";

function EnvironmentRedirection () {
    if(environment == "prod") {
      window.location.replace("welcome-call.html");
    }
    else {
      window.location.replace("dashboard.html");
    }
  }