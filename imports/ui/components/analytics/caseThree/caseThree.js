import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './caseThree.html';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js';
import {
    Meteor
} from 'meteor/meteor';

class CaseThree {
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

const name = 'caseThree';

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
    controller: CaseThree
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.caseThree', {
        url: '/analytics/caseThree',
        views: {
            'menuContent': {
                template: '<case-three></case-three>'
            }
        }
    });
}
