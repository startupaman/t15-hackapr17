import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js';
import template from './caseTwo.html';
import {
    Meteor
} from 'meteor/meteor';

class CaseTwo {
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
    }
}

const name = 'caseTwo';

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
    controller: CaseTwo
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.caseTwo', {
        url: '/analytics/caseTwo',
        views: {
            'menuContent': {
                template: '<case-two></case-two>'
            }
        }
    });
}
