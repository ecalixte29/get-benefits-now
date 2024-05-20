import jsonwebtoken from 'jsonwebtoken'
import Admin from '../schemas/Admin.js'
import bcrypt from 'bcrypt'

const register = async (req,res) => {
    const { username, password, access_key } = req.body
    if(username?.length < 4) return res.status(403).json({ message: 'Username must be longer than 4 characters' })
    else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) return res.status(403).json({ message: 'Password must be minimum eight characters, at least one upper and lowerscase letter and one number' })
    else if(access_key !== process.env.ACCESS_KEY) return res.status(403).json({ message: 'Incorrect access key' })
    
    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const admin = await Admin.create({ username, password: hashedPwd })
        const token = jsonwebtoken.sign({ id: admin._id }, process.env.ACCESS_KEY)

        return res.status(200).json({ token })
    }catch(err){
        console.log(err);
        res.status(500).send()
    }
}

const login = async (req,res) => {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username })
    if(!admin) return res.status(401).json({ message: 'Admin not found or invalid password' })
    const isValidPwd = bcrypt.compare(password, admin.password)
    if(!isValidPwd) return res.status(401).json({ message: 'Admin not found or invalid password' })
    
    const token = jsonwebtoken.sign({ id: admin._id }, process.env.ACCESS_KEY)
    return res.status(200).json({ token })
}

const getUser = async (req, res) => {
    res.json(req.body.admin)
}

export { register, login, getUser }