(function () {
  'use strict';

  angular.module('sample.detail')
    .controller('DetailCtrl', ['$scope', 'MLRest', '$routeParams', '$window', function ($scope, mlRest, $routeParams, win) {
      var uri = $routeParams.uri;
      var model = {
        // your model stuff here
        detail: {}
      };

      mlRest.getDocument(uri, { format: 'json' }).then(function(response) {
        model.detail = response.data;
	win.console.log(model.detail)
      });

      angular.extend($scope, {
        model: model

      });
    }]);
}());
