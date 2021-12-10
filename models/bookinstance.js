const { DateTime } = require('luxon');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
    {
        book: {type: Schema.Types.ObjectId, ref: 'Book', required: true}, // reference to the associated book
        imprint: {type: String, required: true},
        status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
        due_back: {type: Date, default: Date.now},
    }
);

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
    return '/catalog/bookinstance/' + this._id;
});

// Virtual for a simple Month Day, Year read format
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

// Virtual for book instance's due date for input forms
BookInstanceSchema.virtual('due_back_YMD').get(function () {
    return DateTime.fromJSDate(this.due_back).toISODate();
});

// Export module
module.exports = mongoose.model('BookInstance', BookInstanceSchema);