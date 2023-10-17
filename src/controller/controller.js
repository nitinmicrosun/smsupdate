let {
  register_data_save,
  login_data_validation,
} = require("./../service/service");

exports.register = async (req, res) => {
  res.render("register");
};
exports.login =async (req,res) => {
  res.render("login");
  }
exports.register_data_save = async (req, res) => {
  let data = await register_data_save(req);
  console.log(data)
  if (data.success) {
    res.render("login", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};

exports.login_data_validation = async (req, res) => {
  console.log(req.body);
  let data = await login_data_validation(req,res);
  

  if (data.success) {
    res.render("dashboard", { data });
  } else {
    res.send({ staus: 400, message: "not regisred", data: [], sucess: false });
  }
};
