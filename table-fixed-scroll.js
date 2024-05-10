/**
 * Table's will be fixed at top after scroll.
 *
 */

import * as $ from 'jquery';

let table = null,
    tables = $('.table-fixed-scroll'),
    tableInfos = [],
    thead = null,
    i = 0, // index for array
    scrollTop = null,
    difference = null,
    transform = null;

function initTableInfos() {
    tableInfos = []; // reset tableInfos before adding data (to prevent duplication)

    for (i = 0; i < tables.length; i++) {
        //collect info about table's
        table = $(tables[i]);

        thead = table.find('thead');
        thead.css({
            'background-color': 'white',
        });

        tableInfos.push({
            thead: thead,
            tableHeight: table.height(),
            offsetTop: table.offset().top,
        });
    }
}

function moveHeaders() {
    scrollTop = $(window).scrollTop();

    for (i = 0; i < tableInfos.length; i++) {
        difference = scrollTop - tableInfos[i].offsetTop - 2;

        transform = (difference > 0 && scrollTop < tableInfos[i].offsetTop + tableInfos[i].tableHeight)
            ? 'translateY('+difference+'px)'
            : 'initial';

        tableInfos[i].thead.css({
            'transform': transform, // Chrome
            '-webkit-transform': transform, // Safari
            '-ms-transform': transform, // IE 9
        });
    }
}

export function init() {
    (function () {
        $(function () {
            initTableInfos();

            //scroll
            $(window).on("scroll", function(e) {
                //move table header's after scroll
                moveHeaders();
            });

            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                //It is for bootstrap tab. We need to reinitialize tableInfos after choosing tab
                initTableInfos();
            })

            // Reinitialize informations about "scrolled tables" every 3 seconds
            // In some cases it is fix (when other js code change positions of dom elements)
            // For example when using css-class form-horizontal.
            setInterval(function(){
                initTableInfos();
            },3000);

            moveHeaders(); // For cases when user refresh page or were redirected back we need to auto move header (without scroll event)
        });
    })();
}
