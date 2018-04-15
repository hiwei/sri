$(document).ready(function() {
	cityBtn();
	featureBtn();

	$('#exploreIcon').click(function() {
		$('html, body').animate({ scrollTop: $('#intropage').offset().top }, 500);
	});
	$('#search_icon').click(function() {
		$('html, body').animate({ scrollTop: $('#mainblock').offset().top }, 500);
	});
	$('#home_icon').click(function() {
		$('html, body').animate({ scrollTop: 0 }, 500);
	});

	var objectTopIntropage = $('#intropage').offset().top - $(window).height() / 2;
	var objectTopMainblock = $('#mainblock').offset().top - $(window).height() / 3;
	function scroll() {
		if( $(window).scrollTop() >= objectTopIntropage ){
			$('#intro').addClass('fadeIn');
			$('#search_icon, #home_icon').fadeIn(500);
		} else {
			$('#search_icon, #home_icon').fadeOut(500);
		}
		if( $(window).scrollTop() >= objectTopMainblock ){
			$('#mainblock').addClass('lineEffect');
		}
	};
	document.onscroll = scroll;
});

var dataRequest = new XMLHttpRequest();
function cityBtn() {
	$('#mainblock_left ul li').click(function() {
		var currentCity = $(this).text();
		samePart();
		dataRequest.onload = function() {
			var myData = JSON.parse(dataRequest.responseText);
			for(i = 0; i < myData.length; i++) {
				if( currentCity == myData[i].city) {
					var printByCity = '<div class="info_item_city"><img src="img/' + myData[i].city + '.jpg"><section class="info_city_right"><p class="cityname">' + myData[i].city + '</p><span>' + myData[i].info + '</span></section></div>'
					$('#resultcontainer_city').append(printByCity);
				}
			}
		},
		dataRequest.send();
	})
}
function featureBtn() {
	$('#mainblock_right ul li').click(function() {
		var currentFeature = $(this).text();
		samePart();
		dataRequest.onload = function() {
			var myData = JSON.parse(dataRequest.responseText);
			for(i = 0; i < myData.length; i++) {
				for(j = 0; j < myData[i].feature.length; j++) {
					if( currentFeature == myData[i].feature[j]) {
						var printByFeature = '';
						printByFeature += '<div class="info_item_feature"><img src="img/' + myData[i].city + '.jpg"><p class="cityname">' + myData[i].city + '</p><span>' + myData[i].info + '</span></div>'
						$('#resultcontainer_feature').append(printByFeature);
					}
				}
			}
		},
		dataRequest.send();
	})
}

function samePart() {
	dataRequest.open('GET', 'js/info.json');
	$('html, body').animate({ scrollTop: $('#resultblock').offset().top }, 500);
	$('#resultcontainer_feature, #resultcontainer_city').html('');
}