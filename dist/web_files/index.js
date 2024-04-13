function getcCntered() {
    window.innerWidth;
    return window.innerWidth <= 768;
}
new Swiper(".banner", {
    spaceBetween: 0,
    slidesPerView: "auto",
    centeredSlides: !0,
    loop: !0,
    direction: "horizontal",
    resizeObserver: !0,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 0,
        stretch: 20,
        depth: 150,
        scale: 1,
        slideShadows: !1,
    },
    navigation: { nextEl: ".p1 .arrow-right", prevEl: ".p1 .arrow-left" },
    pagination: { el: ".p1 .swiper-pagination", type: "bullets", clickable: !0 },
}),
    new Swiper(".hot", {
        spaceBetween: 0,
        centeredSlides: !1,
        loop: !0,
        direction: "horizontal",
        resizeObserver: !0,
        navigation: { nextEl: ".p2 .arrow-right", prevEl: ".p2 .arrow-left" },
        pagination: {
            el: ".p2 .swiper-pagination",
            type: "bullets",
            clickable: !0,
        },
    }),
    new Swiper(".recommend", {
        spaceBetween: 56,
        slidesPerView: "auto",
        centeredSlides: getcCntered(),
        loop: !0,
        direction: "horizontal",
        navigation: { nextEl: ".p5 .arrow-right", prevEl: ".p5 .arrow-left" },
        on: {
            resize: function () {
                getcCntered();
            },
        },
    });
