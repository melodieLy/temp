get('mail/stats/counters/'+cookies.assoId, retrieveAssoMail);


//From here, we call specifics components
// * Call the mails summary 
function retrieveAssoMail(data) {
    $.get('components/mails-summary.html', function(templates) {
        var component = $(templates).filter('#tpl-mails-sum').html();
        $('#mailSummary').append(Mustache.render(component,data));
    });
}

//Get association data (Volume réalisé, %, etc)
// $.get('footer.html', function(templates) {
//     var footer = $(templates).filter('#tpl-footer').html();
//     let footerData = {};
//     $('#footer').append(Mustache.render(footer, footerData));
// });