!function(jQuery) {
	jQuery(document).ready(function() {
		RSSocial.moveToBody();
		RSSocial.captionEqualWidth();
		RSSocial.showOnClick();
		RSSocial.showOnPosition();
		if (jQuery('.rssocial-container .rssocial-sharing').length) {
			setTimeout(function() {
				RSSocial.hideSocialsList();
			}, 1500);
		} else {
			RSSocial.hideSocialsList();
		}
	});
	jQuery(window).resize(function() {
		RSSocial.showOnPosition();
		RSSocial.hideSocialsList();
	});
}(window.jQuery);

var RSSocial = {
	captionEqualWidth: function() {
		var max_width = Math.max.apply(null, jQuery('.rssocial-caption').map(function () {
			return jQuery(this).outerWidth(true);
		}).get());
		
		jQuery('.rssocial-icons .rssocial-caption').each(function() {
			jQuery(this).css('min-width', '155px');
			jQuery(this).css('width', max_width + 'px');
		});
		jQuery('.rssocial-icons-sharing .rssocial-caption').each(function() {
			jQuery(this).css('min-width', '75px');
			jQuery(this).css('width', max_width + 'px');
		});
	},
	moveToBody: function(id) {
		jQuery('.rssocial-container').each(function() {
			var container = jQuery(this);
			
			if (container.hasClass('rssocial-floating-left') || container.hasClass('rssocial-floating-right') || container.hasClass('rssocial-floating-top') || container.hasClass('rssocial-floating-bottom')) {
				container.appendTo(document.body);
			}
		});
	},
	showOnClick: function() {
		jQuery('.rssocial-container').each(function() {
			var container	= jQuery(this),
				popup_btn	= container.find('#rssocial-popup-button'),
				slide_btn	= container.find('#rssocial-slide-button');
				
			popup_btn.on('click', function() {
				container.toggleClass('visible');
				container.find('.rssocial-icons > li, .rssocial-icons-sharing > li').each(function() {
					jQuery(this).removeClass('popup');
				});
				
				if (container.hasClass('visible')) {
					container.find('.rssocial-icons > li, .rssocial-icons-sharing > li').each(function(index) {
						jQuery(this).delay(index * 50);
						jQuery(this).queue(function () {
							jQuery(this).addClass('popup');
							jQuery(this).dequeue();
						});
					});
				}
			});
			
			slide_btn.on('click', function() {
				container.toggleClass('open');
			});
		});
	},
	showOnPosition: function () {
		jQuery('.rssocial-container').each(function() {
			var container	= jQuery(this),
				social		= jQuery(this).find('.rssocial-icons > li:first-of-type, .rssocial-icons-sharing > li:first-of-type'),
				socials_nr	= jQuery(this).find('.rssocial-icons > li:not(.rssocial-slide-button), .rssocial-icons-sharing > li:not(.rssocial-slide-button)').length,
				right		= (parseInt(container.width() - Math.round(social.outerWidth(true) * socials_nr)) !== 0) ? Math.round((container.width() - (social.outerWidth(true) * Math.floor(container.width() / social.outerWidth(true)))) / 2) : 0,
				slide_btn	= container.find('.rssocial-slide-button');
				
			if (container.hasClass('rssocial-floating-top') || container.hasClass('rssocial-floating-bottom')) {
				slide_btn.css('right', right + 'px');
			}
		});
	},
	hideSocialsList: function() {
		jQuery('.rssocial-container:not(.rssocial-popup)').each(function() {
			var container		= jQuery(this),
				container_size	= 0,
				margin			= 0;
				
			// Floating positions
			if (container.hasClass('rssocial-floating-left')) {
				margin			= Math.round(parseFloat(container.find('.rssocial-slide-button').css('marginLeft').replace('px', '')));
				container_size	= container.outerWidth() + parseFloat(container.css('marginRight').replace('px', '')) + margin;
				container.css('marginLeft', '-' + container_size + 'px');
			} else if (container.hasClass('rssocial-floating-right')) {
				margin			= Math.round(parseFloat(container.find('.rssocial-slide-button').css('marginRight').replace('px', '')));
				container_size	= container.outerWidth() + parseFloat(container.css('marginLeft').replace('px', '')) + margin;
				container.css('marginRight', '-' + container_size + 'px');
			} else if (container.hasClass('rssocial-floating-top')) {
				margin			= Math.round(parseFloat(container.find('.rssocial-slide-button').css('marginTop').replace('px', '')));
				container_size	= container.outerHeight() + parseFloat(container.css('marginBottom').replace('px', '')) + margin;
				container.css('marginTop', '-' + container_size + 'px');
			} else if (container.hasClass('rssocial-floating-bottom')) {
				margin			= Math.round(parseFloat(container.find('.rssocial-slide-button').css('marginBottom').replace('px', '')));
				container_size	= container.outerHeight() + parseFloat(container.css('marginTop').replace('px', '')) + margin;
				container.css('marginBottom', '-' + container_size + 'px');
			}
		});
	}
};