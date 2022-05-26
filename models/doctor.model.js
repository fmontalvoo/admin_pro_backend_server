const { Schema, model } = require('mongoose');

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    user: {
        ref: 'User',
        required: true,
        type: Schema.Types.ObjectId, // Foreignkey del usuario administrador. 
    },
    hospital: {
        required: true,
        ref: 'Hospital',
        type: Schema.Types.ObjectId,// Foreignkey del hostipal. 
    },
});

DoctorSchema.method('toJSON', function () {
    const { __v, _id, ...doctor } = this.toObject();
    doctor.id = _id;
    return doctor;
});

const DoctorModel = model('Doctor', DoctorSchema);

module.exports = DoctorModel;