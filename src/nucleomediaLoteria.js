nucleomediaApi.controller('loteriaCtrl', ['$scope', 'nucleomediaRequest', function ($scope, nucleomediaRequest) {
    var rootScope = $scope.$root;
    rootScope.loterias = [];
    rootScope.carregarLoteria = function () {
        url = "http://localhost:8080/getLoteria?cachebuster=" + RandomNumber();
        if (loteriaConfig.isDeveloper) {
            url = "content/loteria_offline.xml?cachebuster=" + RandomNumber();
        }
        nucleomediaRequest.get(url, function(result){
            NormalizaJson(result.loterias);

            rootScope.loterias = result.loterias;
            
            console.log(rootScope.loterias)
        });
    };
    rootScope.carregarLoteria();

}]);
