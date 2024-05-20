import jsonwebtoken from "jsonwebtoken"
import Admin from "../schemas/Admin.js"

const AuthMiddleware = async (req,res,next) => {
    const token = req.header('authorization')
    if(!token) return res.status(401).send()
    const decodedToken = await jsonwebtoken.verify(token.replace('Bearer ',''), process.env.ACCESS_KEY)
if(!decodedToken) return res.status(401).send()
    const admin = await Admin.findById(decodedToken.id)
    if(!admin) return res.status(401).send()
    req.body.admin  = admin.toJSON()
    next()
}

export default AuthMiddleware