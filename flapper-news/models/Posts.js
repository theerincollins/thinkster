var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  //  we've set our comments field to an array of Comment references. This will
  //  allow us to use Mongoose's build in populate() method
  //  to easily retrieve all comments associated with a
  //  given post.
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

// Next we register that model with with the global mongoose object we imported
// using require() so that it can be used to interact with the database anywhere
// else mongoose is imported.
mongoose.model('Post', PostSchema);
