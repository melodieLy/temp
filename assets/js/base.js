//Call the new sidebar function for the recette version
$.getScript("assets/js/config.js", function () {
    //Verify if the user did the authentification
    $(document).ready(function() {
        checkValidateCookie();
    });

    if(environment == "prod") {
        $(function(){
            callSidebar();
            get("context/current-user",callheader);
        });
    }
    else {
        $(function(){
            $("#sidebar").load("sidebar.recette.html");
            $.getScript("assets/js/sidebar.js", function () {
                if(cookies.assoName.length <= 1) loadSimplySidebarHeader();
                else loadSidebarHeader();
            });
            get("context/current-user",callheaderDev);
        });
    }
   
});
//
//Please be careful of the path for the prod
//
function checkRightForthePage() {
    const userRights = sessionStorage.getItem('rights');
    $.getJSON("assets/js/sidebar_data.json", function(data) {
        data.forEach(element => {
            if(element.rights == userRights) {
                for (let i = 0; i < data.length; i++) {
                    const url = "/temp/" + element.category[i].URL;
                    if(url.includes(window.location.pathname)) return true;
                }
            }
        })
        window.location.replace("404.html");
    })
};

function checkValidateCookie() {
    if(cookies === undefined) {
        window.location.replace("index.html");
        alert("Aucune connexion trouvée. Veuillez-vous authentifier");
        
    } else if (cookies.expires < $.now()) {
        deleteCookie();
        window.location.replace('index.html');
        showAlert("Connexion expirée. Veuillez-vous reconnecter");
    }
}

function callSidebar(){
    $.get('sidebar.html', function(templates) {
        var sidebar = $(templates).filter('#tpl-sidebar').html();
        $.getJSON("assets/js/sidebar_data.json", function(data) {
            let result = [];
            data.forEach(element => {
                if(element.rights == sessionStorage.getItem("rights")) result.push(element);
            });
            var rendered = Mustache.render(sidebar, result);
            $('#sidebar').html(rendered).promise().done(function() {
                var url = window.location.href;
                let element = document.getElementsByClassName("has-sub");
                for (let i = 0; i < element.length; i++) { 
              
                    let navText = element[i].getElementsByTagName('a');
                    for (let j = 0; j < navText.length; j++) {
                        if(navText[j].href == url) {
              
                            element[i].classList.toggle('active');
                            element[i].classList.toggle('expand');
                            let t = element[i].getElementsByTagName('ul');
                            t[0].classList.toggle('show');
                        }
                    }
                }
            });
        })

        $.getScript("assets/js/sidebar.js", function () {
            if(cookies.assoName.length <= 1) loadSimplySidebarHeader();
            else loadSidebarHeader();
        });
    });
}

//Get element with Jquery + moustache
function callheader(result){
    $.get('header.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}

//Get element with Jquery + moustache
function callheaderDev(result){
    $.get('header.recette.html', function(templates) {
        var header = $(templates).filter('#tpl-header').html();
        $('#header').append(Mustache.render(header, result));
    });
}
  