nucleomediaApi.controller('climaCtrl', ['$scope', 'nucleomediaRequest', function ($scope, nucleomediaRequest) {
	var weekday = new Array(7);
	weekday[0]=  "Domingo";
	weekday[1] = "Segunda";
	weekday[2] = "Terça";
	weekday[3] = "Quarta";
	weekday[4] = "Quinta";
	weekday[5] = "Sexta";
	weekday[6] = "Sábado";    
	
	var rootScope = $scope.$root;

    rootScope.carregarClima = function () {
        url = "http://localhost:8080/getClima?0&cachebuster=" + RandomNumber();
        if (climaConfig.isDeveloper) {
            url = "content/climaoffline.xml?cachebuster=" + RandomNumber();
        }
        nucleomediaRequest.get(url,carregarComplete);
    };
    rootScope.carregarClima();

    function carregarComplete(result) {
        var itens = result.climas.clima;
        if (itens instanceof Array)
        {
            if (climaConfig.isAleatorio) {
                rootScope.clima = CarregaAleatoriamente(itens);
            } else {
                rootScope.clima = CarregaSequencialmente(itens, "clima");
            }
        } else {
            rootScope.clima = itens;
        }

        NormalizaJson(rootScope.clima);

		var today = new Date();
		
		var amanha = new Date(today);
		amanha.setDate(today.getDate()+1);
		
		var terceiroDia = new Date(today);
		terceiroDia.setDate(today.getDate()+2);
		
		var quartoDia = new Date(today);
		quartoDia.setDate(today.getDate()+3);
		
		rootScope.clima.hoje.diaSemanaTitulo = getWeekdayName(today);
		rootScope.clima.amanha.diaSemanaTitulo = getWeekdayName(amanha);
		rootScope.clima.terceirodia.diaSemanaTitulo = getWeekdayName(terceiroDia);
		rootScope.clima.quartodia.diaSemanaTitulo = getWeekdayName(quartoDia);
	
		
        console.log(rootScope.clima)
    }
	
	function getWeekdayName(data) {
		var datatratada = data;
		if (!angular.isDate(data)) {
			datatratada = new Date(data);
		} 
		return weekday[datatratada.getDay()];
	}

	
}]);
