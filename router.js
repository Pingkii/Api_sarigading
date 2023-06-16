'use strict';

module.exports = function(app){
    var jsonku = require('./controller');
    
    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilmenu);

    app.route('/tambah')
        .post(jsonku.tambahmenu);

    app.route('/edit')
        .put(jsonku.ubahmenu);

    app.route('/hapus')
        .delete(jsonku.hapusmenu);
}