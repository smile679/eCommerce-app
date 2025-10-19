const paypal = require("paypal-rest-sdk");


paypal.configure({
  mode : "sandbox",
  client_id : "AVMMVVrM185g4ltwwH3HisEvQresxwKUotXZdAiUZyxogEb7B9hvuROrWMTNE94mbXkJkfKOI-pY7ZPY",
  client_secret : "EACRWgAcIYaBwffBJ7Qn1fj2chyqR_rokHGeyHT0khiP8MhXCQ03k8spsxTGGMdLxQHB7AiyaDDVFlVy",
})

module.exports = paypal