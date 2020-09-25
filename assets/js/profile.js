$().ready(function() {
			
		var a=window.location.href.split('?');
		
	    var username=a[1];
        
		document.getElementById("user").innerHTML += a[1]; 
		document.getElementById('editprofilepage').innerHTML+='<a class="nav-link" href="/options/user.html?'+
		username+'\" target="_blank" >'+'<i class="nc-icon nc-tap-01"></i><p>Edit Profile</p></a>';
	

		
		
		
	chrome.runtime.sendMessage(
		{contentScriptQuery: 'getuserdetails' , username: username },
		function(response) {
			result = response.farewell;
			
			alert(result.raw);
			
			if(result.is_taken){
			
			document.getElementById("list_contact").innerHTML+='<div class="row"><div class="col-md-6 pr-1"> <div class="form-group"><label>Name:</label> </div></div>'+
                                                    
                                                '<div class="col-md-6 pl-1"><div class="form-group"> <h4 class="card-title">'+result.name+'</h4></div></div></div>'+
                                                
												'<div class="clearfix"></div>';
		
			}
		}	);
		
		
		
												
		
    $sidebar = $('.sidebar');
    $sidebar_img_container = $sidebar.find('.sidebar-background');

    $full_page = $('.full-page');

    $sidebar_responsive = $('body > .navbar-collapse');

    window_width = $(window).width();

    fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

	$('button[type="submit"]').click(function(e){
		
		var sender = $(this).closest('tr').find('#name').text();
		var subject = $(this).closest('tr').find('#mail').text();	
		//var message = $(this).closest('tr').find('#message').text();	
		
		$(this).closest('tr').remove();
		demo.showAlertBox('bottom','right' , subject + ' removed from list!' );
		//e.returnValue = true;
	});
	
	$('button[type="addcontact"]').click(function(e){
		//e.preventDefault();
		
		var name = document.getElementById("new_trust_name").value;
		var number = document.getElementById("new_trust_number").value;
		var mail = document.getElementById("new_trust_mail").value;
		
	
		
		
		/*$('#list_contact').html(document.getElementById("list_contact").innerHTML+
		'<tr>'+
									'<td>' + name + '</td>' + 
									'<td>' + mail + '</td>' + 
									'<td>' + number + '</td>' +
									'<td>' + 
									'<button type="submit" class="btn btn-info btn-fill pull-right">Remove</button>'+
									'</td>' +
								'</tr>'
		);*/
		
		chrome.runtime.sendMessage(
		{contentScriptQuery: 'querytrust' , username: username, name: name , mail: mail, number: number},
		function(response) {
			result = response.farewell;
			alert(result.raw  + "\n" + "Contact Name :" +result.name + "  Contact Email :" + result.email + "  Contact Number :"+ result.number);
		
			
		}	);
		
		
		
	});
	
	$('button[type="showcontact"]').click(function(e){
		//e.preventDefault();
		
		
	
		
		
		/*$('#list_contact').html(document.getElementById("list_contact").innerHTML+
		'<tr>'+
									'<td>' + name + '</td>' + 
									'<td>' + mail + '</td>' + 
									'<td>' + number + '</td>' +
									'<td>' + 
									'<button type="submit" class="btn btn-info btn-fill pull-right">Remove</button>'+
									'</td>' +
								'</tr>'
		);*/
		

		
		

		
		
			
		
		
		
		
		
	});
	
	$('button[type="editname"]').click(function(e){
		//e.preventDefault();
		
		var name = document.getElementById("new_name").value;

		alert(name);
		
		chrome.runtime.sendMessage(
		{contentScriptQuery: 'editname' , name: name },
		function(response) {
			result = response.farewell;
			alert(result.raw);
		}	);
		
		document.getElementById("new_name").value = ' ';
		
	});

	
    if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
        if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
            $('.fixed-plugin .dropdown').addClass('show');
        }

    }

    $('.fixed-plugin a').click(function(event) {
        // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
        if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
        }
    });

    $('.fixed-plugin .background-color span').click(function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
        }

        if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
        }
    });

    $('.fixed-plugin .img-holder').click(function() {
        $full_page_background = $('.full-page-background');

        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');


        var new_image = $(this).find("img").attr('src');

        if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
                $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                $sidebar_img_container.fadeIn('fast');
            });
        }

        if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
                $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
                $full_page_background.fadeIn('fast');
            });
        }

        if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
        }
    });

    $('.switch input').on("switchChange.bootstrapSwitch", function() {

        $full_page_background = $('.full-page-background');

        $input = $(this);

        if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeIn('fast');
                $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
                $full_page_background.fadeIn('fast');
                $full_page.attr('data-image', '#');
            }

            background_image = true;
        } else {
            if ($sidebar_img_container.length != 0) {
                $sidebar.removeAttr('data-image');
                $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
                $full_page.removeAttr('data-image', '#');
                $full_page_background.fadeOut('fast');
            }

            background_image = false;
        }
    });
});

type = ['primary', 'info', 'success', 'warning', 'danger'];

demo = {
    initPickColor: function() {
        $('.pick-class-label').click(function() {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },

    
    showNotification: function(from, align) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "nc-icon nc-app",
            message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

        }, {
            type: type[color],
            timer: 8000,
            placement: {
                from: from,
                align: align
            }
        });
    },
	
	showAlertBox: function(from, align, message_info) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "nc-icon nc-app",
            message: message_info

        }, {
            type: type[color],
            timer: 8000,
            placement: {
                from: from,
                align: align
            }
        });
    }
	
}
