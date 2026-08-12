/**
 * Module to make table header adapt. It will be pinned at the top of the page after scroll.
 * @author Kirill Goroshko <kirgk25@yandex.ru> (https://github.com/kirgk25)
 */

let tableData = [];

function initTableData() {
    tableData = []; // Reset tableData before adding data (to prevent duplication)
    let tables = document.querySelectorAll('.table-fixed-scroll');

    for (let i = 0; i < tables.length; i++) {
        // Collect info about table's
        const table = tables[i];
        const thead = table.querySelector('thead');

        if (thead === null) {
            continue;
        }

        if (thead.style.backgroundColor === "") {
            thead.style.backgroundColor = 'white';
        }

        tableData.push({
            thead: thead,
            tableHeight: table.offsetHeight,
            offsetTop: table.getBoundingClientRect().top + window.scrollY,
        });
    }
}

function moveHeaders() {
    const scrollTop = window.scrollY;

    for (let i = 0; i < tableData.length; i++) {
        const data = tableData[i];
        const difference = scrollTop - tableData[i].offsetTop - 2;
        const transform = (difference > 0 && scrollTop < data.offsetTop + data.tableHeight)
            ? 'translateY('+difference+'px)'
            : 'initial';

        data.thead.style.transform = transform;       // Chrome
        data.thead.style.WebkitTransform = transform; // Safari
        data.thead.style.MsTransform = transform;     // IE 9
    }
}

export function init() {
    (function () {
        document.addEventListener('DOMContentLoaded', () => {
            initTableData();

            // Move table header's after scroll
            window.addEventListener('scroll', moveHeaders, { passive: true });

            // It is for bootstrap tab. We need to reinitialize tableData after choosing tab
            const tabs = document.querySelectorAll('a[data-toggle="tab"]');
            tabs.forEach((tab) => {
                tab.addEventListener('shown.bs.tab', () => {
                    initTableData();
                });
            });

            // Reinitialize information about "scrolled tables" every 3 seconds
            // In some cases it is fix (when other js code change positions of dom elements)
            // For example when using css-class form-horizontal
            setInterval(function(){
                initTableData();
            },3000);

            moveHeaders(); // For cases when user refresh page or were redirected back we need to auto move header (without scroll event)
        });
    })();
}
