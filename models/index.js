const Users = require('./users')   // cara exports database ke postgresql
const UsersGameHistory = require('./users_game_history')
const UsersGameBiodata = require('./users_game_biodata')
//jadi index ini buat daftarin sebuah model 


// definiskan relasi 
// jadi naro id user di tabel lain , di relasi namayna user_uuid
// hasMany dapatnya aray  kenapa array karna many banyak jadi di simpan di dalam array 
// hasOne karna datanya dia punya satu jadi dapatnya null

// user adalah parent dari cats
// user  punya banyak (hasMany) cats

// user pinya satu (hasOne) biodatausergame
Users.hasOne(UsersGameBiodata, {
    foreignKey: 'user_uuid',
    as: 'user_game_biodata'
})

// cats adalah kepemilikan dari (belongsTo) users
// cats adalah children dari user tanda nya dia adalah childer , ada uuid dari user dalam table cats
UsersGameBiodata.belongsTo(Users, {
    foreignKey: 'user_uuid',
    as: 'users'
})

// user  punya banyak (hasMany) dogs
Users.hasOne(UsersGameHistory, {
    foreignKey: 'user_uuid',
    as: 'user_game_history'
})


// dogs adalah kepemilikan dari (belongsTo) users
UsersGameHistory.belongsTo(Users, {
    foreignKey: 'user_uuid',
    as: 'users'
})


module.exports = {
    Users,
    UsersGameHistory,
    UsersGameBiodata
}