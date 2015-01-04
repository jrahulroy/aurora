var aurora = angular.module("aurora", [function(){}]);

aurora.controller("appController", ["$scope", "$http", function($scope, $http){
    
    $scope.weatherDetails = [];
    
    //Getting list of all the Countries
    $http.get('https://gist.githubusercontent.com/mayurah/5f4a6b18b1aa8c26910f/raw/countriesToCities.json')
     .success(function(response) {
        $scope.countryListData = response;
        
        for(var country in $scope.countryListData){
            for(var city in $scope.countryListData[country]){
                $scope.cityList.push($scope.countryListData[country][city] + " - "+ country);
            }
        }
    });
    
    $scope.$watch("cityName", function(newValue, oldValue) {
        
    });
    
    $scope.addCity = function(){
        var selectedCity = $scope.cityName;
        
        $scope.populateWeatherDetails(selectedCity);
    };
    $scope.populateWeatherDetails = function(selectedCity){
        
        if($scope.selectedCities.indexOf(selectedCity) > -1){
            alert("City is already loaded");
        } else {
            $scope.selectedCities.push(selectedCity);
            
            var successResponse = function(response) {
                if( response.query.results.weather.rss.channel.title === "Yahoo! Weather - Error"){
                    alert("City not found");
                } else {
                    //Found City
                    $scope.weatherDetails.push(response.query.results.weather.rss.channel);
                }
            };
            
            var selectedCityName = selectedCity.split(" - ")[0];
            var selectedCountryName = selectedCity.split(" - ")[1];
            
            var requestUrl = "https://query.yahooapis.com/v1/public/yql?q=use%20'http%3A%2F%2Fgithub.com%2Fyql%2Fyql-tables%2Fraw%2Fmaster%2Fweather%2Fweather.bylocation.xml'" + 
            "%20as%20we%3Bselect%20*%20from%20we%20where%20location%3D%22" + encodeURIComponent(selectedCityName) + "%22%20and%20unit%3D'c'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
            
            $http.get(requestUrl)
             .success(successResponse);
             
             $scope.cityName = "";
        }
        
        
    };
    
    $scope.getConditionClass = function(conditionCode){
        
        //Codes are available at the following article https://gist.github.com/bzerangue/805520
        var code = parseInt(conditionCode, 10);
        
        switch(code){
            case 0: return "wi-tornado";
            case 1: return "wi-day-sunny";
            case 2: return "wi-hurricane";
            case 3: return "wi-thunderstorm";
            case 4: return "wi-thunderstorm";
            case 5: return "wi-day-rain-mix";
            case 6: return "wi-rain-wind";
            case 7: return "wi-snow-wind";
            case 8: return "wi-sprinkle";
            case 9: return "wi-sprinkle";
            case 10: return "wi-storm-showers";
            case 11: return "wi-showers";
            case 12: return "wi-showers";
            case 13: return "wi-showers";
            case 14: return "wi-showers";
            case 15:
            case 16:
            case 17:
            case 18: 
            case 19: 
            case 20: return "wi-snow";
            case 21: return "wi-day-haze";
            case 22:
            case 23:
            case 24: return "wi-cloudy-windy";
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30: return "wi-cloudy-windy"
            case 31:
            case 32:
            case 33:
            case 34:
            case 35:
            case 36: return "wi-day-sunny"
            case 37:
            case 38:
            case 39: return "wi-thunderstorm";
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47: return "wi-showers";
                        
            default: return "wi-day-sunny";
        }  
    };
    
    $scope.cityList = [];
    $scope.selectedCities = [];
    
    $scope.populateWeatherDetails("Hyderabad - India");
}]);