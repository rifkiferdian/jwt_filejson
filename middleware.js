const jwt = require("jsonwebtoken");
const fs = require("fs");

const checkIdExist = (id_hactiv8) => {
  const jsonString = fs.readFileSync("./data.json");
  const dataJson = JSON.parse(jsonString);

  for (var i = 0; i < dataJson.length; ++i) {
      const idHactiv8 = dataJson[i];
      if( idHactiv8.id_hactiv8 === id_hactiv8 ){
          return {'status':true,'data':idHactiv8};
      }
  }

  return {'status':false};
}

const getData = (param) => {
  const jsonString = fs.readFileSync("./data.json");
  const dataJson = JSON.parse(jsonString);
  return dataJson;
}

const signToken = (object) => {
  return jwt.sign(object, "rahasiaBosQ");
};

const verifyToken = (access_token) => {
  return jwt.verify(access_token, "rahasiaBosQ");
};

module.exports = {
  signToken,
  verifyToken,
  checkIdExist, 
  getData,
};