function moustache() {
    var template = document.getElementById('moustache').innerHTML;
    var rendered = Mustache.render(template, { name: 'Luke' });
    document.getElementById('target').innerHTML = rendered;

    var template2 = document.getElementById('mustachejson').innerHTML;
    var data2 = {
        "name": "Chris",
        "company": "<b>GitHub</b>"
    }
    var rendered = Mustache.render(template2, data2);
    document.getElementById('target2').innerHTML = rendered;
  }