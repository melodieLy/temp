const environment = "prod";

function EnvironmentRedirection () {
  if(environment == "prod") {
    window.location.replace("welcome-call.html");
  }
  else {
    window.location.replace("dashboard.html");
  }
}

function showAlert(errorInfo) {
  $.get('components/alert-danger.html', function(templates) {
    var alert = $(templates).filter('#tpl-alert-danger').html();
    let data = {"error" : errorInfo};
    $('#body').append(Mustache.render(alert, data));
  });
}

