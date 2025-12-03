const User = require("../models/user.js");


//SignUp
module.exports.renderSignupForm = async (req, res, next) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res, next) => {
    try{
        let { username, email, password } = req.body;
        const newUser = new User ({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust! Registered Successfully.");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

//Login
module.exports.renderLoginForm = async (req, res, next) => {
    res.render("users/login.ejs");
}

module.exports.login = async(req, res, next) => {
    let { username } = req.body;
    req.flash("success", `Welcome to WanderLust ${username}!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

//Logout
module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "Logged out Successfully!");
        res.redirect("/listings");
    })
}