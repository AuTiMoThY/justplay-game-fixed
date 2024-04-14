
const CONFIG = {"VERSION":"20230808","PROJECT_NAME":"justplayGame"};

// > justplayUI
const justplayUI = (function (window, jQuery) {
    if (!window.jQuery) { throw new Error("requires jQuery") }

    let $ = window.jQuery;

    let breakpoints = {
        "xxs": 0,
        "xs": 375,
        "sm": 576,
        "md": 768,
        "lg": 1024,
        "xl": 1280,
        "xxl": 1366,
        "uxl": 1680
    };

    let mqUp = {
        "xxs": window.matchMedia("(min-width: " + breakpoints.xxs + "px)"),
        "xs": window.matchMedia("(min-width: " + breakpoints.xs + "px)"),
        "sm": window.matchMedia("(min-width: " + breakpoints.sm + "px)"),
        "md": window.matchMedia("(min-width: " + breakpoints.md + "px)"),
        "lg": window.matchMedia("(min-width: " + breakpoints.lg + "px)"),
        "xl": window.matchMedia("(min-width: " + breakpoints.xl + "px)"),
        "xxl": window.matchMedia("(min-width: " + breakpoints.xxl + "px)"),
        "uxl": window.matchMedia("(min-width: " + breakpoints.uxl + "px)"),
    };


    let mqDown = {
        "xxs": window.matchMedia("(max-width: " + breakpoints.xs + "px)"),
        "xs": window.matchMedia("(max-width: " + breakpoints.sm + "px)"),
        "sm": window.matchMedia("(max-width: " + breakpoints.md + "px)"),
        "md": window.matchMedia("(max-width: " + breakpoints.lg + "px)"),
        "lg": window.matchMedia("(max-width: " + breakpoints.xl + "px)"),
        "xl": window.matchMedia("(max-width: " + breakpoints.xxl + "px)"),
        "xxl": window.matchMedia("(max-width: " + breakpoints.uxl + "px)"),
        // "uxl" : window.matchMedia("(max-width: "+breakpoints.+"px)"),
    };


    // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }


    // https://medium.com/@mingjunlu/lazy-loading-images-via-the-intersection-observer-api-72da50a884b7
    if ('loading' in HTMLImageElement.prototype) {
        // 支援原生 lazy loading
        console.log('支援原生 lazy loading!!');
    } else {
        // 不支援，改用其他備案
    }


    const updateCursor = ({ x, y }) => {
        document.documentElement.style.setProperty('--x', x);
        document.documentElement.style.setProperty('--y', y);

        // console.log(x, y);
    }

    document.body.addEventListener('pointermove', updateCursor)


    return {
/**
 * ---------------------------------------------------------------------------------
 * >> .init()
 */

init() {
    const _ = this;
    $("body").addClass('js-loading-ok');
    _.scrolling();


    if (mqUp.lg.matches) {
        console.log("qwe");
        $("body").removeClass("js-open-mobile-menu");
    }
    // $(window).on('resize', function () {
    // });
},
/**
 * ---------------------------------------------------------------------------------
 * >> .scrolling()
 */

scrolling() {
    const _ = this;
    if($(window).scrollTop() >= 100) {
        $("body").addClass('js-scrolling');
    }
    $(window).scroll(function(event) {
        // console.log($(this).scrollTop());
        if ($(this).scrollTop() >= 100) {
            $("body").addClass('js-scrolling');
        }else {
            $("body").removeClass('js-scrolling');
        }
    });

},
    }
}(window, jQuery));


$(function() {
    justplayUI.init();

});