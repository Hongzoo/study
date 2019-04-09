(function() {
    'use strict';

    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var colors = ['pink', 'red', 'orange', 'yellow', 'gold', 'lightgreen', 'green', 'skyblue', 'blue', 'navy', 'violet', 'gray'];

    function getEvenDateSpan(year, month) {
        var buttons = $("body div div ul li:even *[value*='" + year + "." + month + "']");

        return buttons;
    }

    function paintColor(buttons, index) {
        buttons.css('background-color', colors[index]);
    }

    function changeColors() {
        ['2016', '2017'].forEach(function(year) {
            months.forEach(function(month, index) {
                var buttons = getEvenDateSpan(year, month);

                paintColor(buttons, index);
            });
        });

    }

    $('#change_btn').on('click', changeColors);
})(); 
