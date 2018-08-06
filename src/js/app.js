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
let detailsNav = $('.about-nav a'),
    buttonContratar = $('a[href="#contrate"]');

detailsNav.click(navigateDetails);
buttonContratar.click(navigateDetails);

function navigateDetails(e) {
    e.preventDefault();
    let target = $(e.target),
        href = target.attr('href'),
        tabId = href.substr(1),
        tabs = $('section.about-section'),
        tabTop = detailsNav.position().top;
        
        console.log(target.parents(tabs));
        
    if (!target.parents('section.about-section').length && !target.parents('.about-nav').length) {
        window.scrollTo(0, tabTop);
    }
        
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