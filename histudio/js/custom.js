$(document).ready(function() {
	'use strict';
	//The event is triggered when the page loads
	$(window).on('load', (function(){
			$('html').css('overflow', 'auto');
			$('.load').fadeOut(300);
			var height = $('#portfolio div.project').width();
			$('#portfolio div.project').css('height', height + 'px');
		}
	));
	
	//The event is triggered when you change the page width
	$(window).on('resize', (function(){
			var height = $('#portfolio div.project').width();
			$('#portfolio div.project').css('height', height + 'px')
		}
	));
	
	//Twitter Bootstrup Scrolspy Plugin
	$('body').scrollspy({ target: '#navbar'})
	
	//Setting styles headers when the page loaded
	if ($(this).scrollTop() > 295){
		$('header').css('background', '#000');
	}
	else{
		$('header').css('background', 'none');
	}

	//Behavior headers when scrolling
	$(window).on('scroll', (function() {
		if ($(this).scrollTop() > 295){
			$('header').css('background', '#000');
		}
		else{
			$('header').css('background', 'none');
		}
	}));
	
	//Scroll top
	$('.navbar-brand').on('click', function(){
		$('body, html').animate({
			scrollTop: 0
		}, 0)
	})
	
	//Hover effect in Portfolio section
	$('#portfolio div.project').on({
		mouseenter: function () {
			$(this).find('a').animate({'opacity': '0.88'}, 200)
		},
		mouseleave: function () {
			$(this).find('a').animate({'opacity': '0'}, 200)
		}
	});

  
	//Portfolio filter
	$('#portfolio .filter li a').on('click', (function(e) {
		var category = $(this).data('category');
		$('#portfolio .filter li a').removeClass('active');
		$(this).addClass('active');
		if(category == 'all') {
		  $('#portfolio .works').children('div').show();
		}
		else {
			$('#portfolio .works').children('div:not(.' + category + ')').hide();
			$('#portfolio .works').children('div[data-element="' + category+'"]').show();
		}
		return false;
  	}));
  
	//Google Maps
	var latlng = new google.maps.LatLng(51.5233841, -0.0838453);
	var settings = {
		zoom: 20,
		 center: latlng,
		 scrollwheel: false,
		 mapTypeControl: true,
		 mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		 navigationControl: true,
		 navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		 mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"),settings);
	var marker = new google.maps.Marker({
                position: new google.maps.LatLng(51.5233841, -0.0838453),
                map: map,
                title: 'HiStudio!',
	});
});