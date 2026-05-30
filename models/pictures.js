module.exports = (mongoose) => {
  const Picture = mongoose.model(
    'pictures',
    mongoose.Schema(
      {
        picture_id: Number,
        name: String,
        description: String,
        location: String,
      },
    )
  );

  return Picture;
};
