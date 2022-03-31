function scrollTrigger(selector, options = {}) {
  let els = document.querySelectorAll(selector);
  // ^^ This prints a nodeList, so we must convert to an array
  els = Array.from(els);

  els.forEach((el) => {
    // attach the IntersectionObserver (IO)
    addObserver(el, options);
  });
}

// receives 'options' from scrollTrigger fn
function addObserver(el, options) {
  // Create a new IO instance
  // The cb takes 2 args, the el list and the observer instance
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // entry.isIntersecting will be true if el is visible
      if (entry.isIntersecting) {
        if (options.cb) {
          // If we passed a callback, call it
          options.cb(el);
        } else {
          // If not, just add an active class
          entry.target.classList.add('active');
        }
        // Remove the observer from the element after adding class
        observer.unobserve(entry.target);
      }
    });
  }, options);
  // Adding the observer to the element
  observer.observe(el);
}
// Example
scrollTrigger('.scroll-reveal', {
  rootMargin: '-200px',
  cb: function (el) {
    let opacity = 0;
    const intervalID = setInterval(function () {
      if (opacity < 1) {
        opacity = opacity + 0.1;
        el.style.opacity = opacity;
      } else {
        clearInterval(intervalID);
      }
    }, 200);
  },
});
