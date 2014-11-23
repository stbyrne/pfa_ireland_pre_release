var app = {
    pagelist : [],
    pageidlist : [],
    pagetextcontent : [],
    staticlist : []

};

$(function(){
    
/*FastClick.attach(document.body);*/
  
   
///////////////////Ajax jsonp function to get data from json file////////////////
		
    
function jsonTitles(holdData){

    $.ajax({
        url: 'http://www.stuartbyrne.com/pfai/content.json',
        /*url: 'content.json',*/
        jsonpCallback: 'jsonCallback',
        dataType: 'jsonp',
        cache: false,
        timeout: 5000,
        success: function(data) {
            /*console.log(data);*/
            holdData(data);
            initiateList();
            
        },
        error: function() {
            alert('Unable to connect to database. Current Player Transfer List & Latest News will not be included. Please check your connection and restart the application.');
            
            $.ajax({
       
                url: 'content.json',
                jsonpCallback: 'jsonCallback',
                dataType: 'jsonp',
                cache: false,
                /*timeout: 5000,*/
                success: function(data) {
                    console.log(data);
                    holdData(data);
                    initiateBackList();
                    
                },
                error: function() {
                    alert('Error loading. Please re-open the app.');
                }
                
            });
        }   
        
    });
}
    
///////////////////Calls the ajax jsonp function which retreives the data////////////////

    
jsonTitles(function(content){
    
        var	appTitle = $(content.app).attr('appTitle'),
            subTitle = $(content.app).attr('subTitle'),
            newsTitle = $('#newsTitle'),
            /*newsList = $('#newsList'),*/
            collapseList = $('#collapseList'),
            homeList = $('#homeList'),
            transList = $('#transList'),
            logLeft = $('#loglistLeft'),
            $body = $('body'),
            section = $(content.app.section);
    
    
    
    
///////////////////Assigning Titles from json array//////////////////////
    
    
        $('#home div h1').html(appTitle);
        $('#home div h2').html(subTitle);
            
    
///////////////////Parsing through the json file and applying variables to the different titles////////////////
            
        section.each(function(i){
                    var num = i + 1,
                        pageid = $(this).attr('id'),
                        pagetitle = $(this).attr('title'),
                        pagecontent = $(this).attr('content');
            
                        app.pagelist.push(pagetitle);
                        /*testArray.push(pagetitle);*/
                        app.pageidlist.push(pageid);
                        app.pagetextcontent.push(pagecontent);
                        app.staticlist.push(pageid);
            
////////////////////Create List navigation in left panel on home page///////////////////////
            
        homeList.append(
            $('<li />', {
                'data-theme': 'c'
            }).html('<a href="#' + pageid + '"><span class="icon-' + pageid + '">&nbsp;' + pagetitle + '</span></a><span class="arrow-right"></span>')).listview('refresh');
            
            console.log('refreshing list')
            
            
///////////////////Creates the individual pages for each section////////////////
                        $body.append($('<div />', {
                            id: pageid,
                            'data-role': 'page'
                        }).append($('<div />', {
                            'data-role': 'header',
                            'data-position': 'fixed',
                            id: pageid + 'header',
                            'data-theme': 'c'
                        }).html('<a href="#left-panel" id="menuNav" class="ui-nodisc-icon" data-role="none"><img src="images/svg/nav_g.svg"/>Menu</a><h1 id="sectionTitle">'+ pagetitle +'</h1><a href="#home" id="homeNav" class="ui-icon-nodisc" data-role="none">Home</a>')).each(function(){
                        
                            $(this).append($('<div />', {
                                'data-role': 'content',
                                'id': pageid + 'Content'
                            })).append($('<div />', {
                                    'data-role': 'panel',
                                    'class': 'ui-icon-alt',
                                    id: 'left-panel'
                                    }).each(function(){
                                
                                            $(this).append($('<div />', {
                                                                        'data-role': 'content' 
                                                                        }).append($('<ul />', {
                                                                        'data-role': 'listview',
                                                                        'data-icon': 'false',
                                                                        'class': 'ui-nodisc-icon ui-alt-icon',
                                                                        'id': 'listLeft'
                                                                        })))
                                                    }))
                                        }));

            
});//////End of Section Loop//////
    
    

    
////////////////////Add loader to Maps page/////////////////////
    
    $('#mapsContent').append($('<div/>', {
        'id': 'loader'
    }).html('<h2>Loading Map</h2><img src="images/load.gif"/>'));
                   
           
    });///End jsonTitles Function///
    
    
});///End jQuery Function///




