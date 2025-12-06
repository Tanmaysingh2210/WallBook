const authMiddleware = (req,res,next) => {
    try {
        if(!req.session || !req.session.user){
            return res.status(401).json({
                success: false,
                message: 'Not authenticated, access denied',
            });
        }

        req.user = req.session.user;
        next();
    } catch (err) {
        return res.status(500).json({
            success:false,
            message:'Authenticated failed',
            error:err.message
        });
    }
};

export default authMiddleware;