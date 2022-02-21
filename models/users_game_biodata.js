
const { Sequelize, DataTypes, Model } = require('sequelize'); // import sequileze dataype , model
const sequelize = require('../utils/databaseConnection') // import connect dari utilsdatabaseConnection

class UsersGameBiodata extends Model { }
// didalam 
UsersGameBiodata.init({
    uuid: { // default value ini kalo kita gak isi apa apa dia langsung isi otomatis insert value UUIDV4 kalo serial 1234 secara otomatis saat create table saat masukan models id 
        type: DataTypes.UUID, //data type ini didapat dari module yang sudah di import sebelumnya  type dataype adalah uuid jadi kiata kasih tau dulu type apa sih type data nya uuid
        defaultValue: DataTypes.UUIDV4, // terus dia ada default value yang kalo gak diisi langsug di isi  secara automatis sama system ternyata ada  uuidv4 , uuid v4 itu generasi uuid terbaru
        primaryKey: true // in iadalah primary key dari table user 
    },
    age: {
        type: DataTypes.INTEGER(3),
        allowNull: false, // allownull = false age tidak boleh kosong 
        // dengan pesan custom
        // unique  tanpa pesan custom 
        // unique: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false, // allownull = false address tidak boleh kosong
    },
    city: {
        type: DataTypes.STRING(255),
        allowNull: false, // allownull = false address tidak boleh kosong
    },
    user_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },

}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'user_game_biodata', // We need to choose the model name disini yang akan nanti di jadikan sebagai nama tabel nya  jadi nama tabel pakainya huruf kecil semua 
    freezeTableName: true, // kalo ini si nama tabelnya gak pengen di rubah jadi bentuk jamak nama tabelnya tidak di rubah jadi bentuk jamak
    createdAt: true, // kalo di mongoose buat data langsung automati buat tanggalnya  jadi psql ada createdAt data tanggal di input secara automatis
    updatedAt: true // 
});


module.exports = UsersGameBiodata