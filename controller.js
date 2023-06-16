'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req,res){
    response.ok("aplikasi REST API berjalan",res)
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
}; 

//menambahkan data pada database
exports.tambahmenu = function (req, res) {
    var id_menu = req.body.id_menu;
    var nama_menu = req.body.nama_menu;
    var harga = req.body.harga;
    var stok = req.body.stok;
    var gambar = req.body.gambar;

    const imagebuffer = Buffer.from(gambar,'base64');



    connection.query('INSERT INTO menu (id_menu,nama_menu,harga,stok,gambar) VALUES(?,?,?,?,?)',
        [id_menu, nama_menu, harga, stok, imagebuffer],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data!", res)
            }
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


