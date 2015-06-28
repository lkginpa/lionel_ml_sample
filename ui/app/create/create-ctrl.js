(function () {
  'use strict';

  angular.module('sample.create')
    .controller('CreateCtrl', ['$scope', 'MLRest', '$window', 'User', function ($scope, mlRest, win, user) {
      var model = {
	  study: {
	      studyName: '',
	      protocol: '',
	      clinics: [],
	      paymentSchedules: []
	  },
	  newClinic: {
	      clinicName: '',
	      clinicNumber: 0,
	      addr1: '',
	      addr2: '',
	      city: '',
	      state: '',
	      postalCode: '',
	      investigatorFirstName: '',
	      investigatorLastName: '',
	      investigatorNPI: ''
	  },
        user: user
      };

      var nextClinicNumber = 1;

      angular.extend($scope, {
        model: model,
        editorOptions: {
          height: '100px',
          toolbarGroups: [
            { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
            { name: 'links' }
          ],
          //override default options
          toolbar: '',
          /* jshint camelcase: false */
          toolbar_full: ''
        },
        submit: function() {
          mlRest.createDocument($scope.model.study, {
            format: 'json',
            directory: '/content/',
            extension: '.json'
            // TODO: add read/update permissions here like this:
            // 'perm:sample-role': 'read',
            // 'perm:sample-role': 'update'
          }).then(function(response) {
            win.location.href = '/detail?uri=' + response.headers('location').replace(/(.*\?uri=)/, '');
          });
        },
        addClinic: function() {
	  model.newClinic.clinicNumber = nextClinicNumber++;
          model.study.clinics.push(model.newClinic);
          model.newClinic = '';
        },
	removeClinic: function(removeClinic) {
	    model.study.clinics = model.study.clinics.filter(function(clinic) {
		return clinic.clinicNumber !== removeClinic.clinicNumber;
	    });
	}

      });
    }]);
}());
