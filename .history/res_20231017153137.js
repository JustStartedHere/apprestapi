"use strict";

const e = require("express");

exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  };
  res.json(data);
  res.end();
};

// response untuk nested matakuliah
exports.oknested = function (values, res) {
  // lakukan akumulasi
  const hasil = values.reduce((akumulasikan, item) => {
    // console.log(akumulasikan);
    // console.log(akumulasikan[item.nama]);
    // console.log(item.nama);
  //   // tentukan key group
  //   if (akumulasikan[item.nama]) {
  //     // buatlah variable group nama mahasiswa
  //     const group = akumulasikan[item].nama;

  //     // cek jika isi array adalah matakuliah
  //     if (Array.isArray(group.matakuliah)) {
  //       // tambahkan value ke dalam group matakuliah
  //       group.matakuliah.push(item.matakuliah);
  //     } else {
  //       group.matakuliah = [group.matakuliah, item.matakuliah];
  //     }
  //   } else {
  //     akumulasikan[item.nama] = item;
  //   }
  //   return akumulasikan;
  }, {});

  var data = {
    status: 200,
    values: hasil,
  };
  res.json(data);
  res.end();
};
