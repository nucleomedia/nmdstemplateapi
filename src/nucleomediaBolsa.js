nucleomediaApi.controller('bolsaCtrl', ['$scope', 'nucleomediaRequest', function ($scope, nucleomediaRequest) {
    var rootScope = $scope.$root;
    rootScope.bolsas = [];
    rootScope.carregarBolsa = function (idBolsa) {
        url = "http://localhost:8080/getBolsa?" + idBolsa + "&cachebuster=" + RandomNumber();
        if (bolsaConfig.isDeveloper) {
            url = "content/bolsa_" + idBolsa + "_offline.xml?cachebuster=" + RandomNumber();
        }
        nucleomediaRequest.get(url, carregarComplete);
    };
    rootScope.carregarBolsa(1);
    rootScope.carregarBolsa(2);
    rootScope.carregarBolsa(3);
    rootScope.carregarBolsa(5);
    rootScope.carregarBolsa(6);

    function carregarComplete(result) {
        var bolsa = result.bolsas.bolsa;
        NormalizaJson(bolsa);

        bolsa = TrataCampos(bolsa);

        rootScope.bolsas.push(bolsa);


        console.log(rootScope.bolsas)
    }

    function TrataCampos(bolsa) {
        bolsa.variacaoPositiva = bolsa.tipoVariacao != 0;
        bolsa.valor = bolsa.valorIndice + " pts";
        bolsa.variacao = bolsa.variacao.replace("(", "").replace(")", "");
        
        return bolsa;
    }

}]);
