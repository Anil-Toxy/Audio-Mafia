var app = angular.module('Et',['ngRoute']);
// Initializing RootScope For loader
app.run(function($rootScope) {
    $rootScope.Loader = true;
    $rootScope.Erorr = false;
});
// API KEY = 6ad3d5ac3e6ad0825c74890e74f8297e
//  token _Qp9BuNchNbJsWiany0H7FDLzsJIhgQb

app.config( function($routeProvider){
	$routeProvider.when('/',{
					templateUrl:'Components/home.html',
					controller:'audioMafia'

				}).when('/Artists',{
					templateUrl:'Components/ArtistSearch.html',
					controller:'audioMafia'

				}).when('/ArtistInfo',{
					templateUrl:'Components/Artist.html',
					controller:'audioMafia'
				}).when('/Tracks',{
					templateUrl:'Components/Track.html',
					controller:'audioMafia'

				}).when('/Albums',{
					templateUrl:'Components/Album.html',
					controller:'audioMafia'
				}).when('/Contact',{
					templateUrl:'Components/Contact.html',
					controller:'audioMafia'
				});
});








// HOMEPAGE
app.controller('audioMafia',function($scope,$http,$rootScope,$location,$window){

			$scope.animate=false;
	// HOMEPAGE 
			$scope.loader = false;
			// TOP TRACKS
			$http({
				method:'get',
				url :'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=12&api_key=6ad3d5ac3e6ad0825c74890e74f8297e&format=json'		
			}).then(function(res){
				$scope.TopTrack = res.data.tracks.track;
				$scope.animate=true;
				$rootScope.Loader=false;
			},function(res){
				$scope.loader = true;
				$rootScope.Erorr = true;
				
			});
			// TOP ARTIST
			$http({
				method:'get',
				url :'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=12&api_key=6ad3d5ac3e6ad0825c74890e74f8297e&format=json'		
			}).then(function(res){
				$scope.TopArtist = res.data.artists.artist;
				$rootScope.Loader=false;
			},function(res){
				$rootScope.Erorr = true;

			});
			// TREND TRACKS
			$http({
				method:'get',
				url :'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=10&api_key=6ad3d5ac3e6ad0825c74890e74f8297e&format=json'		
			}).then(function(res){
				$scope.trend = res.data.tracks.track;
				$rootScope.Loader=false;
				$scope.animate=true;
			},function(res){
				$scope.loader = true;
				$rootScope.Erorr = true;
			});
			// Modal POp Up
			$scope.ShowDetailsTrack = function(name){
				$scope.Modalpop = $scope.TopTrack[name];
				
			}
			$scope.ShowDetailsArtist = function(name){
				$scope.Modalpop = $scope.TopArtist[name];
				
			}
	// ARTIST
			$scope.details=true;
			
			$scope.searchArtist = function (artistSearchQuery){
						$rootScope.Loader=true;
					$http({
						method:'get',
						url:'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+artistSearchQuery+'&api_key=6ad3d5ac3e6ad0825c74890e74f8297e&format=json'
					}).then(function(res){
						$scope.ArtistMatch=res.data.results.artistmatches.artist;
						console.log($scope.ArtistMatch);
						$scope.animate=true;
						$rootScope.Loader=false;

					},function(res){
						$rootScope.Erorr = true;
					});
			}
			// ON CLICK CALL ARTIST FUNCTION & LOACTION CHANGE
			// $scope.ArtistModalCall = function(artistSearchQuery){
			// 	// $window.location.href = '#!/ArtistInfo';
			// 	$scope.artistDeatil(artistSearchQuery);
			// 	$location.path('/Artists');
			// }

			$scope.artistDeatil = function(name){
					$rootScope.Loader=true;
					$http({
						method:'get',
						url:' http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+name+'&api_key=6ad3d5ac3e6ad0825c74890e74f8297e&format=json'
					}).then(function(res){

						$scope.ArtistDetails=res.data.artist;
						$scope.Artisttags=res.data.artist.tags.tag;
						$rootScope.Loader=false;
						$scope.details=false;
						console.log($scope.ArtistDetails);
					},function(res){
						$rootScope.Erorr = true;
					});	
					$http({
						method:'get',
						url:' http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist='+name+'&limit=8&api_key=6ad3d5ac3e6ad0825c74890e74f8297e&format=json'
					}).then(function(res){
						$scope.ArtistAlbums=res.data.topalbums.album;
						$rootScope.Loader=false;
						$scope.animate=true;
					},function(res){
						$rootScope.Erorr = true;
					});	
					
			}
			
		
	// TRACK

			$scope.pageNo = 1;
				$scope.track =false;
				

				$scope.increment = function(){
					$rootScope.Loader=true;
					$scope.pageNo++;
					$scope.TrackSearch($scope.TrackSearchQuery);
					console.log($scope.pageNo);
				}
				$scope.decrement = function(){
					$rootScope.Loader=true;
					$scope.pageNo-1;
					$scope.TrackSearch($scope.TrackSearchQuery);
					console.log($scope.pageNo);
				}
				$scope.TrackSearch = function(name){
					var pageNo =$scope.pageNo;
					$scope.track =true;
						$http({
							method:'get',
							url:'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+name+'&page='+pageNo+'&limit=10&api_key=6ad3d5ac3e6ad0825c74890e74f8297e&format=json'
						}).then(function(res){
							$scope.TrackSearched = res.data.results.trackmatches.track;
							$scope.animate=true;
							console.log(res.data.results);
							$rootScope.Loader=false;
						},function(res){
							$rootScope.Erorr = true;
						});
				}	
		//ALBUM

		 		
				$scope.AlbumSearch=function(name){
					$rootScope.Loader=true;
						$http({
							method:'get',
							url:'http://ws.audioscrobbler.com/2.0/?method=album.search&album='+name+'&api_key=6ad3d5ac3e6ad0825c74890e74f8297e&format=json'
						}).then(function(res){
							$scope.AlbumMatched=res.data.results.albummatches.album;
							console.log($scope.AlbumMatched);
							$scope.animate=true;
							$rootScope.Loader=false;
						},function(res){
							$rootScope.Erorr = true;
						});
				}


		// CONTACT
				$scope.user={};
					
					$scope.condition;
					$scope.checkcondition = function (model){
						console.log($scope.condition +"  "+model);
						if(model==="" || model== null ){
		    			$scope.condition = true;
		    			console.log($scope.condition);
		    		} else{
		    			$scope.condition = false;
		    			console.log($scope.condition);
		    		}

				}
				$scope.submitForm = function(){
					var param = $scope.user;
					$http({
						method:'post',
						url:'wwww.post.com/',
						data: $scope.user
					}).then(function(res){
						console.log(sucess);
					},function(res){

					});
				}

});

