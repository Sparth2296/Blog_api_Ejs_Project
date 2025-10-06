const userModel = require("../model/userModel");

module.exports.auth = async (req, res, next) => {
  try {
    if (req.cookies.userId) {
      const userAuth = await userModel.findById(req.cookies.userId);

      if (userAuth) {
        next();
      } else {
        res.clearCookie("userId");
        return res.redirect("/login");
      }
    } else {
      res.clearCookie("userId");
      return res.redirect("/login");
    }
  } catch (error) {
    console.error(err);
    res.clearCookie("userId");
    res.redirect("/register");
  }
};
