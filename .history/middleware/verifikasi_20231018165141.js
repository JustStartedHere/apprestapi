import { verify } from "jsonwebtoken";
import { secret } from "../config/secret";

function verifikasi(roles) {
  return function (req, res, next) {
    // cek authorization header
    var tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(" ")[1];
      // verifikasi
      verify(token, secret, (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .send({ auth: false, message: "Token tidak terdaftar!" });
        } else {
          if (roles == 2) {
            req.auth = decoded;
            next();
          } else {
            return res
              .status(401)
              .send({ auth: false, message: "Gagal mengotorisasi role anda!" });
          }
        }
      });
    }else{
        return res
            .status(401)
            .send({ auth: false, message: "Token tidak tersedia!" });
    }
  };
}

export default verifikasi;