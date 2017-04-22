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
    combineColumn: function() {
        console.log("start combineColumn");
        Complaints.aggregate(
            [{
                $project: {
                    masterColumn: {
                        $concat: ["$areaId", "-", "$localityId", "-", "$streetId", "-", "$zoneId", "-", "$wardId"]
                    }
                }
            }]
        ).forEach(function(object) {
          Complaints.update({'_id': object._id}, {$set: {
            'masterColumn': object.masterColumn
          }})

          console.log(object.masterColumn);
          console.log("====================");
        })

        Guidances.aggregate(
            [{
                $project: {
                    masterColumn: {
                        $concat: ["$areaId", "-", "$localityId", "-", "$streetId", "-", "$zoneId", "-", "$wardId"]
                    }
                }
            }]
        ).forEach(function(object) {
          Guidances.update({'_id': object._id}, {$set: {
            'masterColumn': object.masterColumn
          }})

          console.log(object.masterColumn);
          console.log("====================");
        })
    }
});