/////////////Apply click styling to communication buttons on homepage//////////////

/*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){};*/

 /*if( /Chrome|Safari|IE/i.test(navigator.userAgent) ) {*/

     /*$('#com div a').on('touchstart', function(){
         $(this).css({'background': 'rgb(95,95,95)', 'color': '#fff'});
            }).on('touchend', function(){
                $(this).css({'background': 'rgba(255,255,255,.6)', 'color': 'rgb(95,95,95)'});
                });*/
           
        /*}else{
            $('#com div a').on('touchstart', function(){
         $(this).css({'background': 'rgba(209, 209, 209, 0.8)', 'color': '#000'});
            }).on('touchend', function(){
                $(this).css({'background': 'rgba(20, 20, 20, 0.8)', 'color': 'rgb(204, 204, 204)'});
                });
            
        }*/


/////////////Apply click events to communication buttons on homepage//////////////

/*$('#mail').on('click', function(){
    $(this).attr('href', 'mailto:info@pfai.ie');
    });

$('#call').on('click', function(){
    $(this).attr('href', 'tel:0035318999350');
    });

$('#twitter').on('click', function(){
window.open('https://twitter.com/PFAIOfficial');
    });

$('#face').on('click', function(){
window.open('https://www.facebook.com/pages/PFAIOfficial/137333183069003');
    });*/

   

////////////////////Build transfer list/news pages on successful ajax request//////////////////////////

/*setTimeout(function(){*/
    
function initiateList(){
    
////////////////////Re-arranging the arrays for static text content i.e removing 'transfer list' and 'news' sections/////////////////////
    
    app.staticlist.splice(0, 2);
    app.staticlist.pop();
    
    console.log(app.staticlist);
    
    app.pagetextcontent.splice(0, 2);
    app.pagetextcontent.pop();
    
////////////////////Add static text content to static pages/////////////////////
    
    $(app.staticlist).each(function(i){
        var pagename = app.staticlist[i],
            pagetext = app.pagetextcontent[i];
           
           $('#' + pagename + 'Content').html('<img class="static-image" src="images/content/' + pagename + '.png"/><p>' + pagetext + '</p>');
               
    });
    
////////////////////Create empty table for dynamic transfer listed player//////////////////////////
    
    $('#transferlistContent').html('<table><thead><tr><th><img src="images/player.svg"/>Player</th><th>Club</th><th>Pos</th><th>DOB</th></tr></thead><tbody></tbody></table>');
    
    /*$('#transferlistContent').html('<table><thead><tr><th>No.</th><th>Name</th><th>Club</th><th>Pos</th><th>Age</th><th>dob</th><th>kg</th><th>Exp</th></tr></thead><tbody></tbody></table>');*/
    
////////////////////Get Current Transfer List from getList.php//////////////////////////
    
    function getList(holdData){
                
        $.ajax({
        
            /*url: 'getList.php',*/
            url: 'http://pfai.fireflyweb.ie/mobile/transferliststream',
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                holdData(data);
            },
            error: function(){
                   $.ajax({
        
                    url: 'getList.json',
                    dataType: 'json',
                    cache: false,
                    success: function(data) {
                        holdData(data);
                    }
                });
            }
        });
}
    
    
    getList(function(list){
        
        console.log(list);
        
        $.each(list, function(i){
             console.log(this['First Name']);  
        });
        
        var $tbody = $('#transferlistContent tbody');
        
        $.each(list, function(i){
            
            
            var playerNum = this['nid'],
                $firstName = this['First Name'],
                $lastName = this['Last Name'],
                $name = $firstName+' '+$lastName,
                $dobTag = this['Date of Birth'],
                $dobString = $($dobTag).attr('content'),
                $dob = new Date($dobString),
                $dobDate = $dob.getDate(),
                $dobMonth = $dob.getMonth(),
                $dobYear = $dob.getFullYear(),
                $dobPlayer = $dobDate + '/' + $dobMonth + '/' + $dobYear,
                /*$dob = $dobTag.replace(/<\/?[^>]+>/gi, ''),*/
                $previousArray = this['Previous Clubs'],
                $positionArray = this['Position'];
            
            console.log($dobPlayer);
            
////////////////////Loop thru Positions from json//////////////////////////
            
            /*if($positionNum<=1){
                var $position = $(detail.Positions.item).attr('#text');
                $positionArray.push($position);
                console.log($position);
            }
            
            if($positionNum>1){
                for(var j = 0; j < $items[i].Positions.item.length; j++){
                    var $position = $(detail.Positions.item[j]).attr('#text');
                    $positionArray.push($position);
                    console.log($position);
                }
               
            }
            
/////////////*////////Loop thru Clubs from json//////////////////////////
            
            /*if($clubNum<=1){
                var $previousClubs = $(detail.Previous_Clubs.item).attr('#text');
                $previousArray.push($previousClubs);
                console.log($previousClubs);
            }
            
            if($clubNum>1){
                for(var j = 0; j < $items[i].Previous_Clubs.item.length; j++){
                    var $previousClubs = $(detail.Previous_Clubs.item[j]).attr('#text');
                    $previousArray.push($previousClubs);
                    console.log($previousClubs);
                }
            }*/
            
            /*<td>' + playerNum + '</td>*/
            
            $tbody.append($('<tr/>', {
                'id': 'row'
            }).html('<td>' + $name + '</td><td>' + $previousArray + '</td><td>' + $positionArray + '</td><td>' + $dobPlayer + '</td>'))
            
            /*$tbody.append($('<tr/>', {
                'id': 'row'
            }).html('<td>' + playerNum + '</td><td>' + $name + '</td><td>' + $club + '</td><td>' + $pos + '</td><td>' + $dob + '</td>'));*/
            
            });
        });
    
