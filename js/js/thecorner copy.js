/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/ (function(a) {
    function m() {
        d.setAttribute("content", g), h = !0
    }
    function n() {
        d.setAttribute("content", f), h = !1
    }
    function o(b) {
        l = b.accelerationIncludingGravity, i = Math.abs(l.x), j = Math.abs(l.y), k = Math.abs(l.z), (!a.orientation || a.orientation === 180) && (i > 7 || (k > 6 && j < 8 || k < 8 && j > 6) && i > 5) ? h && n() : h || m()
    }
    var b = navigator.userAgent;
    if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(b) && b.indexOf("AppleWebKit") > -1)) return;
    var c = a.document;
    if (!c.querySelector) return;
    var d = c.querySelector("meta[name=viewport]"),
        e = d && d.getAttribute("content"),
        f = e + ",maximum-scale=1",
        g = e + ",maximum-scale=10",
        h = !0,
        i, j, k, l;
    if (!d) return;
    a.addEventListener("orientationchange", m, !1), a.addEventListener("devicemotion", o, !1)
})(this);

var isiPad = navigator.userAgent.match(/iPad/i) != null;

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function resetDraggedCards() {
    $articles.each(function() {
        var $this = $(this);
        if ($this.hasClass('was-dragged')) {
            $this.css({
                'left': 0,
                'top': 0
            }).removeClass('was-dragged');
        }
    });
}

$.extend($.Isotope.prototype, {

    _fitRowsResizeChanged: function() {
        resetDraggedCards();
        return true;
    },
    _masonryResizeChanged: function() {
        resetDraggedCards();
        return this._checkIfSegmentsChanged();
    },

    _fitRowsLayout: function($elems) {

        var instance = this,
            containerWidth = this.element.width(),
            props = this.fitRows;

        $elems.each(function(i) {

            var $this = $(this),
                cardW = $this.outerWidth(true),
                cardH = $this.outerHeight(true);

            // adjust the position a little to create overlaps
            if (containerWidth > 500 && !isiPad) {
                props.x = props.x / getRandomNumber(1, 1.08);
                props.y = props.y / getRandomNumber(1.09, 1.1);
            }

            if (props.x !== 0 && cardW + props.x > containerWidth) {
                // if this element cannot fit in the current row
                if (containerWidth > 500 && !isiPad) {
                    props.x = getRandomNumber(-100, 250);
                } else {
                    props.x = 0;
                }

                props.y = props.height;
            }

            // position the element
            instance._pushPosition($this, props.x, props.y);

            props.height = Math.max(props.y + cardH, props.height);
            props.x += cardW;

        });

    }
});



