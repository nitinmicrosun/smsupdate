let adminModel = require("./../model/register");
let serviceModel = require("./../model/service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let mongoose = require("mongoose");

exports.register_data_save = async (req) => {
  try {
    let salt = bcrypt.genSaltSync(10);
    req.body.pass = bcrypt.hashSync(req.body.pass, salt);
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;

    let number = req.body.mobile;
    let savedata = new adminModel({
      name: name,
      email: email,
      password: pass,

      mobile: number,
    });
    let saved_data = await savedata.save();
    if (saved_data)
      return {
        message: "data saved",
        data: saved_data,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};
exports.login_data_validation = async (req, res) => {
  try {
    let data = await adminModel.findOne({ email: req.body.email });
    if (data) {
      let matchpass =  bcrypt.compareSync( req.body.pass,data.password);
      if (matchpass) {
        const token = jwt.sign(
          { _id: data._id.toString() },
          process.env.SECRET_KEY
        );
  await adminModel.findByIdAndUpdate(
          { _id: data._id },
          { auth_key: token }
        );
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 10000 * 60 * 60), //1 minit
          httpOnly: true,
          overwrite: true,
        });

        return {
          message: "user is logined",
          sucess: true,
          status: 200,
        };
      } else {
        return {
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    } else {
      return {
        message: "invalid credentials",
        sucess: false,
        status: 300,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

};

exports.add_admin_service = async (req) => {
  try {
    
    let name = req.body.name;
    let price = req.body.price;
    let duration = req.body.duration;
    let category = req.body.category;
    let adddata = new serviceModel({
      service_name: name,
      service_price: price,
      duration: duration,
      category: category,
    });
    let saved_data = await adddata.save();

    if (saved_data)
      return {
        message: "data saved",
        data: saved_data,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};

//updating data

exports.update_service = async (req) => {
  try {
    let name = req.body.name;
    let category= req.body.category;
    let price = req.body.price;
    let number = req.body.duration;
    let id=req.body.id;
    let updatedata = await serviceModel.findByIdAndUpdate({_id:id},{
      service_name: name,
      service_price: price,
      category: category,
      duration: number,
    });
    if (updatedata)
      return {
        message: "data saved",
        data: updatedata,
        sucess: true,
      };
    else {
      return {
        message: "data not saved",
        data: [],
        sucess: false,
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  //saving database
};

exports.resservice = async (req,res) => {
  try{
       
    let data= await serviceModel.find();
    if(data){
        return {
          data:data,
          message: "user is logined",
          sucess: true,
          status: 200,
        };
      } else {
        return {
          data:data,
          message: "invalid credentials",
          sucess: false,
          status: 300,
        };
      }
    } 
   catch (error) {
    console.log("error", error);
  }

};

exports.signout = async (req,res) => {
       
  try {
    if (req.cookies.jwt != undefined && req.cookies.jwt != "") {
      const token = req.cookies.jwt;
      let data= await adminModel.findOneAndUpdate({auth_key:token},{auth_key:null});
      res.cookie("jwt", '');
  if(data){
      return {
        data:data,
        message: "user is logined",
        sucess: true,
        status: 200,
      };
    } else {
      return {
        data:data,
        message: "invalid credentials",
        sucess: false,
        status: 300,
      };
    }
  } 
}
 catch (error) {
  console.log("error", error);
}

};