////////////////////Get Current News from getNews.php//////////////////////////
    
    function getNews(holdNews){
                    
            $.ajax({
            
                /*url: 'getNews.php',*/
                /*url: 'http://www.stuartbyrne.com/pfai/getNews.php',*/
                url: 'http://pfai.fireflyweb.ie/mobile/pfainews',
                dataType: 'json',
                cache: false,
                success: function(data) {
                    console.log(data);
                    holdNews(data);
                },
                error: function(){
                   $.ajax({
        
                    url: 'getNews.json',
                    dataType: 'json',
                   cache: false,
                    success: function(data) {
                        holdNews(data);
                    }
                });
            }
            });
    }
    
    
    getNews(function(news){
        
        var newsContent = $('#newsContent');
        
    
        newsContent.append($('<ul/>', {
                        'data-theme': 'c',
                        'data-role': 'listview',
                        'id': 'newslist',
                        'class': 'ui-nodisc-icon ui-alt-icon'
                    
        }));
        
                        
        $.each(news, function(i){
            
            var articleNum = i + 1,
                $body = $('body'),
                $articleid = this['nid'],
                $timestamp = new Date(this['date']*1000),
                $articledate = $timestamp.toDateString(),
                /*$articledate = $datestring.slice(0, -4),*/
                $headline = $.trim(this['node_title']),
                regex = /<img.*?src="(.*?)"/,
                $image = regex.exec(this['field_image'])[1],
                $thumb = regex.exec(this['thumbnail'])[1],
                $text = this['body'],
                $intro = $.trim($text.replace('<p>', '').substr(0,80)),
                $newslist = $('#newslist');
            
            console.log($articledate);
            
            /*if($imageNum<=1){
                var $imageString = $(detail.field_image.item).attr('#text'),
                    regex = /<img.*?src="(.*?)"/,
                    $image = regex.exec($imageString)[1];
                    
                $imageArray.push($image);
                console.log($image);
            }*/
            
            /*if($positionNum>1){
                for(var j = 0; j < $items[i].Positions.item.length; j++){
                    var $position = $(detail.Positions.item[j]).attr('#text');
                    $positionArray.push($position);
                    console.log($position);
                }
               
            }*/
        
        $newslist.append(
                        $('<li />', {
                            /*'data-theme': 'c',*/
                            'data-icon': 'false',
                            'class': 'ui-icon-alt ui-icon-nodisc'
                        }).html('<a href="#' + $articleid + '"><img src="' + $thumb + '"><h2>' + $headline + '</h2><p>' + $intro +'</p><p class="ui-li-aside">' + $articledate + '</p></a><span class="arrow-right-news"></span>'));
    

                
                $body.append($('<div />', {
                            id: $articleid,
                            'data-role': 'page'
                        }).append($('<div />', {
                            'data-role': 'header',
                            'data-position': 'fixed',
                            id: $articleid + 'header',
                            'data-theme': 'c'
                        }).html('<a href="#left-panel" id="menuNav" class="ui-nodisc-icon" data-role="none"><img src="images/svg/nav_g.svg"/>Menu</a><h1 id="sectionTitle">Latest News</h1><a href="#home" id="homeNav" class="ui-icon-nodisc" data-role="none">Home</a>')).each(function(){
                        
                            $(this).append($('<div />', {
                                'data-role': 'content',
                                'id': $articleid + 'Content',
                                'class': 'feature'
                            }).html('<h2 class="article-headline">' + $headline + '</h2><img src="'+ $image +'"/><span class="article-date">' + $articledate + '</span><p>'+ $text +'</p>')).append($('<div />', {
                                    'data-role': 'panel',
                                    'class': 'ui-icon-alt',
                                    id: 'left-panel'
                                    }).each(function(){
                                
                                            $(this).append($('<div />', {
                                                                        'data-role': 'content' 
                                                                        }).append($('<ul />', {
                                                                        'data-role': 'listview',
                                                                        'data-icon': 'false',
                                                                        'class': 'ui-nodisc-icon ui-alt-icon',
                                                                        'id': 'listLeft'
                                                                        })))
                                            }))
                                        }));
                
                
                
        
        });
        
//////////////////Create left panel list from gloabl page array, in individual pages//////////////////
/*console.log($testArray);*/
        
$(app.pagelist).each(function(i){
           
            $('[data-role="panel"] ul:not(#homeList)').append(
                        $('<li />', {
                            'data-theme': 'c'
                        }).html('<a href="#' + app.pageidlist[i] +'"><span class="icon-' + app.pageidlist[i] + '">&nbsp;' + this + '</span></a><span class="arrow-right"></span>'));
               
    });
        
//////////////////Apply class "app" to news section for responsive css/////////////////////
    
    var newspage = $('#news');
    newspage.attr('class', 'app');
        
    });
   
}

