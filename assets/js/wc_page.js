if(!window.location.hash.includes("#")) {
    let data = 1;
    getWCPage(data, null);
}

// Rempli la combo-box "comité" de la searchbar. Appel la requête et rends visible ou non l'élement selon le résulat 
get("associations/"+cookies.assoId[cookies.actualAsso]+"/areas", getWCSearchbar);

function getWCSearchbar(data) {
    $.get('components/wc-search.html', function(templates) {
        var component = $(templates).filter('#tpl-wc-search').html();
        $('#form-row').append(Mustache.render(component,data));

        if(data == null) {
            let selectToHide = document.getElementsByClassName("col");
            selectToHide[0].setAttribute("style","display:none;");
        }

        fillSearchPageWithSessionStorage();
    });
};

function getWCPage (data,param) {
    const urlParam = getUrlParam(param);
    try {
        getWelcomeCall(data + urlParam);
    } catch (e) {
        console.error(e);
    }
};

function getUrlParam (form) {
    if(form != null) {
        const yourSelect = document.getElementById( "area-select" ).value;
        const input = form.getElementsByTagName("input");
    
        let url = '&Area='+yourSelect;
        for(const element of input) {
            url += '&' + element.name + '=' + element.value;
        };
        searchHistory(yourSelect,input);
        return url;
    }
    return "";
}

function copyId(ongId) {
    const el = document.createElement('textarea');
    el.value = ongId;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function fillSearchPageWithSessionStorage() {
    let area = document.getElementById('area-select');
    area.value = localStorage.getItem("area");

    let inputs = document.getElementById("form-row").getElementsByTagName('input');
    for(const element of inputs) {
        element.value = localStorage.getItem(element.name);
    };
}

function searchHistory(select,inputs) {
    if(select != "") sessionStorage.setItem("area", select.value);
    for(const element of inputs) {
        if(element.value) sessionStorage.setItem(element.name, element.value);
    };
}

function deleteSeachHistory() {
    sessionStorage.clear();
    document.getElementById( "area-select" ).value = "";

    let input = document.getElementById("form-row").getElementsByTagName('input');
    for(const element of input) {
        element.value = "";
    };
}