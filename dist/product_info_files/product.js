$(".ul-items span").on("click", function () {
    let e = $(this),
        t = $(this).next();
    return (
        t.is(":hidden")
            ? (e.addClass("active"), t.slideDown())
            : (e.removeClass("active"), t.slideUp()),
        !1
    );
}),
    new Swiper(".recommend", {
        spaceBetween: 0,
        slidesPerView: 2,
        loop: !0,
        direction: "horizontal",
        navigation: {
            nextEl: ".producthot .arrow-right",
            prevEl: ".producthot .arrow-left",
        },
        breakpoints: { 768: { slidesPerView: 4 }, 1200: { slidesPerView: 6 } },
    });
let productThumbs = new Swiper(".product-thumbs", {
        spaceBetween: 0,
        direction: "horizontal",
        slidesPerView: 4,
        freeMode: !0,
        watchSlidesVisibility: !0,
        watchSlidesProgress: !0,
    }),
    productSlider = new Swiper(".product-slider", {
        spaceBetween: 0,
        direction: "horizontal",
        thumbs: { swiper: productThumbs },
        navigation: { nextEl: ".swiper-next", prevEl: ".swiper-prev" },
    }),
    count = 1;
const countEl = document.getElementById("buyCount");
function plus() {
    countEl.value++;
}
function minus() {
    count > 1 && countEl.value--;
}
