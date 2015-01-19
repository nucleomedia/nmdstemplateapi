nucleomediaApi.controller('twitterCtrl', ['$scope', 'nucleomediaRequest', function ($scope, nucleomediaRequest) {
    var rootScope = $scope.$root;

    rootScope.carregarTwitter = function () {
        var url = "http://www.nucleomedia.com.br/uploader/GetTweets.ashx?screen_name=	" + codigo + "&cachebuster=" + RandomNumber();
        if (twitterConfig.isDeveloper) {
            url = "http://desenv.nucleomedia.com.br/uploader/GetTweets.ashx?screen_name=broadneeds&cachebuster=" + RandomNumber();
        }
        nucleomediaRequest.get(url,carregarTwitterComplete);
    };
    rootScope.carregarTwitter();

    function carregarTwitterComplete(result) {
		debugger
        var itens = result.tweets.status;
        
        NormalizaJson(itens);
       
        rootScope.tweets = itens;

        console.log(rootScope.tweets)
    }
  
}]);
