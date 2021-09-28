const testAd = document.querySelector('#detect');
wrapperBlock = document.querySelector('.block-all')

adClasses = ["ads",  "ad", "adsbox", "doubleclick", "ad-placement", "carbon-ads"]

adClasses.map(item => {
    testAd.classList.add(item)
})

window.setTimeout(function() {
  if (testAd.offsetHeight === 0) {
    wrapperBlock.classList.add("show")
    document.querySelector("body").style.overflow = "hidden"
  } else {
    wrapperBlock.remove()
  }
  testAd.remove();
}, 100);