(function () {
  let windowWidth = window.innerWidth;
  let bestsellerSwiper = null;
  let introSwiper = null;

  function updateBestsellerSwiper() {
    if (windowWidth > 720 && bestsellerSwiper == undefined) {
      bestsellerSwiper = new Swiper(".bestsellerSwiper", {
        cssMode: true,
        slidesPerGroup: 3,
        slidesPerView: 3,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        mousewheel: true,
        keyboard: true,
      });
    } else if (windowWidth <= 720 && bestsellerSwiper != undefined) {
      bestsellerSwiper.destroy();
      bestsellerSwiper = null;
    }
  }

  function updateIntroSwiper() {
    introSwiper = new Swiper(".intro-swiper", {
      effect: "fade",
      mousewheel: false,
      keyboard: true,
      loop: true,
      allowTouchMove: false,
      speed: 1000,
      on: {
        init: function (swiper) {
          const slides = swiper.slides;

          slides.forEach(function (item, index) {
            const videos = item.querySelectorAll("video");
            if (videos.length > 0) {
              videos.forEach(function (video) {
                video.onended = function () {
                  swiper.slideNext();
                };
                if (index === swiper.activeIndex) {
                  const style = window.getComputedStyle(video);
                  if (style.display === "block") {
                    video.play();
                  }
                }
              });
            }
          });

          window.addEventListener("resize", function () {
            slides.forEach(function (item, index) {
              const videos = item.querySelectorAll("video");
              if (videos.length > 0) {
                videos.forEach(function (video) {
                  video.onended = function () {
                    swiper.slideNext();
                  };
                  if (index === swiper.activeIndex) {
                    const style = window.getComputedStyle(video);
                    if (style.display === "block") {
                      video.play();
                    } else {
                      if (!video.paused) {
                        video.pause();
                        video.currentTime = 0;
                      }
                    }
                  }
                });
              }
            });
          });
        },
        slideChangeTransitionStart: function (swiper) {
          const slides = swiper.slides;

          slides.forEach(function (item, index) {
            const videos = item.querySelectorAll("video");
            if (videos.length > 0) {
              videos.forEach(function (video) {
                if (index === swiper.activeIndex) {
                  const style = window.getComputedStyle(video);
                  if (style.display === "block") {
                    video.play();
                  }
                }
              });
            }
          });
        },
      },
      slideChangeTransitionEnd: function (swiper) {
        const slides = swiper.slides;

        slides.forEach(function (item, index) {
          const videos = item.querySelectorAll("video");
          if (videos.length > 0) {
            videos.forEach(function (video) {
              if (index !== swiper.activeIndex) {
                video.pause();
                video.currentTime = 0;
              }
            });
          }
        });
      },
    });
  }

  updateBestsellerSwiper();
  updateIntroSwiper();

  window.addEventListener("resize", function () {
    windowWidth = window.innerWidth;

    updateBestsellerSwiper();
  });
})();
