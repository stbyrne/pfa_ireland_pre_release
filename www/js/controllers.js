angular.module('starter.controllers', [])

.factory('appFactory', function($http) {
    
    return $.ajax({
        
        url: "https://googledrive.com/host/0B0778NZ3pAKKcHYxWjBiLTc5UjA/content_v2.json",
        dataType: 'json',
        cache: false,
        timeout: 10000,
        success: function(data) {
            return data;
        }   
    });
})

.factory('newsFactory', function($http) {
    
     /*return{
        getNews : function() {
            return $http({
                url: 'http://pfai.ie/mobile/pfainews',
                method: 'GET'
            })
        }
     }*/
     
     return $.ajax({
        
        url: "http://pfai.ie/mobile/pfainews",
        dataType: 'json',
        cache: true,
        timeout: 5000,
        success: function(data) {
            return data;
        }   
    });
})

.factory('listFactory', function($http) {
    
 /*return{
    getList : function() {
        return $http({
            url: 'http://pfai.ie/mobile/transferliststream',
            method: 'GET'
        })
    }
 }*/
 
 return $.ajax({
        
        url: "http://pfai.ie/mobile/transferliststream",
        dataType: 'json',
        cache: true,
        timeout: 5000,
        success: function(data) {
            return data;
        }   
    });
})

.controller('AppCtrl', ['$scope', '$http', '$timeout', '$ionicLoading', '$ionicPopover', 'appFactory', function($scope, $http, $timeout, $ionicLoading, $ionicPopover, appFactory) {
    
    $ionicLoading.show({
    template: '<p>PFA Ireland is loading</p><i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    console.log('App Controller');
        
        appFactory.then(function(data){
            
                console.log('Loading Remote App Json');
                console.log(data);
                                
                $ionicLoading.hide();

                $scope.section = data.app.section;

                $scope.sections = [];

                angular.forEach($scope.section, function(value, key, i){

                    var key = value['id'];

                    this[key] = value['content'];

                }, $scope.sections);
                    
               
            
            }, function(data){
            
            
                $http.get('content/content.json').then(function(data){
                    
                    alert('Cant quite reach the server at this time. Content will be Limited for the moment.');
                    
                    $ionicLoading.hide();
                    
                    $scope.section = data.data.app.section;

                    $scope.sections = [];

                    angular.forEach($scope.section, function(value, key, i){

                        var key = value['id'];

                        this[key] = value['content'];

                    }, $scope.sections);


                })
           
                
            });
   
   
    
    $scope.setItem = function(item){
        $scope.$parent.item = item;
        console.log(item);
       
    }
    $scope.getItem = function(){
        return $scope.$parent.item;
        console.log($scope.$parent.item);
    }
    
    $scope.openURL = function(urlString){
            console.log(urlString);
            myURL = encodeURI(urlString);
            window.open(myURL, '_system', 'location=yes');
        }
    
    $scope.goHome = function(){
        
        $timeout(function(){
            /*sideMenuCtrl.close();*/
            console.log('Home');
          /*$ionicSlideBoxDelegate.next();*/
      }, 500)
    }
    
          var template = '<ion-popover-view><ion-content><div class="list"><h4>Room 214 Players Union Offices</h4><p>National Sports Campus</p><p>Abbotstown</p><p>Dublin 15</p><p>Ireland</p></div></ion-content></ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope,
  });

  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
   
    
}])

