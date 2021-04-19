const names = ['startDate', 'endDate', 'debitDate'];

if(window.location.pathname.includes("debit-calendar"))
{
    get("associations/" + cookies.assoId[cookies.actualAsso] + "/debitCalendar", getAllCalendar);
}

function calldcUpdatePage(ongId) {
    window.location.replace('./dc-update.html');
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
        $('#debit-calendar').append(Mustache.render(component, data));
    });
}

function getCalendarById(data) {
    $.get('components/dc_form.html', function (templates) {
        var component = $(templates).filter('#tpl-dc-form').html();
        $('#dc-update').append(Mustache.render(component, data));
    });

    saveMainData(data);
}

function checkModifiedData(form) {
    const inputs = form.getElementsByTagName("input");
    if(isDateAnteriorTo(inputs[0].value, inputs[1].value))
}

function isDateAnteriorTo(date1, date2) {
    if(date1 > date2) return false;
    else if (date1 = date2) return false;
    else return true;
}