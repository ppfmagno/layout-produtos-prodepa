$(document).foundation();

// responsive menu
let menuIcon = $('.top-nav .menu-icon');
menuIcon.click( () => {
    let menu = $('.top-nav ul'),
        width = menu.css('width'),
        body = $('body');

    if (width === '0px') {
        menu.css('width', '100%');
        menuIcon.css('position', 'fixed');
        body.css('overflow', 'hidden');
    } else {
        menu.css('width', '0px');
        menuIcon.css('position', 'absolute');
        body.css('overflow', 'scroll');
    }
});

// details navigation
let detailsNav = $('.about-nav a');

detailsNav.click(navigateDetails);

function navigateDetails(e) {
    e.preventDefault();
    let target = $(e.target),
        href = target.attr('href'),
        tabId = href.substr(1),
        tabs = $('section.about-section'),
        tabTop = detailsNav.position().top;
        
        console.log(target.parents(tabs));
        
    tabs.each(function() {            
        if ($(this).attr('id') == tabId) {
            $(this).css('display', 'block');
        } else {
            $(this).css('display', 'none');
        }
    });

    detailsNav.each(function() {
        let selected = $(this).attr('href');
        
        if (selected === href) {
            $(this).parent().addClass('selected');
        } else {
            $(this).parent().removeClass('selected');
        }
    });       
}

// filter search on input change
let searchInput = document.getElementById('search-service-input'),
    services = document.querySelectorAll('.services-item-container');

searchInput.addEventListener('keyup', (e) => {
    let query = new RegExp (e.target.value, 'g');
    services.forEach(item => {
        console.log(item);
        
        if (!item.dataset.tags.match(query)) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    });
});