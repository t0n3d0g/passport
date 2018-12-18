// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("http://www.google.com");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/http://www.google.com");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });


   // Load example page and pass in an example by id
   app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/goal-scroller", function(req, res){
    var testStuff = [];
    testStuff.push({title: "example title", category: "Fitness", description: "Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds. Somthing Something I mispelled lots of wurds.", startDate: "9/11/1998", endDate: "9/11/2018", goalPageId: 2});
    testStuff.push({title: "example title2", category: "Diet", description: "Somthing Something I mispelled lots of wurds.", startDate: "9/11/1998", endDate: "9/11/2018", goalPageId: 1});
    res.render("goalScroller", {result: testStuff} );
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

};
