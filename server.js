// Import Module
require("dotenv").config();
const express = require("express");
const sequelize = require("./utils/databaseConnection");
const routes = require("./routes/router");

// Inisiasi App untuk bisa menjalankan middleware
const app = express();

app.set("view engine", "ejs");
app.set("views", "./public/views");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rute untuk melakukan CRUD dari folder routes
app.use(routes);
// // Import Module
// require('dotenv').config();// dotenv panggil di paling atas aplikasi 
// const express = require('express');
// //inisiasi App untuk bisa menjalankan middleware
// const sequelize = require('./utils/databaseConnection');
// const routes = require('./routes/router');

// const app = express();

// //middleware cookieParser 
// // app.use(cookieParser())
// app.set('view engine', 'ejs'); // template view engine menggunakan ejs
// app.set("views", "./views"); // views nama folder dari si ejs 
// app.use(express.static(__dirname + '/public'));



// // Inisiasi app untuk menjalankan filee json di dalam express
// // suapaya aplikasi kita bisa menerima posting kita harus menggunakan middleware
// // nah middle ware itu ada dua
// //middleware untuk parsing body
// // app.use(express.urlencoded({ extended: true }));
// // express.json supaya bisa baca json juga ya
// // app.use(express.json());
// app.use(routes)

// middleware untuk handle error
// kalo ada error dia langsung masuk ke dalam middleware ini 
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        error: statusCode,
        message: error.message
    })
})


// connect()
// nyalain alter kalo kita data nya itu masih dummy atau datanya itu masih kosong  sequelize.sync({ alter: true }).then(() => {
// jangan gunakan alter ke database asli yg sudah ada isi datanya
// untuk menghindari error jika mau menambahkan kolom tabel jika tabel dan structure sudah di buat lebih baik tambahkan kolom table  ke database , baru tambahkan kolom tabel ke  dalam models
sequelize.sync(
    // fungsi alter akan drop kolom ketika kolom yang di database dengan yang di model berbeda
    // fungsi alter ini akan mengutamakan bentuk data yang di model di bandingkan dengan yang di database
    // jadi jika di models data structure misalkan age gak ada lalu pakai alter true maka data structure age di database akan terhapus  semua data user nya
    // {
    //     // fungsi selain alter true ini ada yang namanya force 
    //     // { alter: true }
    //     // fungsi force true ini dia lebih keras lagi fungsinya diabahkan sampai tabel tabelnya bakal di drop juga 
    //     // jadi kalo temen temen punya table asli , terus temen temen save sesuatu doa ;msg d idrop datanya

    //     //drop semua table kemudian buat ulang tabelnya sesuai dengan model 
    //     force: true
    // }


).then(() => {
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running at port $ {PORT}`);
    })
}).catch((error) => {
    console.log(error);
})














// di modles buat table di dalam table itu ada apa aja dan bentuk type apa aja , misalkan name tpye varchar , id type int / serial
// langkah awal setup koneksi
// langkah kedua buat models ada duacara buat models , sequilize .define , ada cara kedua pakai class extend pakainya inheritance



