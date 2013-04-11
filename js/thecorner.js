/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this);

/* touch-events */
(function(e,t){e.each("touchstart touchmove touchend orientationchange tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)};e.attrFn[n]=true});var n="ontouchstart"in window,r="touchmove scroll",i=n?"touchstart":"mousedown",s=n?"touchend":"mouseup",o=n?"touchmove":"mousemove";e.event.special.scrollstart={enabled:true,setup:function(){function o(n,r){i=r;var s=n.type;n.type=i?"scrollstart":"scrollstop";e.event.handle.call(t,n);n.type=s}var t=this,n=e(t),i,s;n.bind(r,function(t){if(!e.event.special.scrollstart.enabled){return}if(!i){o(t,true)}clearTimeout(s);s=setTimeout(function(){o(t,false)},50)})}};e.event.special.tap={setup:function(){var t=this,n=e(t);n.bind(i,function(r){function p(e){if(e.type=="scroll"){i=true;return}var t=e.type=="touchmove"?e.originalEvent.touches[0]:e;if(Math.abs(l[0]-t.pageX)>10||Math.abs(l[1]-t.pageY)>10){i=true}}if(r.which&&r.which!==1||n.data("prevEvent")&&n.data("prevEvent")!==r.type){return false}n.data("prevEvent",r.type);setTimeout(function(){n.removeData("prevEvent")},800);var i=false,u=true,a=r.target,f=r.originalEvent,l=r.type=="touchstart"?[f.touches[0].pageX,f.touches[0].pageY]:[r.pageX,r.pageY],c,h;h=setTimeout(function(){if(u&&!i){c=r.type;r.type="taphold";e.event.handle.call(t,r);r.type=c}},750);e(window).one("scroll",p);n.bind(o,p).one(s,function(r){n.unbind(o,p);e(window).unbind("scroll",p);clearTimeout(h);u=false;if(!i&&a==r.target){c=r.type;r.type="tap";e.event.handle.call(t,r);r.type=c}})})}};e.event.special.swipe={setup:function(){var n=this,r=e(n);r.bind(i,function(n){function f(e){if(!u){return}var t=e.originalEvent.touches?e.originalEvent.touches[0]:e;a={time:(new Date).getTime(),coords:[t.pageX,t.pageY]};if(Math.abs(u.coords[0]-a.coords[0])>10){e.preventDefault()}}var i=n.originalEvent.touches?n.originalEvent.touches[0]:n,u={time:(new Date).getTime(),coords:[i.pageX,i.pageY],origin:e(n.target)},a;r.bind(o,f).one(s,function(e){r.unbind(o,f);if(u&&a){if(a.time-u.time<1e3&&Math.abs(u.coords[0]-a.coords[0])>30&&Math.abs(u.coords[1]-a.coords[1])<75){u.origin.trigger("swipe").trigger(u.coords[0]>a.coords[0]?"swipeleft":"swiperight")}}u=a=t})})}};(function(e){function s(){var e=r();if(e!==i){i=e;t.trigger("orientationchange")}}var t=e(window),n,r,i;e.event.special.orientationchange=n={setup:function(){if(e.support.orientation){return false}i=r();t.bind("resize",s)},teardown:function(){if(e.support.orientation){return false}t.unbind("resize",s)},add:function(e){var t=e.handler;e.handler=function(e){e.orientation=r();return t.apply(this,arguments)}}};n.orientation=r=function(){var e=document.documentElement;return e&&e.clientWidth/e.clientHeight<1.1?"portrait":"landscape"}})(jQuery);e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)}}})})(jQuery);

var isiPad = navigator.userAgent.match(/iPad/i) != null;

function getRandomNumber (min, max) {
	return Math.random() * (max - min) + min;
}

function resetDraggedCards() {
	$articles.each(function(){
		var $this = $(this);
		if ($this.hasClass('was-dragged')) {
			$this.css({'left': 0,'top':0}).removeClass('was-dragged');
		}
	});
}

$.extend( $.Isotope.prototype, {

	_fitRowsResizeChanged : function() {
		resetDraggedCards();
		return true;
	},

    _masonryGetContainerSize : function() {
      var containerHeight = Math.max.apply( Math, this.masonry.colYs );
      return { height: containerHeight + 200 };
    },

	_masonryResizeChanged : function() {
		resetDraggedCards();
		return this._checkIfSegmentsChanged();
	},

	_fitRowsLayout : function( $elems ) {

		var instance = this,
			containerWidth = this.element.width(),
			props = this.fitRows;

		$elems.each( function(i) {

			var $this = $(this),
				cardW = $this.outerWidth(true),
				cardH = $this.outerHeight(true);

			// adjust the position a little to create overlaps
			if (containerWidth > 500 && !isiPad) {
				props.x = props.x / getRandomNumber (1, 1.08);
				props.y = props.y / getRandomNumber (1.09, 1.1);
			}

			if ( props.x !== 0 && cardW + props.x > containerWidth ) {
				// if this element cannot fit in the current row
				if (containerWidth > 500 && !isiPad) {
					props.x = getRandomNumber(-100, 250);
				} else {
					//console.warn('revert to original method from fitRows?');
					props.x = 0;
				}

				props.y = props.height;
			}

			// position the element
			instance._pushPosition( $this, props.x, props.y );

			props.height = Math.max( props.y + cardH, props.height );
			props.x += cardW;

		});

	}
});



$(function(){

	// ie7 redirect
	if ($.browser.msie && parseInt($.browser.version, 10) <= 7)
		window.location = "/upgrade-browser/";

	var ua = navigator.userAgent;
    if (ua.indexOf("BlackBerry") >= 0) {
        window.location = "/blackberry/";
    }

	// hide URL bar under iOS
	window.setTimeout(function() { window.scrollTo(0, 0); }, 0);

	// start at top
	setTimeout(function(){
		$(window).scrollTop(0);
	}, 5);
	$(window).load(function(){
		setTimeout(function(){
			$(window).scrollTop(0);
		}, 5);
	});

	var $body = $('body')
	var $grid = $('#grid');
	$articles = $grid.find('article');
	var $tweet_containers = $articles.filter('.twitter');

	var $header = $('header');

	var $filter = $('#filter');
	var $filterLinks = $filter.find('a');
	var $hashtags = $('#hashtags');
	var $hashtagLinks = $hashtags.find('a');
	var $imageZoomButton = $articles.find('zoom');

	// remove desktop-only elements if mobile
	if ($(window).width() < 500) {
		$('#masthead-slider .desktop').remove();
		$('article.people:not(.foundingpartners)').remove();
	} else {
		$('#mashead-slider .mobile').remove();
	}

	if ($(window).width() < 500) {

		// adjust card order
		$articles.filter('.foundingpartners').insertAfter( $articles.filter('.work').first() );
		$articles.filter('.intro-slideshow').after( $articles.filter('.about') );
		$articles.filter('.about').last().remove();

		// remove "More +"
		$('.revealable').show();
		$('.content .toggle').remove();

		// remove unwanted content
		$articles.filter('.feature').slice(1).remove();
		$articles.filter('.tweets').slice(1).remove();
		$articles.filter('.news').slice(1).remove();
		$articles.filter('.intro-slideshow').last().remove();

		// adjust labelling
		$articles.filter('.news').find('.title').text('Latest News');
		$articles.filter('.feature').find('.title').text('Latest Work');
		$articles.filter('.tweets').first().find('.title').text('Latest Tweet');


		$articles.filter('.tweets').first().insertAfter( $articles.filter('.news').first() );

	}



	/**************************************************************
	 *
	 *	Direct-link to specific card (push to front)
	 *  if the URL has a hash, e.g. "#dio-sigur-ros"
	 *
	 **************************************************************/

	if (location.hash) {
		var hash = location.hash.replace(/^.*#/, '');

		var $requested_article = $articles.filter('[data-hash="'+hash+'"]');
		$requested_article.insertBefore($articles.first());
	}


	/**************************************************************
	 *
	 *	Header navigation
	 *
	 **************************************************************/

	$('#scroll-to-top').click(function(e){

		// clean up selected hashtags/filters/menus
		$hashtagLinks.removeClass('selected');
		$filterLinks.removeClass('selected');
		if ($filter.hasClass('visible')) $filter.removeClass('visible');
		if ($hashtags.hasClass('visible')) $hashtags.removeClass('visible');
		$('#toggle-hashtags').html( 'Explore<div class="arrow-up"></div>' );
		$header.removeClass('show-pulldown');
		$('.blind').removeClass('visible');

		var scrollTop = $(window).scrollTop();
		var duration = (scrollTop > 1000) ? '1000' : scrollTop;

		$('html, body').stop().animate(
			{scrollTop: 0},
			{
				duration: duration,
				complete: function(){
					resetDraggedCards();
					// reset Isotope layout mode and filters
					$grid
						.removeClass('masonry').addClass('fitRows')
						.isotope({ filter: '', layoutMode : 'fitRows', sortBy: 'original-order' });

					setTimeout(function(){
						$grid.isotope('reLayout');
					}, 1000);

				}
			}
		);

		e.preventDefault();

	});

	// Disable overscroll / viewport moving on everything but scrollable divs

	$('#toggle-hashtags, #hashtags').click(function(e){
		if (!$hashtags.hasClass('visible')) {

			$('body').bind('touchmove', function (e) {
				if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
			});

			$('body').addClass('stop-scrolling');
			//$('body').bind('touchmove', function(e){e.preventDefault()});
			$('#hashtags').css('overflow', 'auto');
			$('#hashtags').css('-webkit-overflow-scrolling', 'auto');
		} else {
			$('body').removeClass('stop-scrolling');
			$('body').unbind('touchmove');
		}
	});

	$('#scroll-to-top').click(function(e){
		$('body').unbind('touchmove');
	});

	$('#toggle-contact-pulldown').click(function(e){
		if (!$header.hasClass('show-pulldown')) {
			//$('body').addClass('stop-scrolling');
			$('body').bind('touchmove', function(e){e.preventDefault()});
		} else {
			//$('body').removeClass('stop-scrolling');
			$('body').unbind('touchmove');
		}
	});

	$('#toggle-hashtags,').click(function(e){
		$('#toggle-hashtags').html( 'Explore<div class="arrow-up"></div>');
			$grid.removeClass('masonry').addClass('fitRows')
			$grid.isotope({ filter: '', layoutMode : 'fitRows', sortBy: 'original-order' });
		if ($header.hasClass('show-pulldown')) {
			$header.removeClass('show-pulldown');
			$('.blind').removeClass('visible');
		}
		$hashtags.toggleClass('visible');
		e.preventDefault();
	});

	$('#toggle-filter').click(function(e){

		if ($hashtags.hasClass('visible')) {
			$hashtags.removeClass('visible');


		}

		if ($header.hasClass('show-pulldown')) {
			$header.removeClass('show-pulldown');
			$('.blind').removeClass('visible');
		}
		$filter.toggleClass('visible');
		e.preventDefault();
	});


	$('#toggle-contact-pulldown').click(function(e){

		if ($filter.hasClass('visible')) $filter.removeClass('visible');
		if ($hashtags.hasClass('visible')) $hashtags.removeClass('visible');

		if ($header.hasClass('show-pulldown')) {
			$header.removeClass('show-pulldown');
			$('.blind').removeClass('visible');
		} else {
			$header.addClass('show-pulldown');
			$('.blind').addClass('visible');
		}
		e.preventDefault();
	});



	/**************************************************************
	 *
	 *	Masthead slider
	 *
	 **************************************************************/

    if ( $('body').hasClass('with-masthead-slider') ) {
	    $("#masthead-slider").royalSlider({
	        autoPlay: {
	    		enabled:		true,
	    		pauseOnHover:	true,
	    		delay:			3000
	    	},
		    transitionType:'fade',
		    loop: true,
		    arrowsNav: false,
		    imageScaleMode:'fill'
	    });
    }


	/**************************************************************
	 *
	 *	Initialise Isotope
	 *
	 **************************************************************/

	$grid.isotope({
		itemSelector: 'article',
		layoutMode : 'fitRows'
	});

	// Twitter cards loaded async, reLayout necessary
	$(window).load(function(){
		$grid.isotope('reLayout');
	});


	/**************************************************************
	 *
	 *	Project description toggle
	 *
	 **************************************************************/

	$articles.filter('.feature').find('.toggle').click(function(){
		$(this)
			.toggleClass('active')
			.parent().find('.revealable').stop().slideToggle();

			if($(this).hasClass('active')) {
				$(this).html('Less');
				//resizeGridExpand();
			} else {
				$(this).html('More');
			}
/*
		if ($grid.hasClass('masonry')) {
			setTimeout(function(){
				$grid.isotope('reLayout');
			}, 1000);
		}
*/

	});


	/**************************************************************
	 *
	 *	People biography toggle
	 *
	 **************************************************************/

	if ($(window).width() < 500) {
		$articles.filter('.people-slidedown').find('.toggle').click(function(){
			$(this)
				.toggleClass('active');

			if ($(this).hasClass('active')) {
				$(this)
					.parent().find('.content').stop().show();
					$(this).html('Less');
			} else {
				$(this)
					.parent().find('.content').stop().hide();
					$(this).html('More');
			}
		});

	} else {
		$articles.filter('.people-slidedown').find('.toggle').click(function(){
			$(this)
				.toggleClass('active')
				.parent().find('.content').stop().slideToggle();

				if($(this).hasClass('active')) {
					$(this).html('Less');
				} else {
					$(this).html('More');
				}
		});
	}


	/**************************************************************
	 *
	 *	Isotope: hashtag filtering : non-additive
	 *
	 **************************************************************/

	$hashtagLinks.click(function(e){

		var $this = $(this);

		var scrollTop = $(window).scrollTop();
		var duration = (scrollTop > 1000) ? '1000' : scrollTop;

		if (scrollTop > 0) {
			// scrollTo #grid
			$body.stop().animate(
				{scrollTop: 0},
				{
					duration: duration,
					complete: function(){
						processHashtagSelection($this);
					}
				}
			);
		} else {
			processHashtagSelection($this);
		}

		function processHashtagSelection($this) {

			resetDraggedCards();

			if ( $this.text() === 'all' || $this.text() === 'Show all' || $this.text() === $('#toggle-hashtags').text() ) {
				$('#toggle-hashtags').html( 'Explore<div class="arrow-up"></div>' );
			} else {
				$('#toggle-hashtags').html('Explore:<span class="active-tag">' + $this.text()+'</span><div class="arrow-up"></div>' );
			}

			var filters = $this.attr('data-filter-value').replace(/ /g,'').toLowerCase();

			console.log(filters)

			if (filters) {
				$grid
				.removeClass('fitRows').addClass('masonry')
				.isotope({ filter: filters, layoutMode : 'masonry' }, function( $changedItems, instance ) {
					instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
					instance.$filteredAtoms.addClass('is-filtered');
				});
			} else {
				// reset Isotope layout mode and filters
				$grid
					.removeClass('masonry').addClass('fitRows')
					.isotope({ filter: '', layoutMode : 'fitRows', sortBy: 'original-order' });
			}

			// reLayout after transitions complete
			setTimeout(function(){
				$grid.isotope('reLayout');
				resizeGrid();
			}, 800);

			$(window).resize(resizeGrid);

		}

		e.preventDefault();

	});

	/*
	$hashtags.find('.close').click(function(e) {
		$hashtags.toggleClass('visible');
		e.preventDefault();
	});
	*/


	$hashtags.click(function(e) {
		$hashtags.toggleClass('visible');
		e.preventDefault();
	});



	$('.sidebar .tags a').click(function(e){
		$this = $(this);

			var filters = '.' + $this.text().replace(/ /g,'').toLowerCase();

			if (filters) {
				$grid.removeClass('fitRows').addClass('masonry')
				$grid.isotope({ filter: filters, layoutMode : 'masonry' }, function( $changedItems, instance ) {
					instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
					instance.$filteredAtoms.addClass('is-filtered');
				});
				$('#toggle-hashtags').html('Explore:<span class="active-tag">' + $this.text()+'</span><div class="arrow-up"></div>' );
			} else {
				// reset Isotope layout mode and filters
				$grid
					.removeClass('masonry').addClass('fitRows')
					.isotope({ filter: '', layoutMode : 'fitRows', sortBy: 'original-order' });
			}

			// reLayout after transitions complete
			setTimeout(function(){
				$grid.isotope('reLayout');
				resizeGrid();
			}, 800);

			$(window).resize(resizeGrid);
	});











	/**************************************************************
	 *
	 *	Card slideshows
	 *
	 **************************************************************/


	// don't initialise slider for People if width is less than 500
	var $cardSliders;
	if ($(window).width() > 500) {
		$cardSliders = $articles.find('.royalSlider');
	} else {
		$cardSliders = $articles.not('.people').find('.royalSlider');
	}

	if ($(window).width() > 500) {

	    $('.clients_slideshow .royalSlider').royalSlider({
			arrowsNav:			true,
			arrowsNavAutoHide:	false,
			//controlNavigation:	'none',
			slidesSpacing: 		0,
			loop:				true,
	    	autoPlay: {
				enabled:		true,
				pauseOnHover:	true,
				stopAtAction:	false,
				delay:			2000
	    	},
	    });

	    $('.intro-slideshow .royalSlider').royalSlider({
			arrowsNav:			false,
			controlNavigation:	'none',
			transitionType:		'fade',
			loop:				true,
	    	autoPlay: {
				enabled:		true,
				pauseOnHover:	true,
				stopAtAction:	false,
				delay:			1500
	    	}
	    });

	} else {

		$('.clients_slideshow .royalSlider').royalSlider({
			arrowsNav:			true,
			arrowsNavAutoHide:	false,
			sliderTouch: true,
			sliderDrag:true,
			navigateByClick: false,
			//controlNavigation:	'none',
			slidesSpacing: 		0,
			loop:				true,
	    	autoPlay: {
				enabled:		true,
				pauseOnHover:	false,
				stopAtAction:	false,
				delay:			2000
	    	},
	    });

	    $('.intro-slideshow .royalSlider').royalSlider({
			arrowsNav:			false,
			controlNavigation:	'none',
			transitionType:		'fade',
			loop:				true,
	    	autoPlay: {
				enabled:		true,
				pauseOnHover:	false,
				stopAtAction:	false,
				delay:			2000
	    	}
	    });

	}



	// default slider config
	$cardSliders.royalSlider({
		numImagesToPreload:		2,
		slidesSpacing: 			0,
		loop: 					true,
		loop:					true,
        arrowsNavAutoHide:		false,
        navigateByClick:		false,
        sliderDrag:				false
    });

	// set bullet widths as percentage
	$cardSliders.each(function(){

		var $this = $(this);
		var sliderInstance = $this.data('royalSlider');
		var numberOfSlides = sliderInstance.slides.length;
		var bulletWidth = sliderInstance.width / numberOfSlides;

		$this.find('.rsBullet').each(function(){
			$(this).css({width: bulletWidth});
		});

		if ( $this.find('.rsBullet').length === 1 ) {
			$this.find('.rsBullet').hide();
		}

	});




	/**************************************************************
	 *
	 *	Google Map
	 *
	 **************************************************************/

	 var mapOptions = {
		zoom: 16,
		//center: new google.maps.LatLng(51.51878, -0.1391671),
		center: new google.maps.LatLng(51.5193477, -0.1391671),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
		  {
		    "stylers": [
		      { "saturation": -100 }
		    ]
		  },{
		    "stylers": [
		      { "visibility": "simplified" }
		    ]
		  },{
		    "featureType": "road.arterial",
		    "stylers": [
		      { "color": "#757575" },
		      { "lightness": -100 }
		    ]
		  },{
		    "featureType": "poi",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		  },{
		    "featureType": "transit.station.rail",
		    "elementType": "labels.text",
		    "stylers": [
		      { "visibility": "on" }
		    ]
		  },{
		    "elementType": "labels.icon",
		    "stylers": [
		      { "saturation": 100 }
		    ]
		  },{
		    "featureType": "road.arterial",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      { "color": "#fffffe" },
		      { "visibility": "on" }
		    ]
		  },{
		    "featureType": "road.local",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      { "visibility": "on" },
		      { "color": "#acacac" }
		    ]
		  },{
		  },{
		  }
		]
	}

	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

	var image = new google.maps.MarkerImage(
		'http://thecornerlondon.com/wp-content/themes/thecorner-2013/images/map-marker-v2.png',
/*
		new google.maps.Size(90, 113),	// size
		new google.maps.Point(0, 0),	// origin
		new google.maps.Point(85, 55)	// anchor
*/
		new google.maps.Size(60, 45),	// size
		new google.maps.Point(0, 0),	// origin
		new google.maps.Point(9, 41)	// anchor
	);

	var tcPin = new google.maps.Marker({
		position: new google.maps.LatLng(51.5193477, -0.1391671),
		map: map,
		icon: image
	});

/*
	var tcAddress = '<img src="http://thecornerlondon.com/wp-content/themes/thecorner-2013/images/map-polaroid-photo.jpg" class="map-polaroid" alt="" /><p>65 Riding House Street,<br/>London,<br/>W1W 7EH<br/>United Kingdom</p>';
	var infowindow = new google.maps.InfoWindow({
	    content: tcAddress
	});
	google.maps.event.addListener(tcPin, 'click', function() {
		infowindow.open(map,tcPin);
	});
*/

	// refocus the map-center on resize
	$(window).resize(function(){
		map.setCenter(tcPin.position);
	});




 	/**************************************************************
	 *
	 *	Fetch Tweets, load into corresponding containers
	 *
	 **************************************************************/

	var numberOfTweets = $tweet_containers.length + 2;
	console.log(numberOfTweets);
	$.getJSON('http://api.twitter.com/1/statuses/user_timeline.json?screen_name=thecornerldn&count='+numberOfTweets+'&include_rts=1&callback=?', function(tweet){

		$tweet_containers.each(function(i){
			$(this).find('blockquote').html('\
				<p>' + tweet[i].text + '</p>\
				<a href="https://twitter.com/thecornerLDN/status/'+tweet[i].id_str+'" data-datetime="">'+tweet[i].created_at+'</a>\
			');
		});

		// append script which transforms the markup
		$("body").append( '<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>' );

	});

 	/**************************************************************
	 *
	 *	Shadowbox
	 *
	 **************************************************************/

	var TheCorner = {
	    SBAdjust: function() {
	        if (Shadowbox.hasNext())
	            $('#sb-body').addClass('sb-touch');

	        $(document).on('swipeleft', '.sb-touch', function (e) {
	            e.preventDefault();
	            Shadowbox.next();
	        });
	        $(document).on('swiperight', '.sb-touch', function (e) {
	            e.preventDefault();
	            Shadowbox.previous();
	        });
	        $(document).on('click', '#sb-player', function (e) {
	            e.preventDefault();
	            Shadowbox.next();
	        });
	    }
	}

	if ($(window).width() > 500) {

		Shadowbox.init({
		    onOpen: TheCorner.SBAdjust,
		    onClose: function() {
		        $('.sb-touch').removeClass('sb-touch');
		    },
			skipSetup: true,
			handleOversize	: "resize",
			continuous		: true,
			overlayColor	: '#F1F1F1',
			overlayOpacity	: '0.9',
			animate			: false
		});

		window.onload = function() {
		    Shadowbox.setup(".zoom, .zoom-img");
		};

		$('img.zoom-excluded').click(function(){
			$(this).parent().find('.zoom').first().trigger('click');
		});

	} else {
		$('a.zoom, a.zoom-img').click(function(e){e.preventDefault();})
	}



 	/**************************************************************
	 *
	 *	Drag & Drop
	 *
	 **************************************************************/

	if (!Modernizr.touch || isiPad) {

		$articles
			.on('draginit', function() {
				$(this).addClass('was-dragged');
			})
			.drag("start",function( ev, dd ){
				dd.limit = $grid.offset();
				dd.limit.bottom = dd.limit.top + $grid.outerHeight() - $( this ).outerHeight();
				dd.limit.right = dd.limit.left + $grid.outerWidth() - $( this ).outerWidth();
			})
			.drag(function( ev, dd ){
				$( this ).offset({
					top: Math.min( dd.limit.bottom, Math.max( dd.limit.top, dd.offsetY ) ),
					left: Math.min( dd.limit.right, Math.max( dd.limit.left, dd.offsetX ) )
				});
			},
			{ handle:".title-area" }
		);

	}

});

function resizeGrid () {
	setTimeout(function() {

		$windowHeight = $(window).height();
		$gridHeight = $('#grid').height();

		$gridPaddingTop = $('#grid').css('padding-top');
		$gridPaddingTop = parseInt($gridPaddingTop);

		$gridPaddingBottom = $('#grid').css('padding-bottom');
		$gridPaddingBottom = parseInt($gridPaddingBottom);

		$gridPadding = $gridPaddingTop + $gridPaddingBottom;
		$newHeight = $windowHeight - $gridPadding;

		if ($gridHeight < $windowHeight) {
			$('#grid').css('height', $newHeight);
		}
	}, 800);
}

/*
function resizeGridExpand () {
	setTimeout(function() {
		console.log('hello');

		$windowHeight = $(window).height();
		$gridHeight = $('#grid').height();

		$gridPaddingTop = $('#grid').css('padding-top');
		$gridPaddingTop = parseInt($gridPaddingTop);

		$gridPaddingBottom = $('#grid').css('padding-bottom');
		$gridPaddingBottom = parseInt($gridPaddingBottom);

		$gridPadding = $gridPaddingTop + $gridPaddingBottom;
		$newHeight = $windowHeight - $gridPadding;

		$('#grid').css('height', $newHeight);
	}, 800);
}
*/

