const names = ['startDate', 'endDate', 'debitDate'];

if(window.location.pathname.includes("debit-calendar"))
    get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", getAllCalendar);

function calldcUpdatePage(ongId) {
    window.location.assign('./dc-update.html');
    get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar/"+ongId, getCalendarById);
}

function saveMainData(data) {
    names.forEach(name => {
        sessionStorage.setItem(name,data.name);
    });
}

function getAllCalendar(data) {
    $.get('components/dc_table.html', function (templates) {
        var component = $(templates).filter('#tpl-dc-table').html();
        if (data) {
            data.forEach(element => {
                if (element.startDate) element.startDate = moment(element.startDate).format('DD/MM/YYYY');
                if (element.endDate) element.endDate = moment(element.endDate).format('DD/MM/YYYY');
                if (element.debitDate) element.debitDate = moment(element.debitDate).format('DD/MM/YYYY');
            });
        }
        $('#debit-calendar').append(Mustache.render(component, data));
    });
}

function getCalendarById(data) {
    $.get('components/dc_form.html', function (templates) {
        var component = $(templates).filter('#tpl-dc-form').html();
        $('#dc-update').append(Mustache.render(component, {
            "startDate": moment(data.startDate).format('DD/MM/YYYY'),
            "endDate": moment(data.endDate).format('DD/MM/YYYY'),
            "debitDate": moment(data.debitDate).format('DD/MM/YYYY')
        }));
    });

    saveMainData(data);
}

// function checkModifiedData(form) {
//     const inputs = form.getElementsByTagName("input");
//     if(isDateAnteriorTo(inputs[0].value, inputs[1].value))
// }

function isDateAnteriorTo(date1, date2) {
    if(date1 > date2) return false;
    else if (date1 = date2) return false;
    else return true;
}