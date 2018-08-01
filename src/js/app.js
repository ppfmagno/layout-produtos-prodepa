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
detailsNav.click( (e) => {
    e.preventDefault();
    let href = $(e.target).attr('href'),
        tabId = href.substr(1),
        tabs = $('section.about-section');
        
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
        
});

// details div equalizer
let resizeTime;
window.addEventListener('resize', () => {
    clearTimeout(resizeTime);
    resizeTime = setTimeout(equilize, 500);
});
function equilize() {
    console.log('equilized');
}