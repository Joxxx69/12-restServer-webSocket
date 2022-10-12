

const errorHandler = (err, req, res, next) => {
    console.log('error handler');
    console.log(err.status);
    res.status(req.statusError||400).json(err);
}


module.exports = {
    errorHandler
}