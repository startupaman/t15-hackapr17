import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './home.html';
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import chartjs from 'angular-chart.js'
import {
    Meteor
} from 'meteor/meteor';
import {
    name as Login
} from '../login/login';

class Home {
    constructor($scope, $reactive, $timeout, $state, $rootScope) {
        'ngInject';
        $reactive(this).attach($scope);

        document.title = "Home | Hackathon";

        $rootScope.currentState = $state.current.name;
        this.scope = $scope;
        this.state = $state;

        this.helpers({

        });
    }

    uploadData(complaintCSVPath, guidanceCSVPath) {
        $state = this.state;

        Meteor.call("loadCSVData", complaintCSVPath.trim(), guidanceCSVPath.trim(), function(error, response) {
            if (error) {

            } else {
                console.log(response);
                console.log("Data Processing Completed");

                $state.go('march.analytics');
            }
        });
    }
}

const name = 'home';

// Module Creation (Aman Gupta)
export default angular.module(name, [
    angularMeteor,
    ngMaterial,
    ngSanitize,
    uiRouter,
    chartjs
]).component(name, {
    template,
    controllerAs: name,
    controller: Home
}).config(config);

// Module Configuration (Aman Gupta)
function config($stateProvider) {
    'ngInject';
    $stateProvider.state('march.home', {
        url: '/home',
        views: {
            'menuContent': {
                template: '<home></home>'
            }
        }
    });
}
