import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './caseOne.html';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js';
import {
    Meteor
} from 'meteor/meteor';

class CaseOne {
    constructor($scope, $rootScope, $reactive, $timeout, $q) {
        'ngInject';
        $reactive(this).attach($scope);

        this.timeout = $timeout;
        this.rootScope = $rootScope;
        this.q = $q;
        this.scope = $scope;

        this.helpers({});
    }

    startProcessing() {
        console.log(Session.get("selectedValue"));
        Meteor.call("insertMaster");
    }
}

const name = 'caseOne';

// Module Creation
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    ngSanitize,
    uiRouter,
    chartjs
]).component(name, {
    template,
    controllerAs: name,
    controller: CaseOne
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.caseOne', {
        url: '/analytics/caseOne',
        views: {
            'menuContent': {
                template: '<case-one></case-one>'
            }
        }
    });
}
