// // ------------------------------------------------------------------
// // Scroll Reveal
// // Creation Date: 6/22/2021
// // Last Updated: 8/27/2021
// // Description: Javascript to check if an element is visible.  If 
// // visible scrolling down or up, add visible class to enables the css
// // animation on the section.
// // ------------------------------------------------------------------
if (!('IntersectionObserver' in window) || !('IntersectionObserverEntry' in window) || !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
    //On load, scroll, or resize.  Do this.
    window.onload = window.onscroll = window.onresize = function() { 
      scrollDown();
  
      //Scroll Reveal Elements
      scrollRevealElement('.dev-scrollIn');
    }; 
  }
  else {
    //On load, scroll, or resize.  Do this.
    window.onload = window.onscroll = window.onresize = function() { 
      scrollDown();
    }; 
  
    //Intersection Observer Scroll Reveal
    //Intersection Observer options
    var scrollOptions = {
      rootMargin: '-100px 0px'    
    };
  
    //Find all sections to do a scroll in effect
    var targets = document.querySelectorAll('.dev-scrollIn');
  
    //Observe the targets
    var scrollReveal = function (target) {
      var scrollObserver = new IntersectionObserver( function(entries,observer) {
          entries.forEach(function callbackFN(entry) {
              //Once visible
              if(entry.isIntersecting){
                  entry.target.classList.add('visible'); //Add visible class to section
                  observer.disconnect(); //Stop observing that section
              }
          })
      }, scrollOptions);
  
      scrollObserver.observe(target);
    }
  
    //Previous but did not work on IE
    // var scrollReveal = (target) => {
    //   var scrollObserver = new IntersectionObserver((entries,observer) => {
    //       entries.forEach(entry => {
    //           //Once visible
    //           if(entry.isIntersecting){
    //               entry.target.classList.add('visible'); //Add visible class to section
    //               observer.disconnect(); //Stop observing that section
    //           }
    //       })
    //   }, scrollOptions);
  
    //   scrollObserver.observe(target);
    // }
    targets.forEach(scrollReveal);
  }
  
  //Older Browser Support - Scroll Reveal
  function scrollRevealElement(section){
    var elements = document.querySelectorAll(section);
    if(elements.length == 1){
      var element = document.querySelector(section);
        if(checkVisible(element)){
            element.classList.add('visible');
        }
    }
    if(elements.length > 1){
      var i = 0;
      for(i = 0; i < elements.length; ++i){
        if(checkVisible(elements[i])){
          elements[i].classList.add('visible');
        }
      }
    }
  }
  
  function checkVisible(element) {
    var elementBuffer = 75;
    var bottom = window.innerHeight; //window bottom is set to be the height of the window
    var dimensions = element.getBoundingClientRect(); //dimensions of element
    var elementTop = dimensions.top;
    var elementBottom = element.clientHeight + elementTop; 
    if(elementTop >= 0 && elementTop <= bottom - elementBuffer || elementBottom >= elementBuffer && elementBottom <= bottom){
      return 1; //element is visible
    }
    else {
      return 0;
    }
  }
  
  // // ------------------------------------------------------------------
  // // Fixed Header with Anchor Tag Adjustment
  // // Creation Date: 2/23/2021
  // // Last Updated: 8/27/2021
  // // Description: Makes the navigation sticky and alters where the anchor tags should land
  // // when clicked.  Needs to be an ID for the anchor tag to work properly
  // // ------------------------------------------------------------------
  //Get Height of header
  //Used for anchor support
  function getHeaderHeight(){
    var headerHeight = document.querySelector('header.c-header').offsetHeight;
    if (window.matchMedia('(max-width: 992px)').matches) {
      headerHeight = document.querySelector('.c-header-modern .c-topnav__navbar').offsetHeight;
    }
    return headerHeight;
  }
  
  //Function to change header on scroll
  function scrollDown() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      document.getElementsByTagName('header')[0].classList.add('scrolled');
    } else {
      document.getElementsByTagName('header')[0].classList.remove('scrolled');
    }
  }

  if(!($('header.c-header #mainNav').length)){
    $('#mainNav').appendTo('header.c-header .c-header--overylay');
  }
  
  
  //On load, scroll, or resize.  Do this.
  window.onload = window.onscroll = window.onresize = function() { 
  scrollDown();
  }; 
  
  //Anchor tag implementation
  //On click of anchor tag
  $('a[href*="#"]:not([href="#"])').click(function (e) {
    var urlPath = this.href.substring(0, this.href.indexOf("#")); //url wthout hash
    var locationPath = location.href;
    if(locationPath.includes("#")){
      locationPath = location.href.substring(0, location.href.indexOf("#")); //url wthout hash
    }
    if(urlPath == locationPath){ //If the urls are the same then do the anchor animation
      var target = $(this.href.substring(this.href.indexOf("#")));
      if (target.length) {
        var headerHeight = getHeaderHeight();
        $('html,body').stop().animate({
          scrollTop: target.offset().top - headerHeight //offsets for fixed header
          }, {
            complete: function() { //ensures that it goes all the way to the anchor link
              headerHeight = getHeaderHeight();
              if(document.body.scrollTop != headerHeight || document.documentElement.scrollTop != headerHeight){
                $('html,body').animate({
                  scrollTop: target.offset().top - headerHeight //offsets for fixed header
                }, 1);
              }
              $('html,body').stop(true, true);
            }
        });
      }
    }
    // Close mobile nav for on page anchors, if clicked in the navigation
    if($(this).closest('ul').hasClass('c-topnav__container') || $(this).closest('ul').hasClass('c-topnav__submenu')){
      $('.js-navbar__toggle').trigger("click");
    }
  });
  
  //On load of site going to the anchor tag
  $(window).on('pageshow',function(){ 
    var hash = window.location.hash
    if (hash == '' || hash == '#' || hash == undefined) return false;
    var target = $(hash);
    //target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      var headerHeight = getHeaderHeight();
      $('html,body').stop().animate({
          scrollTop: target.offset().top - headerHeight //offsets for fixed header
          }, {
          complete: function() { //ensures that it goes all the way to the anchor link
              headerHeight = getHeaderHeight();
              if(document.body.scrollTop != headerHeight || document.documentElement.scrollTop != headerHeight){
                  $('html,body').animate({
                      scrollTop: target.offset().top - headerHeight //offsets for fixed header
                  }, 1);
              }
              $('html,body').stop(true, true);
          }
      });
    }
  });
  
  //Glossay page fix
  $('.page-tools-glossary .body-container a').each(function(){
    if($(this).is("[name]")){ //if there is a name attribute
      $(this).attr('id', $(this).attr('name')); //make it an id
      $(this).removeAttr('name'); //remove name attribute
    }
  });
  
  //Add Navigation to header if it is outside of the header
  if(!($('header.c-header #mainNav').length)){
    $('#mainNav').appendTo('header.c-header .c-header--overylay');
  }
  
  // ------------------------------------------------------------------
  // Elevator Team
  // Created: 8/16/2021
  // Last Updated: 9/23/2021
  // ------------------------------------------------------------------
  $('.dev-ElevatorTeam .c-team-section__member').each(function(){
  
    var TeamName = $(this).find('h4').text();
    var TeamLink = $(this).find('h4 a').attr('href');
    var TeamTxT = $(this).find('.c-team-member__info');
  
    $(this).wrap('<a class="MemberLink" />');
    $(this).parent().attr('href', TeamLink);
    $(this).find('a[href*="tel:"]').text('Call Me');
    $(this).find('a[href*="mailto:"]').text('Email Me');
    $(this).find('.c-team-grid__section--developer').append('<div class="ElevatorFront"></div><div class="ElevatorBack"></div>');
    $(this).find('.ElevatorFront').append('<h3 class="NameFront">'+ TeamName +'</h3>');
    $(TeamTxT).appendTo($(this).find('.ElevatorBack'));
  });
  
  // // ------------------------------------------------------------------
  // // Box Sections
  // // ------------------------------------------------------------------
  
  // // ------------------------------------------------------------------
  // // Clickable box Section
  // // Creation Date: 6/18/2021
  // // Last Updated: 6/18/2021
  // // Description: Used with any box section.  Takes the "Learn more" btn
  // // link and wraps it around box section.  Hides the "Learn more" btn.
  // // ------------------------------------------------------------------
  $('.dev-boxes-ClickableBase .box').each(function(){
    var link = $(this).find('.c-box__btn').attr('href');
    if(link){
      $(this).wrapInner('<a href="'+ link +'" class="wrappedBoxLink"/>');
    }
  });
  
  $('.dev-5BoxFlow').not('.dev-first').find('.box').removeAttr('id').appendTo($('.dev-5BoxFlow .o-grid__collapse').first());
  $('.dev-5BoxFlow').not('.dev-first').hide();
  
  
  $('.page-contact .c-contacts').before('<a href="https://go.oncehub.com/KevinYamamotoAWMACRPC" class="c-btn calendarBtn" target="_blank">Access My Calendar</a>');