let {
  register_data_save,
  login_data_validation,adddata,reservice
} = require("./../service/service");

exports.register = async (req, res) => {
  res.render("register");
};
exports.register_data_save = async (req, res) => {
  let data = await register_data_save(req);
  if (data.sucess) {
    res.render("login", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
exports.login_data_validation = async (req, res) => {
  let data = await login_data_validation(req, res);

  if (data.sucess) {
    res.render("dashboard", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
 exports.adddata=async(req,res)=>{
   let data=await adddata(req,res);
   if (data.sucess){
    req.flash("success","data add succesfully")
    res.redirect("/reservice");
  }else {
    res.send({staus: 400, message: "not applicable service", data: [], sucess: false })
  }
}

exports.resservice=async(req,res)=>{
  res.locals.message=req.flash();
  let data=await reservice(res);
  if (data.sucess){
    
   res.render("service",{data:data.data});
 }else {
   res.send({staus: 400, message: "not applicable service", data: [], sucess: false })
 }
}
