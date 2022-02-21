
const { Sequelize, DataTypes, Model } = require('sequelize'); // import sequileze dataype , model
const sequelize = require('../utils/databaseConnection') // import connect dari utilsdatabaseConnection

class Users extends Model { }
// didalam 
Users.init({
    // Model attributes are defined here
    // firstName: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // lastName: {
    //     type: DataTypes.STRING
    //     // allowNull defaults to true
    // }
    uuid: { // default value ini kalo kita gak isi apa apa dia langsung isi otomatis insert value UUIDV4 kalo serial 1234 secara otomatis saat create table saat masukan models id 
        type: DataTypes.UUID, //data type ini didapat dari module yang sudah di import sebelumnya  type dataype adalah uuid jadi kiata kasih tau dulu type apa sih type data nya uuid
        defaultValue: DataTypes.UUIDV4, // terus dia ada default value yang kalo gak diisi langsug di isi  secara automatis sama system ternyata ada  uuidv4 , uuid v4 itu generasi uuid terbaru
        primaryKey: true // in iadalah primary key dari table user 
    },
    username: {
        type: DataTypes.STRING(255), // 255 total maksimum length charater 
        allowNull: false, //allownull kaya nanya boleh null gak gak boleh  null ini kan kosong artinya kalo true berarti boleh kosong , jadi allow null false berarti data nama ini gak boleh di kosongin ketika di input nama si usernya
        unique: true // unique true username tidak boleh double jadiuser harus buat username baru
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // dengan pesan custom
        unique: { // tpye data ini uniqe karna gak boleh double email sama dengan uniqe truebeda nya ini ada message 
            msg: "Email Sudah Digunakan" // 
        }

    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    // Other model options go here
    sequelize, // Memberikan koneksi
    modelName: 'users', // We need to choose the model name disini yang akan nanti di jadikan sebagai nama tabel nya  jadi nama tabel pakainya huruf kecil semua 
    freezeTableName: true, // kalo ini si nama tabelnya gak pengen di rubah jadi bentuk jamak nama tabelnya tidak di rubah jadi bentuk jamak
    createdAt: true, // kalo di mongoose buat data langsung automati buat tanggalnya  jadi psql ada createdAt data tanggal di input secara automatis
    updatedAt: true // 
});


module.exports = Users