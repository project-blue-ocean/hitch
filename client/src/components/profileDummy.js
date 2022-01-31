const reviews = [
  {
    "reviewId": 5,
    "reviewerId": 86,
    "reviewerName": "Luke Skywalker",
    "riderRating": 4.5,
    "text": "Chris was great company on the long drive.",
    "date": "2019-04-14T00:00:00.000Z",
  },
  {
    "reviewId": 6,
    "reviewerId": 87,
    "reviewerName": "Arthur Dent",
    "riderRating": 4,
    "text": null,
    "date": "2019-04-15T00:00:00.000Z",
  },
  {
    "reviewId": 7,
    "reviewerId": 85,
    "reviewerName": "Rick Astley",
    "riderRating": 4.5,
    "text": "A great person to have on any drive",
    "date": "2019-04-17T00:00:00.000Z",
  },
]

const profile = {
  userId: 84,
  name: "Jack Kerouac",
  image: {
  url: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Kerouac_by_Palumbo_2_%28cropped%29.png'
  },
  age:47,
  bio: 'Novelist and poet who enjoys life on the road.',
  riderRating: 4.5,
  driverRating: 1.2,
  }

  module.exports = {
    reviews: reviews,
    profile: profile
  }