nucleomediaApi.controller('moedaCtrl', ['$scope', 'nucleomediaRequest', function ($scope, nucleomediaRequest) {
    var rootScope = $scope.$root;
    rootScope.moedas = [];
    rootScope.carregarMoeda = function (idMoeda) {
        url = "http://localhost:8080/getMoeda?" + idMoeda + "&cachebuster=" + RandomNumber();
        if (moedaConfig.isDeveloper) {
            url = "content/moeda_" + idMoeda + "_offline.xml?cachebuster=" + RandomNumber();
        }
        nucleomediaRequest.get(url, carregarComplete);
    };
    rootScope.carregarMoeda(1);
    rootScope.carregarMoeda(2);

    function carregarComplete(result) {

        NormalizaJson(result.moedas.moeda);

        rootScope.moedas.push(ConverteTipos(result.moedas.moeda));


        console.log(rootScope.moedas)
    }

    function ConverteTipos(moeda) {
        moeda.dataAtualizacao = new Date(moeda.dataAtualizacao);
        moeda.variacao = parseFloat(moeda.variacao.replace(",", ".")).toPrecision(2);
        return moeda;
    }

}]);
