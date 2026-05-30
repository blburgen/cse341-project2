module.exports = (mongoose) => {
  const Artist = mongoose.model(
    'artists',
    mongoose.Schema(
      {
        artist_id: Number,
        name: String,
        location: String,
        year: Number,
      },
    )
  );

  return Artist;
};
