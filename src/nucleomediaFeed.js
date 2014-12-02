nucleomediaApi.controller('feedCtrl', ['$scope', 'nucleomediaRequest', function ($scope, nucleomediaRequest) {
    var rootScope = $scope.$root;
    var isAleatorio = false;

    rootScope.carregarFeed = function () {
        var url = "http://localhost:8080/getNoticias?0&" + codigo + "&cachebuster=" + RandomNumber();
        if (feedConfig.isDeveloper) {
            url = "content/feedoffline.xml?&cachebuster=" + RandomNumber();
        }
        nucleomediaRequest.get(url,carregarFeedComplete);
    };
    rootScope.carregarFeed();

    function carregarFeedComplete(result) {
        var itens = result.lista.item;
        var item;
        if (itens instanceof Array) {
            if (feedConfig.isAleatorio) {
                item = CarregaAleatoriamente(itens);
            } else {
                item = CarregaSequencialmente(itens, "feed");
            }
        } else {
            item = itens;
        }

        NormalizaJson(item);
       
        item = trasformaLinkRelativoEmAbsoluto(item);

        rootScope.feed = item;

        console.log(rootScope.feed)
    }

    function trasformaLinkRelativoEmAbsoluto(item) {
        item.chaFlash = relativeLinkToAbsolute(item.chaFlash);

        item.chaVideo = relativeLinkToAbsolute(item.chaVideo);

        if (item.chaImagens.imagem) {
            if (item.chaImagens.imagem instanceof Array) {
                for (var i = 0; i < item.chaImagens.imagem.length; i++) {
                    item.chaImagens.imagem[i] = relativeLinkToAbsolute(item.chaImagens.imagem[i]);
                }
            } else {
                item.chaImagens.imagem = relativeLinkToAbsolute(item.chaImagens.imagem);
            }
        }
        return item;
    }
  
}]);
