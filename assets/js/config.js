const environment = "prod";

function EnvironmentRedirection () {
    if(environment == "prod") {
    }
    else {
      window.location.replace("dashboard.html");
    }
  }