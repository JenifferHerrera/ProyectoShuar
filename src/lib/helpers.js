const byencrypt=require('bcryptjs');
const helpers={}
helpers.encryptPassword=async (password)=>{
    const salt=await byencrypt.genSalt(10);
    const hash=await byencrypt.hash(password,salt);
    return hash;
}
helpers.matchPassword=async(password,savedPassword)=>{
    try{
        return await byencrypt.compare(password,savedPassword)
    }catch (e){
        console.log(e);
    }

}
module.exports=helpers;