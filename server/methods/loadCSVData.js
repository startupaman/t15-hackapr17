import {
    Meteor
} from 'meteor/meteor';
import csvToJson from 'csvtojson';
import {
    Complaints
} from '../../imports/api/complaints';
import {
    Guidances
} from '../../imports/api/guidances';
import {
    Areas
} from '../../imports/api/areas';
import {
    Localities
} from '../../imports/api/localities';
import {
    Streets
} from '../../imports/api/streets';
import {
    Zones
} from '../../imports/api/zones';
import {
    Wards
} from '../../imports/api/wards';
import {
    Types
} from '../../imports/api/types';

Meteor.methods({
    loadCSVData: function(complaintCSVPath, guidanceCSVPath) {
        console.log("Start CSV Loading...");
        var complaintCSVPath = "/home/monty/Project/egovernance-hackathon/web-app/public/data/test-complaint.csv";
        var guidanceCSVPath = "/home/monty/Project/egovernance-hackathon/web-app/public/data/test-guidance.csv";

        Future = Npm.require('fibers/future');
        var future = new Future();

        const csv = require("csvtojson")

        csv()
            .fromFile(complaintCSVPath)
            .on('json', Meteor.bindEnvironment(function(row, index) {
                console.log("Processing Row Number: " + index);
                Areas.insert({
                    name: row.area
                }, function(error) {

                });

                Zones.insert({
                    name: row.zone
                }, function(error) {

                });

                Localities.insert({
                    name: row.locality
                }, function(error) {

                });

                Streets.insert({
                    name: row.street
                }, function(error) {

                });

                Wards.insert({
                    name: row.ward
                }, function(error) {

                });

                Types.insert({
                    name: row.type
                }, function(error) {

                });

            }))
            .on('done', Meteor.bindEnvironment(function(error) {

                console.log("Complaint CSV File Read: Area, Locality, Street, Zone, Ward, Type");

                csv()
                    .fromFile(complaintCSVPath)
                    .on('json', Meteor.bindEnvironment(function(row, index) {
                        console.log("Processing Row Number: " + index);

                        const area = Areas.findOne({
                            name: row.area
                        });

                        const locality = Localities.findOne({
                            name: row.locality
                        });

                        const street = Streets.findOne({
                            name: row.street
                        });

                        const zone = Zones.findOne({
                            name: row.zone
                        });

                        const ward = Wards.findOne({
                            name: row.ward
                        });

                        const type = Types.findOne({
                            name: row.type
                        });

                        Complaints.insert({
                            number: row.number,
                            typeId: type._id,
                            areaId: area._id,
                            localityId: locality._id,
                            streetId: street._id,
                            zoneId: zone._id,
                            wardId: ward._id,
                            startDate: row.startDate,
                            completionDate: row.completionDate,
                            time: row.time,
                            isRedressed: row.isRedressed
                        })
                    })).on('done', Meteor.bindEnvironment(function(error) {
                        console.log("Complaint CSV File Read: Complaint");
                        future.return(true);
                    }));

                csv()
                    .fromFile(guidanceCSVPath)
                    .on('json', Meteor.bindEnvironment(function(row, index) {
                        console.log("Processing Row Number: " + index);

                        const area = Areas.findOne({
                            name: row.area
                        });

                        const locality = Localities.findOne({
                            name: row.locality
                        });

                        const street = Streets.findOne({
                            name: row.street
                        });

                        const zone = Zones.findOne({
                            name: row.zone
                        });

                        const ward = Wards.findOne({
                            name: row.ward
                        });

                        Guidances.insert({
                            areaId: area == undefined ? "" : area._id,
                            localityId: locality == undefined ? "" : locality._id,
                            streetId: street == undefined ? "" : street._id,
                            zoneId: zone == undefined ? "" : zone._id,
                            wardId: ward == undefined ? "" : ward._id,
                            usage: row.usage,
                            value: row.value
                        })
                    })).on('done', Meteor.bindEnvironment(function(error) {
                        console.log("Guidance CSV File Read: Guidance");
                    }));
            }))

        return future.wait();
    }
});