/*},4000);*/

///////////////////Initiate if no connection///////////

function initiateBackList(){
    
//////////////////Create left panel list from gloabl page array, in individual pages//////////////////
/*console.log($testArray);*/
        
$(app.pagelist).each(function(i){
           
            $('[data-role="panel"] ul:not(#homeList)').append(
                        $('<li />', {
                            'data-theme': 'c'
                        }).html('<a href="#' + app.pageidlist[i] +'"><span class="icon-' + app.pageidlist[i] + '">&nbsp;' + this + '</span></a><span class="arrow-right"></span>'));
               
    });
    
////////////////////Add static text content to static pages/////////////////////
    
    $(app.staticlist).each(function(i){
        var pagename = app.staticlist[i],
            pagetext = app.pagetextcontent[i];
           
           $('#' + pagename + 'Content').html('<img class="static-image" src="images/content/' + pagename + '.png"/><p>' + pagetext + '</p>');
               
    });


}


////////////////////End of Initiate////////////////////


//////////////////////Initiate Maps///////////////////
    
        $( document ).on( "pageshow", "#maps", function() {
       
    var defaultLatLng = new google.maps.LatLng(53.3954533, -6.355980);  // Default to PFAI offices, Dublin when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $('#mapsContent').gmap('addMarker', defaultLatLng);
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 10000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapsContent"), myOptions);
        // Add an overlay to the map of current lat/lng
        // Add custom image to map
        var pfaiOffices = 'images/loc.svg';
        /*var mark = 'images/mark.svg';*/
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            /*icon: mark,*/
            title: "You are here!"
        });
        var marker2 = new google.maps.Marker({
            position: defaultLatLng,
            map: map,
            icon: pfaiOffices,
            title: "PFA Ireland Offices"
        });
        
        google.maps.event.addListener(marker, 'click', function() {
            alert('You are here');
        });
        
        google.maps.event.addListener(marker2, 'click', function() {
            alert('PFA Ireland Offices');
        });
    }
});
    
//////////////////////End Maps//////////////////////////

//////////////////Add interactive behaviour to menu & home button///////////////////////
    
/*setTimeout(function(){
    
    var $menu = $('#menuNav');
    
    $menu.on('touchstart', function(){
        $(this).addClass('menuFade');
        
    }).on('touchend', function(){
        $(this).removeClass('menuFade');
        $(this).fadeOut(200);
        setTimeout(function(){
            $menu.fadeIn(300);
        }, 300);
    });
    
    var $home = $('#homeNav');
    
    $home.on('touchstart', function(){
        $(this).addClass('menuFade');
        
    }).on('touchend', function(){
        $(this).removeClass('menuFade');
        $(this).fadeOut(200);
        setTimeout(function(){
            $home.fadeIn(300);
        }, 300);
    });
    
}, 5000);*/






	







