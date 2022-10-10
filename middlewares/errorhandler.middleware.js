

const errorHandler = (err, req, res, next) => {
    console.log('error handler');
    res.status(400).json(err);
}


module.exports = {
    errorHandler
}