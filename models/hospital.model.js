const { Schema, model } = require('mongoose');

const HostipalSchema = new Schema({
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
        required: true
    },
});

HostipalSchema.method('toJSON', function () {
    const { __v, _id, ...hostipal } = this.toObject();
    hostipal.id = _id;
    return hostipal;
});

const HostipalModel = model('Hospital', HostipalSchema);

module.exports = HostipalModel;