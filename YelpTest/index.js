const axios = require("axios")

let API_KEY = "UaGzSGpNKRsaCQzEupPlmVfpwtv1EjBX07QlKVzy3Qv_7nmlf0NVWLlz2UXkPipR7ml3oilCwTwHNwMdF5WRXnYeF_DlLl2bBa6UVwfWsLyoKKmuGt2r7Edus6dBYHYx"

// REST
let yelpREST = axios.create({
  baseURL: "https://api.yelp.com/v3/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
})

yelpREST("/businesses/search", {
    params: {
      location: "Houston,",
      categories: "restaurants",
      open_now: true,
    },
  }).then(({ data }) => {
    let { businesses } = data
    businesses.forEach((b) => {
      console.log("Name: ", b.name)
    })
  })