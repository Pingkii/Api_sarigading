'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './public' });

exports.index = function(req,res){
    response.ok("aplikasi REST API berjalan",res)
};


//menampilkan data per id
exports.tampilid = function (req, res) {
    let id_menu = req.params.id_menu;
    connection.query('SELECT * FROM menu WHERE id_menu = ?', [id_menu],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};


//menampilkan data pada databese
exports.tampilmenu = function(req, res){
    connection.query('Select * from menu', function(error, rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res)
        }
    });
} 

//menambahkan data pada database
exports.tambahmenu = function (req, res) {
    upload.single('gambar')(req, res, function (err) {
      if (err) {
        console.log(err);
        return response.error('Terjadi kesalahan dalam mengunggah gambar', res);
      }
  
      var id_menu = req.body.id_menu;
      var nama_menu = req.body.nama_menu;
      var harga = req.body.harga;
      var stok = req.body.stok;
  
      const imageBuffer = fs.readFileSync(req.file.path);
  
      // Lanjutkan proses penambahan menu ke database
      connection.query(
        'INSERT INTO menu (id_menu, nama_menu, harga, stok, gambar) VALUES (?, ?, ?, ?, ?)',
        [id_menu, nama_menu, harga, stok, imageBuffer],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
          } else {
            response.ok('Berhasil Menambahkan Data!', res);
          }
        }
      );
    });
  };

//
exports.ubahmenu = function (req, res) {
    var id_menu = req.body.id_menu;
    var nama_menu = req.body.nama_menu;
    var harga = req.body.harga;
    var stok = req.body.stok;
    var gambar = req.file.gambar;

    const imagebuffer = Buffer.from(gambar,'base64');

    connection.query('UPDATE menu SET nama_menu=?, harga=?, stok=?, gambar=? WHERE id_menu=?', [nama_menu, harga, stok, imagebuffer,id_menu],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Ubah Data", res)
            }
        });
}

//menghapus data pada database
exports.hapusmenu = function (req, res) {
    var id_menu = req.body.id_menu;
    connection.query('DELETE FROM menu WHERE id_menu = ?',[id_menu],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Hapus Data", res)
            }
        });
}

//menambahkan gambar


