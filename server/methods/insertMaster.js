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
import {
    Masters
} from '../../imports/api/masters'

Meteor.methods({
    insertMaster: function() {
        console.log("start insertMaster");
        Complaints.aggregate([{
            $lookup: {
                from: "guidances",
                localField: "masterColumn",
                foreignField: "masterColumn",
                as: "master_docs"
            }
        }]).forEach(function(object) {
            if (object.master_docs.length == 2) {
                Masters.insert({
                    "_id": object._id,
                    "number": object.number,
                    "typeId": object.typeId,
                    "areaId": object.areaId,
                    "localityId": object.localityId,
                    "streetId": object.streetId,
                    "zoneId": object.zoneId,
                    "wardId": object.wardId,
                    "startDate": object.startDate,
                    "completionDate": object.completionDate,
                    "time": object.time,
                    "isRedressed": object.isRedressed,
                    "masterColumn": object.masterColumn,
                    'residentialValue': object.master_docs[0].value,
                    'nonResidentialValue': object.master_docs[1].value
                })
            }

        })
    }
});