$(function() {

    // ie7 redirect
    if ($.browser.msie && parseInt($.browser.version, 10) <= 7) window.location = "/upgrade-browser/";

    // hide URL bar under iOS
    window.setTimeout(function() {
        window.scrollTo(0, 0);
    }, 0);

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
        $('#mashead-slider .desktop').remove();
        $('article.people:not(.foundingpartners)').remove();
    } else {
        $('#mashead-slider .mobile').remove();
    }

    if ($(window).width() < 500) {

        // adjust card order
        $articles.filter('.foundingpartners').insertAfter($articles.filter('.clients_slideshow'));
        $articles.filter('.intro-slideshow').after($articles.filter('.about'));
        $articles.filter('.about').last().remove();

        // remove "More +"
        $('.revealable').show();
        $('.content .toggle').remove();
    }



    /**************************************************************
     *
     *	Direct-link to specific card (push to front)
     *  if the URL has a hash, e.g. "#dio-sigur-ros"
     *
     **************************************************************/

    if (location.hash) {
        var hash = location.hash.replace(/^.*#/, '');
        var $requested_article = $articles.filter('[data-hash="' + hash + '"]');
        $requested_article.insertBefore($articles.first());
    }


    /**************************************************************
     *
     *	Header navigation
     *
     **************************************************************/

    $('#scroll-to-top').click(function(e) {

        // clean up selected hashtags/filters/menus
        $hashtagLinks.removeClass('selected');
        $filterLinks.removeClass('selected');
        if ($filter.hasClass('visible')) $filter.removeClass('visible');
        if ($hashtags.hasClass('visible')) $hashtags.removeClass('visible');
        $('#toggle-hashtags').html('&nbsp;');
        $header.removeClass('show-pulldown');
        $('.blind').removeClass('visible');

        var scrollTop = $(window).scrollTop();
        var duration = (scrollTop > 1000) ? '1000' : scrollTop;

        $('html, body').stop().animate({
            scrollTop: 0
        }, {
            duration: duration,
            complete: function() {
                resetDraggedCards();
                // reset Isotope layout mode and filters
                $grid
                    .removeClass('masonry-mode').addClass('fitRows')
                    .isotope({
                    filter: '',
                    layoutMode: 'fitRows',
                    sortBy: 'original-order'
                });

                setTimeout(function() {
                    $grid.isotope('reLayout');
                }, 1000);

            }
        });

        e.preventDefault();

    });

    $('#toggle-hashtags').click(function(e) {
        if ($filter.hasClass('visible')) $filter.removeClass('visible');
        if ($header.hasClass('show-pulldown')) {
            $header.removeClass('show-pulldown');
            $('.blind').removeClass('visible');
        }
        $hashtags.toggleClass('visible');
        e.preventDefault();
    });

    $('#toggle-filter').click(function(e) {
        if ($hashtags.hasClass('visible')) $hashtags.removeClass('visible');
        if ($header.hasClass('show-pulldown')) {
            $header.removeClass('show-pulldown');
            $('.blind').removeClass('visible');
        }
        $filter.toggleClass('visible');
        e.preventDefault();
    });

    $('#toggle-contact-pulldown').click(function(e) {

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

    if ($('body').hasClass('with-masthead-slider')) {
        $("#masthead-slider").royalSlider({
            autoPlay: {
                enabled: true,
                pauseOnHover: true,
                delay: 3000
            },
            transitionType: 'fade',
            loop: true,
            arrowsNav: false,
            imageScaleMode: 'fill'
        });
    }


    /**************************************************************
     *
     *	Initialise Isotope
     *
     **************************************************************/

    $grid.isotope({
        itemSelector: 'article',
        layoutMode: 'fitRows'
    });

    // Twitter cards loaded async, reLayout necessary
    $(window).load(function() {
        $grid.isotope('reLayout');
    });


    /**************************************************************
     *
     *	Project description toggle
     *
     **************************************************************/

    $articles.filter('.feature').find('.toggle').click(function() {
        $(this)
            .toggleClass('active')
            .parent().find('.revealable').stop().slideToggle();

        /*
		if ($grid.hasClass('masonry-mode')) {
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

    $articles.filter('.people-slidedown').find('.toggle').click(function() {
        $(this)
            .toggleClass('active')
            .parent().find('.content').stop().slideToggle();
    });



    /**************************************************************
	 *
	 *	Isotope: "category" filtering (non-additive)
	 *
	 
	
	$filterLinks.click(function(e){
		
		resetDraggedCards();
		
		// scroll to top of grid
		$('html, body').scrollTop('0');

		// clean up selected hashtags if any
		$hashtagLinks.removeClass('selected');
		
		var $this = $(this);
		
		if ($this.hasClass('selected')) {
			$this.removeClass('selected');
		} else {
			$filterLinks.removeClass('selected');
			$this.toggleClass('selected');			
		}

		var filter = $filterLinks.filter('.selected').attr('data-filter-value');
		var sortOrder = (filter === '.people') ? 'random' : 'original-order';

		if (filter) {			
			// show filtered Masonry grid
			$grid
			.removeClass('fitRows').addClass('masonry-mode')
			.isotope({ filter: filter, layoutMode : 'masonry', sortBy: sortOrder }, function( $changedItems, instance ) {
				instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
				instance.$filteredAtoms.addClass('is-filtered');				
			});			
			
		} else {
			// show All in randomised grid		
			$grid
			.removeClass('masonry-mode').addClass('fitRows')
			.isotope({ filter: '', layoutMode : 'fitRows', sortBy: sortOrder }, function( $changedItems, instance ) {
				instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
			});			
		}

		// reLayout after transitions complete
		setTimeout(function(){
			$grid.isotope('reLayout');
		}, 800);
		
		e.preventDefault();
			
	});
	
	// set width in px, to overcome percentage fraction rounding bug in Webkit
	$filter.find('li').each(function(){
		$(this).css({'width' : $(window).width() / $filter.find('li').length});
	});
	$(window).resize(function(){
		$filter.find('li').each(function(){
			$(this).css({'width' : $(window).width() / $filter.find('li').length});
		});
	});
	
	**************************************************************/

    /**************************************************************
     *
     *	Isotope: hashtag filtering (additive or non-additive)
     *
     **************************************************************/

    $hashtagLinks.click(function(e) {

        var $this = $(this);
        var scrollTop = $(window).scrollTop();
        var duration = (scrollTop > 1000) ? '1000' : scrollTop;

        if ($(window).width() < 500) {
            $(window).scrollTop(0);
        }

        if (scrollTop < 210) {
            // scrollTo #grid
            $body.stop().animate({
                scrollTop: 210
            }, {
                duration: duration,
                complete: function() {
                    processHashtagSelection($this);
                }
            });
        } else {
            processHashtagSelection($this);
        }

        function processHashtagSelection($this) {

            resetDraggedCards();

            if ($this.text() === 'all' || $this.text() === 'Clear filter' || $this.text() === $('#toggle-hashtags').text()) {
                $('#toggle-hashtags').html('&nbsp;');
            } else {
                $('#toggle-hashtags').html('<span>' + $this.text() + '</span>');
            }

            // clean up selected "categories" if any				
            $filterLinks.removeClass('selected');

            if ($this.hasClass('selected')) {
                $hashtagLinks.removeClass('selected');
                // reset Isotope layout mode and filters
                $grid
                    .removeClass('masonry-mode').addClass('fitRows')
                    .isotope({
                    filter: '',
                    layoutMode: 'fitRows',
                    sortBy: 'original-order'
                });
            } else {

                // option A: additive
                /*
				$this.toggleClass('selected');
				var filters = [];		
				$hashtagLinks.filter('.selected').each(function(){
					filters.push( $(this).attr('data-filter-value') );
				});
				filters = filters.join(', ');
				*/
                // end option A

                // option B: non-additive		
                $hashtagLinks.removeClass('selected');
                $this.addClass('selected');
                var filters = $this.attr('data-filter-value');
                // end option B

                if (filters) {
                    $grid
                        .removeClass('fitRows').addClass('masonry-mode')
                        .isotope({
                        filter: filters,
                        layoutMode: 'masonry'
                    }, function($changedItems, instance) {
                        instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
                        instance.$filteredAtoms.addClass('is-filtered');
                    });
                } else {
                    // reset Isotope layout mode and filters
                    $grid
                        .removeClass('masonry-mode').addClass('fitRows')
                        .isotope({
                        filter: '',
                        layoutMode: 'fitRows',
                        sortBy: 'original-order'
                    });
                }

            }

            // reLayout after transitions complete
            setTimeout(function() {
                $grid.isotope('reLayout');
            }, 800);

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


    $('.sidebar .tags a').click(function(e) {
        $hashtagLinks.filter(':contains("' + $(this).text() + '")').trigger('click');

        if ($hashtags.hasClass('visible')) $hashtags.removeClass('visible');
        $('.blind').removeClass('visible');

        e.preventDefault();
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

    $('.clients_slideshow .royalSlider').royalSlider({
        arrowsNav: true,
        arrowsNavAutoHide: false,
        //controlNavigation:	'none',
        slidesSpacing: 0,
        loop: true,
        autoPlay: {
            enabled: true,
            pauseOnHover: true,
            stopAtAction: false,
            delay: 2000
        },
    });

    $('.intro-slideshow .royalSlider').royalSlider({
        arrowsNav: false,
        controlNavigation: 'none',
        transitionType: 'fade',
        loop: true,
        autoPlay: {
            enabled: true,
            pauseOnHover: true,
            stopAtAction: false,
            delay: 2000
        }
    });

    // default slider config
    $cardSliders.royalSlider({
        numImagesToPreload: 2,
        slidesSpacing: 0,
        loop: true,
        loop: true,
        arrowsNavAutoHide: false,
        navigateByClick: false,
        sliderDrag: false
    });

    // set bullet widths as percentage
    $cardSliders.each(function() {

        var $this = $(this);
        var sliderInstance = $this.data('royalSlider');
        var numberOfSlides = sliderInstance.slides.length;
        var bulletWidth = sliderInstance.width / numberOfSlides;

        $this.find('.rsBullet').each(function() {
            $(this).css({
                width: bulletWidth
            });
        });

        if ($this.find('.rsBullet').length === 1) {
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
        center: new google.maps.LatLng(51.51878, -0.1391671),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
                "stylers": [{
                        "saturation": -100
                    }
                ]
            }, {
                "stylers": [{
                        "visibility": "simplified"
                    }
                ]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                        "color": "#757575"
                    }, {
                        "lightness": -100
                    }
                ]
            }, {
                "featureType": "poi",
                "stylers": [{
                        "visibility": "off"
                    }
                ]
            }, {
                "featureType": "transit.station.rail",
                "elementType": "labels.text",
                "stylers": [{
                        "visibility": "on"
                    }
                ]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                        "saturation": 100
                    }
                ]
            }, {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                        "color": "#fffffe"
                    }, {
                        "visibility": "on"
                    }
                ]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                        "visibility": "on"
                    }, {
                        "color": "#acacac"
                    }
                ]
            }, {}, {}
        ]
    }

    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    var image = new google.maps.MarkerImage(
        'http://thecornerlondon.com/site2.0/wordpress/wp-content/themes/thecorner/images/map-marker-v2.png',
    /*
		new google.maps.Size(90, 113),	// size
		new google.maps.Point(0, 0),	// origin
		new google.maps.Point(85, 55)	// anchor
*/
    new google.maps.Size(60, 45), // size
    new google.maps.Point(0, 0), // origin
    new google.maps.Point(9, 41) // anchor
    );

    var tcPin = new google.maps.Marker({
        position: new google.maps.LatLng(51.5193477, -0.1391671),
        map: map,
        icon: image
    });

    /*
	var tcAddress = '<img src="http://thecornerlondon.com/site2.0/wordpress/wp-content/themes/thecorner/images/map-polaroid-photo.jpg" class="map-polaroid" alt="" /><p>65 Riding House Street,<br/>London W1W 7EH<br/>United Kingdom</p>';
	var infowindow = new google.maps.InfoWindow({
	    content: tcAddress
	});
	google.maps.event.addListener(tcPin, 'click', function() {
		infowindow.open(map,tcPin);
	});
*/

    // refocus the map-center on resize
    $(window).resize(function() {
        map.setCenter(tcPin.position);
    });




    /**************************************************************
     *
     *	Fetch Tweets, load into corresponding containers
     *
     **************************************************************/

    var numberOfTweets = $tweet_containers.length + 1;

    $.getJSON('http://api.twitter.com/1/statuses/user_timeline.json?screen_name=thecornerldn&count=' + numberOfTweets + '&callback=?', function(tweet) {

        $tweet_containers.each(function(i) {

            if (typeof(tweet[i]) !== "undefined") {
                $(this).find('blockquote').html('\
					<p>' + tweet[i].text + '</p>\
					<a href="https://twitter.com/thecornerLDN/status/' + tweet[i].id_str + '" data-datetime="">' + tweet[i].created_at + '</a>\
				');
            } else {
                $(this).remove();
            }


        });

        // append script which transforms the markup
        $("body").append('<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>');


    });



    /**************************************************************
     *
     *	Shadowbox
     *
     **************************************************************/

    if ($(window).width() > 500) {

        Shadowbox.init({
            skipSetup: true,
            handleOversize: "resize",
            continuous: true,
            overlayColor: '#F1F1F1',
            overlayOpacity: '0.9',
            animate: false
        });

        window.onload = function() {
            Shadowbox.setup(".zoom, .zoom-img");
        };

        $('img.zoom-excluded').click(function() {
            $(this).parent().find('.zoom').first().trigger('click');
        });

    } else {
        $('a.zoom, a.zoom-img').click(function(e) {
            e.preventDefault();
        })
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
            .drag("start", function(ev, dd) {
            dd.limit = $grid.offset();
            dd.limit.bottom = dd.limit.top + $grid.outerHeight() - $(this).outerHeight();
            dd.limit.right = dd.limit.left + $grid.outerWidth() - $(this).outerWidth();
        })
            .drag(function(ev, dd) {
            $(this).offset({
                top: Math.min(dd.limit.bottom, Math.max(dd.limit.top, dd.offsetY)),
                left: Math.min(dd.limit.right, Math.max(dd.limit.left, dd.offsetX))
            });
        }, {
            handle: ".title-area"
        });

    }

});