// User Authentication
import {TokenDecode} from "../utility/TokenUtility.js";

export default (req, res, next) => {

     const token = req.headers["token"];
     const decoded = TokenDecode(token);

     if(decoded === null){
         return res.status(401).json({status: "fail", message: "Unauthorized"});
     }else{

         const email = decoded.email;
         const user_id = decoded.user_id;
         req.headers.email = email;
         req.headers.user_id = user_id;
         next();

     }

}