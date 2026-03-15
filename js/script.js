$(function () {
    "use strict";

    var $window = $(window);
    var $navMenu = $('.nav-menu');
    var $siteNav = $('#navbar');

    function updateNavState() {
        if ($window.scrollTop() > 50) {
            $navMenu.addClass('is-scrolling');
        } else {
            $navMenu.removeClass('is-scrolling');
        }
    }

    updateNavState();
    $window.on('scroll', updateNavState);

    $('.navbar-nav > li > a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });

    $siteNav.on('show.bs.collapse', function () {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    });

    $siteNav.on('hide.bs.collapse', function () {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    });

    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function (event) {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate(
                    { scrollTop: target.offset().top - 74 },
                    650
                );
            }
        }
    });

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        $('.reveal').addClass('visible');
    }

    $('[data-forum-link="true"]').on('click', function (event) {
        event.preventDefault();
        window.alert('Forum URL placeholder: add your official forum link here.');
    });

    var $videoModal = $('#videoModal');
    var $videoFrame = $('#videoFrame');
    var $videoTitle = $('#videoModalTitle');

    $('.btn-watch').on('click', function () {
        var $card = $(this).closest('.video-card');
        var videoId = ($card.data('youtube-id') || '').toString().trim();
        var fallbackUrl = ($card.data('fallback-url') || 'https://youtube.com/@FieldCamApp').toString();
        var titleText = $card.find('h3').first().text().trim();

        if (videoId.length === 0) {
            window.open(fallbackUrl, '_blank', 'noopener');
            return;
        }

        var embedUrl = 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1&rel=0';
        $videoTitle.text('FieldCam Tutorial: ' + titleText);
        $videoFrame.attr('src', embedUrl);
        $videoModal.modal('show');
    });

    $videoModal.on('hidden.bs.modal', function () {
        $videoFrame.attr('src', '');
    });
});
