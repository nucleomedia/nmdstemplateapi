nucleomediaApi
    .filter('smartLimit', smartLimit)
    .controller('feedCtrl', ['$scope', 'nucleomediaRequest', function ($scope, nucleomediaRequest) {
        var rootScope = $scope.$root;
        var isAleatorio = false;

        rootScope.carregarFeed = function () {
            var url = "http://localhost:8080/getNoticias?0&" + codigo + "&cachebuster=" + RandomNumber();
            if (feedConfig.isDeveloper) {
                url = "content/feedoffline.xml?&cachebuster=" + RandomNumber();
            }
            nucleomediaRequest.get(url, carregarFeedComplete);
        };
        rootScope.carregarFeed();

        function carregarFeedComplete(result) {

            var itens = [];

            if (result.lista.item instanceof Array) {
                itens = result.lista.item;
            } else {
                itens.push(result.lista.item)
            }
            rootScope.feeds = [];
            var item;

            for (var i = itens.length - 1; i >= 0; i--) {
                var itemParaTratar = itens[i];

                NormalizaJson(itemParaTratar);

                itemParaTratar = trasformaLinkRelativoEmAbsoluto(itemParaTratar);

                rootScope.feeds.push(itemParaTratar);
            };

            if (rootScope.feeds instanceof Array) {
                if (feedConfig.isAleatorio) {
                    item = CarregaAleatoriamente(rootScope.feeds);
                } else {
                    item = CarregaSequencialmente(rootScope.feeds, "feed");
                }
            } else {
                item = rootScope.feeds;
            }

            rootScope.feed = item;

            console.log("Feed:" + rootScope.feed)
            console.log("Feeds: " + rootScope.feeds)
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


function smartLimit() {
    return function (value, maxCharacters) {

        if (!angular.isString(value))
            return;
        if (value.length <= maxCharacters)
            return value;

        var full = value.split(' ');
        var finalText = full[0];
        for (var i = 1; i < full.length; i++) {
            var tmp = finalText.concat(' ', full[i]);
            if (tmp.length > maxCharacters)
                break;
            finalText = tmp;
        }
        return finalText;


    };
}
