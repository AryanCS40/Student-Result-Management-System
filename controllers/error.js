exports.error = ((req,res,next)=>{
    res.status(404).render('error', {pageTitle : '404', role : ' '} )
});