.controller('NewsCtrl', ['$scope', 'newsFactory', '$ionicLoading', '$ionicSlideBoxDelegate', '$timeout', function($scope, newsFactory, $ionicLoading , $ionicSlideBoxDelegate, $timeout) {
   
    $scope.news = [];
    $scope.article = [];
    
    $scope.setIndex = function(num){
        $scope.$parent.myNewsArticle=num;
    }
    
    /*$scope.clearSearch = function(){
        $scope.$parent.searchNews = '';   
    }*/

    $ionicLoading.show({
    template: '<p>Just getting the latest news</p><i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    newsFactory.then(function(data){
        
        console.log(data);
        
        $scope.news = data;
        $scope.articles = [];
        $scope.articleList = [];
        
        angular.forEach($scope.news, function(value, key, i){
            
            var $getBody = value["body"],
                $articleBody = $getBody,
                $timestamp = new Date(value["date"]*1000),
                $articleDate = $timestamp.toDateString(),
                $articleImage = $(value["field_image"]).attr('src'),
                $articleTitle = value["node_title"],
                $articleIntro = $($getBody).html().substr(0,80) + '...' + ' read more',
                $articleThumb = $(value["thumbnail"]).attr('src');
            
            console.log($articleIntro);
            
            $.each($($articleBody).find('img'), function(){
                if($(this).attr('src').slice(0,18)!='http://www.pfai.ie'){
                       $articleBody = $articleBody.replace($(this).attr('src'), 'http://www.pfai.ie' + $(this).attr('src'));
                 
                }
                
            });
            
            this.push({thumb:$articleThumb, title:$articleTitle, intro:$articleIntro, image:$articleImage, date:$articleDate, text:$articleBody});
            
        }, $scope.articles)
        
        var newsObj = $scope.articles;
        
        localStorage.setItem('newsStorage', JSON.stringify(newsObj));
        
        $ionicLoading.hide();
        
        $timeout(function(){
          $ionicSlideBoxDelegate.update();
        }, 500)
        }, function(){
            
            
                    alert('Oops cant get the latest news at the moment. You can still view saved news stories.');
                    $scope.articles = JSON.parse(localStorage.getItem('newsStorage'));
                    $ionicLoading.hide();
           
                
                });
        $scope.doRefresh = function(){
            window.location.reload(true);   
        }
    
}])

.controller('ListCtrl', ['$scope', 'listFactory', '$ionicLoading', function($scope, listFactory, $ionicLoading) {
   
    $scope.list = [];
    
    
    $ionicLoading.show({
    template: '<i class="icon ion-loading-c"></i>',
    showBackdrop: true
    });
    
    
    listFactory.then(function(data){
        
        $scope.list = data;
        $scope.players = [];
        
        angular.forEach($scope.list, function(value, key, i){
            
            var $getFirst = value["First Name"],
                $firstName = $getFirst.replace("&#039;", "'"),
                $getLast = value["Last Name"],
                $lastName = $getLast.replace("&#039;", "'"),
                $getClubs = value["Previous Clubs"],
                $preClubs = $getClubs.replace("&#039;", "'"),
                $dobTag = value["Date of Birth"],
                $dobString = $($dobTag).attr('content').substr(0,10),
                $dob = new Date($dobString),
                $dobDate = $dobString.substr(8,$dobString.length),
                $dobMonth = $dobString.substr(5,2),
                $dobYear = $dobString.substr(0,4),
                $dobPlayer = $dobDate + '/' + $dobMonth + '/' + $dobYear;
                
            this.push([$firstName + ' ' + $lastName, $preClubs, value["Position"], $dobPlayer]);
            
            /*console.log($scope.players);*/
           
        }, $scope.players)
        
        $ionicLoading.hide();
    }, function(){
        
            alert('Oops cant get the latest transfer list at the moment.');
            $ionicLoading.hide();
           
    });
    
    
}])

.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;
      
    var pfailoc = new google.maps.LatLng(53.395415, -6.356049);
      
    var pfaiOffices = 'img/loc.svg';
        
    new google.maps.Marker({
            position: pfailoc,
            map: $scope.map,
            icon: pfaiOffices,
            title: "PFA Ireland Offices"
    });
      
    $scope.map.setZoom(10);
      
    $scope.map.setCenter(pfailoc);
  };
    
    var defaultLatLng = new google.maps.LatLng(53.395415, -6.356049); 

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $ionicLoading.show({
        template: '<p>Lets find your current location</p><i class="icon ion-loading-c"></i>',
        showBackdrop: true
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
        
        console.log('Got pos', pos);
        var loc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        $scope.map.setCenter(loc);
        var infowindow = new google.maps.InfoWindow({
            content: "<span>Here you are</span>"
        });
        var location = new google.maps.Marker({
            position: loc,
            map: $scope.map
        });
        
        /*google.maps.event.addListener(location, 'click', function() {
            infowindow.open($scope.map,location);
        });*/
        $ionicLoading.hide();
        
    }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
  };
    
    function setCenter(latlng) {
        var myOptions = {
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var pfaiOffices = 'images/loc.svg';
        var marker;
        marker.setMap(null);
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "You are here!"
        });
        var marker2;
        marker2.setMap(null);
        marker2 = new google.maps.Marker({
            position: defaultLatLng,
            map: map,
            icon: pfaiOffices,
            title: "PFA Ireland Offices"
        });
        
    }
    
    /////////////////
});