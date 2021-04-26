if(!window.location.hash.includes("#")) {
    let data = 1;
    getWCPage(data, null);
}

// Rempli la combo-box "comité" de la searchbar. Appel la requête et rends visible ou non l'élement selon le résulat 
get("associations/"+cookies.assoId[cookies.actualAsso]+"/areas", getWCSearchbar);

function getWCSearchbar(data) {
    $.get('components/wc-search.html', function(templates) {
        var component = $(templates).filter('#tpl-wc-search').html();
        $('#search-zone').append(Mustache.render(component,data));

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
        chooseOption(localStorage.getItem("rnr"));
    } catch (e) {
        console.error(e);
    }
};

function getUrlParam (form) {
    if(form == null) {
        return "";
    }
   
    let url = '';
    const yourSelect = document.getElementById("area-select").value;
    const input = document.getElementById("search-form").getElementsByTagName("input");
    if (yourSelect !== "") url += '&Area=' + yourSelect;
    for (const element of input) {
        url += '&' + element.name + '=' + element.value;
    };

    if(typeof(form) ==  "string") {
        const allTypes = ["rnr", "nr", "r"];
        allTypes.forEach(type => {
            if (type == form) url += "&rnr=" + form;
        });
    }
    
    createSearchHistory(yourSelect,input,form);
    return url;
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

    let inputs = document.getElementById("search-form").getElementsByTagName('input');
    for(const element of inputs) {
        element.value = localStorage.getItem(element.name);
    };

    chooseOption(localStorage.getItem("rnr"));
}

function createSearchHistory(select,inputs,form) {
    if(select != "") sessionStorage.setItem("area", select.value);
    for(const element of inputs) {
        if(element.value) sessionStorage.setItem(element.name, element.value);
    };

    if(typeof(form)== "string") sessionStorage.setItem("rnr", form);
    else sessionStorage.setItem("rnr","rnr");
}

function getSearchHistory() {
    const names = ["area","from", "to","search","rnr"];
    let obj = [];
    for(const name of names) {
        if(sessionStorage.getItem(name) == null) obj.push('');
        else obj.push(sessionStorage.getItem(name));
    }
    return obj;
}

function deleteSeachHistory() {
    sessionStorage.clear();
    document.getElementById( "area-select" ).value = "";

    let input = document.getElementById("search-form").getElementsByTagName('input');
    for(const element of input) {
        element.value = "";
    };
}

function chooseOption(idType) {
    $('.btn-group').children().each(function (index, element) {
        if (element.classList.contains('btn-primary')) {
            element.removeAttribute('class');
            element.setAttribute('class', 'btn btn-sm btn-outline-primary');
            return;
        }
    });
    $('#' + idType).removeClass('btn-outline-primary').addClass('btn-primary').blur();


};

function downloadCalls(pageNumber) {
    showAlert("Téléchargement lancé. Cela peut prendre quelques secondes.", 'info');
    const names = ["Area","from", "to","search"];
    const param = getSearchHistory();
    let urlParam = '';
    for (let i = 0; i < names.length; i++) {
        const element = param[i];
        urlParam += '&' + names[i] + '=' +element;
    }
    const url = 'calls/called/'+cookies.assoId[cookies.actualAsso]+'/download?Page='+pageNumber+urlParam;
    let data = downloadCSV(url);

};