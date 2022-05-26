const { Schema, model } = require('mongoose');

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    hostipal: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    },
});

DoctorSchema.method('toJSON', function () {
    const { __v, _id, ...doctor } = this.toObject();
    doctor.id = _id;
    return doctor;
});

const DoctorModel = model('Doctor', DoctorSchema);

module.exports = DoctorModel;