//Call the new sidebar function for the recette version
$.getScript("assets/js/config.js", function () {
    //Verify if the user did the authentification
    $(document).ready(function() {
        checkValidateCookie();
    });

    if(environment == "prod") {
        $(function(){
            callSidebar();
            $.getScript("assets/js/sidebar.js", function () {
                if(cookies.assoName.length <= 1) loadSimplySidebarHeader();
                else loadSidebarHeader();
            });
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
    let result = false;
    $.getJSON("assets/js/sidebar_data.json", function(datas) {
        datas.forEach( sidebarElement => {
            sidebarElement.rights.forEach(sidebarRight => {
                if( userRights == sidebarRight ) {
                    for (let j = 0; j < sidebarElement.category.length; j++) {
                        const url = "/temp/" + sidebarElement.category[j].URL;
                        if(url.includes(window.location.pathname)) result = true;
                    }
                }
            })
        })
    })
    return result;
};

function callSidebar(){
    $.get('sidebar.html', function(templates) {
        var sidebar = $(templates).filter('#tpl-sidebar').html();
        $.getJSON("assets/js/sidebar_data.json", function(data) {
            let result = [];
            data.forEach(element => {
                let i = 0;
                do{
                    if(element.rights[i] == sessionStorage.getItem("rights")) result.push(element);
                    i = i + 1;
                } while (i < element.rights.length-1)
            });
            $('#sidebar').append(Mustache.render(sidebar, result));
        })
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
  