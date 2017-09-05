// We only need a default route.  Angular will handle the rest.
exports.index = function(req, res) {
    res.render('index');
};
