

const mainPage = (req, res, next) => {
  res.render("index", { layout: "../views/layouts/_admin.ejs" });
};


module.exports={
    mainPage,
}

