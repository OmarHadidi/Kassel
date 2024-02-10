const isAuthenticated = () => (req, res, next) => {
    if (req.isAuthenticated()) {
        // If user is authenticated, allow request to proceed
        return next();
    }
    // If user is not authenticated, redirect to login page
    res.redirect("/auth/login");
};

module.exports = {
    isAuthenticated,
};
