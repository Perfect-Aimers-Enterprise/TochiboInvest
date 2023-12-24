const redirectOrNot = (req, res, next)=>{
    console.log("present url")
    console.log(req.url);
    console.log(req.authorized);
    if(req.authorized){
        // console.log("no error")
        // console.log(req.authorized)
        return next()
    }
    
    // console.log('Error');
    // console.log(req.authorized);
    return res.redirect("/authenticate/login.html");
}


module.exports = redirectOrNot;