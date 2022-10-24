

const errorHandler = (err, req, res, next) => {
    console.log({msg:'error handler',error:err});
    res.status(req.statusError||400).json(err);
}


module.exports = {
    errorHandler
}