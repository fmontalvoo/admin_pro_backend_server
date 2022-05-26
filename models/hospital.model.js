const { Schema, model } = require('mongoose');

const HostipalSchema = new Schema({
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
});

HostipalSchema.method('toJSON', function () {
    const { __v, _id, ...hostipal } = this.toObject();
    hostipal.id = _id;
    return hostipal;
});

const HostipalModel = model('Hospital', HostipalSchema);

module.exports = HostipalModel;