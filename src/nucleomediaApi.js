var nucleomediaApi = angular.module('nucleomediaApi', []);

var codigo = "";
function RecuperaCodigo() {
    var url = document.location.toString().toLowerCase();

    var segmentos = url.split('/');
    for (var i = 0; i < segmentos.length; i++) {
        if (segmentos[i].indexOf("codeitem") > -1) {
            codigo = segmentos[i].substr(segmentos[i].indexOf("codeitem") + 8);
        }
    }
}
RecuperaCodigo();

function NormalizaJson(obj) {

    for (var prop in obj) {
        if (obj[prop] instanceof Object) {
            if (obj[prop].__cdata || obj[prop].__cdata == "") {
                obj[prop] = obj[prop].toString();
            } else {
                NormalizaJson(obj[prop]);
            }
        }
    }
}

function CarregaAleatoriamente(array) {
    var itemRnd = randomIndex = Math.floor(Math.random() * array.length);

    var retorno = array[itemRnd];

    defineTipoDoItem(retorno);

    return retorno;
}

function CarregaSequencialmente(array, prefixo) {
    var posicaoItem = window.localStorage.getItem(prefixo + codigo);
    if (!posicaoItem) posicaoItem = 0;
    if (posicaoItem >= array.length) posicaoItem = 0;

    var retorno = array[posicaoItem];

    posicaoItem++;
    window.localStorage.setItem(prefixo + codigo, posicaoItem);

    defineTipoDoItem(retorno);

    console.log(retorno);

    return retorno;
}

function defineTipoDoItem(item) {
    item.tipo = "texto";
    if (item.chaVideo) {
        item.tipo = item.chaVideo.indexOf('.mp4') >= 0 ? "video" : "imagem"
    } else {
        if (item.chaImagens) {
            item.tipo = "imagem";
        }
    }
}

function relativeLinkToAbsolute(obj) {
    var url = ""
    console.log(obj);
    if (window.location.toString().indexOf('http://') <= -1) {
        url = window.location.toString();
        var textoCorte = "/arquivos/";
        var sizeCorte = textoCorte.length;
        var corte = url.indexOf(textoCorte);
        url = url.substring(0, corte);
        console.log(url);
    }

    if (obj && obj.toString() != '') {
        var retorno = url + obj;
        console.log(retorno);
        return retorno;
    }
}

function RandomNumber() {
    return Math.floor(Math.random() * 99999);
}

nucleomediaApi.factory('nucleomediaRequest', ['$http', function ($http) {
    return {
        get: function (url, callback) {
            $http.get(
                url,
                {
                    transformResponse: function (data) {
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json(data);
                        return json;
                    }
                }
            ).
                then(function (result, status) {
                    callback(result.data);
                })
        }
    }
}]);



angular.module('nucleomediaApi')
    .filter('trustUrl', ['$sce', function ($sce) {
        return function (url) {
            console.log(url)
            return $sce.trustAsResourceUrl(url);
        };
    }]);
