const jwt = require("jsonwebtoken");

exports.UsergenerateToken = (student)=>{
    return jwt.sign({email : student.email, id: student._id}, process.env.USER_JWT_KEY);
};
exports.HostgenerateToken = (host)=>{
    return jwt.sign({email : host.email, id: host._id}, process.env.HOST_JWT_KEY);
};

