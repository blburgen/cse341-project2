module.exports = (mongoose) => {
  const Artist = mongoose.model(
    'artists',
    mongoose.Schema(
      {
        artist_id: Number,
        first_name: String,
        middle_name: String,
        last_name: String,
        birth_location: String,
        death_location: String,
        birth_year: Number,
        death_year: Number,
      },
    )
  );

  return Artist;
};
