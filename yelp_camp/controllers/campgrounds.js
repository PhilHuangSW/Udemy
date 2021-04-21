const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}

module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await (await Campground.findById(id).populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  }).populate('author'));
  if (!campground) {
    req.flash('error', "No campground found!");
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  // console.log(title)
  // console.log(location)
  const campground = await Campground.findByIdAndUpdate(id, req.body.campground, { new: true });
  req.flash('success', 'Successfully updated campground!');
  res.redirect(`/campgrounds/${campground.id}`);
  // campground.title = title;
  // campground.location = location;
  // await campground.save()
}

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id)
  req.flash('success', 'Successfully deleted the campground!');
  res.redirect('/campgrounds');
}