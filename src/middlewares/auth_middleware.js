const oturumAcilmis = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error',['Lütfen önce oturum açınız'])
        res.redirect('/auth/login');
    }
}

module.exports={
    oturumAcilmis,
}