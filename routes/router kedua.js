// Cara manual dengan JSON CRUD bisa melalui POSTMAN, Insomnia dan FireCamp 

// untuk mendapatkan seluruh data user
router.get('/api/users/games', async (req, res, next) => {
    try {
        const userList = await Users.findAll({
            // include berfungsi untuk join table sesuai dengan alias (AS) yang sudah didefinisikan yang ada di file index
            include: ['user_game_history', 'user_game_biodata']
        })
        // karna nama relasi nya cats
        // kita ambil data dari Users kita mau join cats kita taunya dari mana itu kan dari Users. ktia mau join Cats,{ as :cats } karna nama joinan nya atau aliasnya cats   

        res.status(200).json({
            messsage: "success",
            data: userList
        })
        // res.render(namaejs, { data: userList })
    } catch (error) {
        // teruskan error ke middleware yang handle errorr
        next(error)
    }

})


// untuk mendapatkan seluruh data game history
// router.get('/api/user/game/history', async (req, res, next) => {
//     try {
//         const userGameHistoryList = await UsersGameHistory.findAll({
//             include: ['users']
//         })
//         // karna nama relasi nya cats
//         // kita ambil data dari Users kita mau join cats kita taunya dari mana itu kan dari Cats. ktia mau join Users,{ as :users } karna nama joinan nya atau aliasnya users   

//         res.status(200).json({
//             messsage: "success",
//             data: userGameHistoryList
//         })
//     } catch (error) {
//         // teruskan error ke middleware yang handle errorr
//         next(error)
//     }

// })

// untuk mendapatkan seluruh data user game biodata
// router.get('/api/user/game/biodata', async (req, res, next) => {
//     try {
//         const userGameBiodataList = await UsersGameBiodata.findAll({
//             include: ['users']
//         })
//         // karna nama relasi nya cats
//         // kita ambil data dari Users kita mau join cats kita taunya dari mana itu kan dari Cats. ktia mau join Users,{ as :users } karna nama joinan nya atau aliasnya users   
//         res.status(200).json({
//             messsage: "success",
//             data: userGameBiodataList
//         })
//     } catch (error) {
//         // teruskan error ke middleware yang handle errorr
//         next(error)
//     }

// })





// create User
router.post('/api/users', async (req, res, next) => {
    const { username, email, password } = req.body
    // insert data gk ngurut gpp 
    // operasi create ini sama dengan 
    // sama dengan kita melakukan operasi Executing (default): INSERT INTO "users" ("uuid","name","email","hobby","status","is_active","age","createdAt","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING "uuid","name","email","hobby","status","is_active","age","createdAt","updatedAt";
    // VALUES ($name,$email,$hobby,$status,$is_active,$age,$createdAt,$updatedAt,$9) RETURNING "uuid","name","email","hobby","status","is_active","age","createdAt","updatedAt";
    // jadi anggap dolar ini value yang kita input di const {name, email, hobby, status, is_active, age}
    try {
        const newUser = await Users.create({
            // jadi disini masukin kolom gak ngurut gpp yng penting key nya ini di isi sama email di kirim sama si user sama client
            username,
            email,
            password,

        })
        if (newUser) {
            res.status(201).json({
                messsage: "success",
                data: newUser
            })
        } else {
            res.status(400).json({
                message: "FAILED"
            })
        }
    } catch (error) {
        next(error) // next erorr meneneruksan ke middle ware berikut nya app ,req, res, next
    }
})


// create history
router.post('/api/user/game/history', async (req, res, next) => {
    const { win, lose, user_uuid, status, is_active } = req.body

    try {
        const newUserGamesHistory = await UsersGameHistory.create({
            win,
            lose,
            user_uuid,
            status,
            is_active,
        })
        if (newUserGamesHistory) {
            res.status(201).json({
                messsage: "success",
                data: newUserGamesHistory
            })
        } else {
            res.status(400).json({
                message: "FAILED"
            })
        }
    } catch (error) {
        next(error) // next erorr meneneruksan ke middle ware berikut nya app ,req, res, next
    }
})

// create biodata
router.post('/api/user/game/biodata', async (req, res, next) => {
    const { age, address, city, user_uuid, } = req.body

    try {
        const newUsersGameBiodata = await UsersGameBiodata.create({
            age,
            address,
            city,
            user_uuid

        })
        if (newUsersGameBiodata) {
            res.status(201).json({
                messsage: "success",
                data: newUsersGameBiodata
            })
        } else {
            res.status(400).json({
                message: "FAILED"
            })
        }
    } catch (error) {
        next(error) // next erorr meneneruksan ke middle ware berikut nya app ,req, res, next
    }
})

//edit user  routes  api/users/id nya 
router.put('/api/users/:id', async (req, res, next) => {
    const { name, email, password, status, is_active } = req.body
    try {
        // jadi panggil dulu niiih user yang mau di update 
        // ini bentuk panjang
        // await Users.findOne({
        //     where: {
        //         uuid: req.params.id
        //     }
        // })
        // ini bentuk pendek 
        const userToUpdate = await Users.findByPk(req.params.id)
        // jika user yang akan di edit ditemukan 
        if (userToUpdate) {
            const updated = await userToUpdate.update({
                // kalau name dari body ada pakai name dari body , ?? kalau tidak pakai name yang sebelumnya  sudah ada di db
                // pakai shorthand ternary
                username: username ?? userToUpdate.username,
                email: email ?? userToUpdate.email,
                password: password ?? userToUpdate.password,
                // status: status ?? userToUpdate.status,
                // is_active: (is_active !== null && is_active !== undefined) ? is_active : userToUpdate.is_active, // is active tidak samadengan null dan tidak samaadengan undifined ktia kasih variable dari body , kalo dia nilai null dan undefined maka kita pakai data lamanya di userToUpdate.is_active 
            })
            res.status(200).json({
                message: "SUCCESS",
                data: updated
            })
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (error) {
        next(error)
    }
})
//edit user_game_history
router.put('/api/user/game/history/:id', async (req, res, next) => {
    const { user_history, history_score_users, user_uuid, status, is_active } = req.body
    try {
        // jadi panggil dulu niiih user yang mau di update 
        // ini bentuk panjang
        // await Users.findOne({
        //     where: {
        //         uuid: req.params.id
        //     }
        // })
        // ini bentuk pendek 
        const HistoryUserToUpdate = await UsersGameHistory.findByPk(req.params.id)
        // jika user yang akan di edit ditemukan 
        if (HistoryUserToUpdate) {
            const updated = await HistoryUserToUpdate.update({
                // kalau name dari body ada pakai name dari body , kalau tidak pakai name yang sebelumnya  sudah ada di db
                // pakai shorthand ternary
                win: win ?? HistoryUserToUpdate.win,
                lose: lose ?? HistoryUserToUpdate.lose,
                user_uuid: user_uuid ?? HistoryUserToUpdate.user_uuid,
                status: status ?? HistoryUserToUpdate.status,
                is_active: (is_active !== null && is_active !== undefined) ? is_active : HistoryUserToUpdate.is_active, // is active tidak samadengan null dan tidak samaadengan undifined ktia kasih variable dari body , kalo dia nilai null dan undefined maka kita pakai data lamanya di userToUpdate.is_active 
            })
            res.status(200).json({
                message: "SUCCESS",
                data: updated
            })
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (error) {
        next(error)
    }
})

//edit user_game_biodata
router.put('/api/user/game/biodata/:id', async (req, res, next) => {
    const { users_game_biodata, favorite_color, address, user_uuid, hobby, status, is_active, age } = req.body
    try {
        // jadi panggil dulu niiih user yang mau di update 
        // ini bentuk panjang
        // await Users.findOne({
        //     where: {
        //         uuid: req.params.id
        //     }
        // })
        // ini bentuk pendek 
        const BiodataToUpdate = await UsersGameBiodata.findByPk(req.params.id)
        // jika user yang akan di edit ditemukan 
        if (BiodataToUpdate) {
            const updated = await BiodataToUpdate.update({
                // kalau name dari body ada pakai name dari body , kalau tidak pakai name yang sebelumnya  sudah ada di db
                // pakai shorthand ternary
                age: age ?? BiodataToUpdate.age,
                address: address ?? BiodataToUpdate.address,
                city: city ?? BiodataToUpdate.city,
                user_uuid: user_uuid ?? BiodataToUpdate.user_uuid,
            })
            res.status(200).json({
                message: "SUCCESS",
                data: updated
            })
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/api/users/:id', async (req, res, next) => {
    try {
        const userToDeleted = await Users.findByPk(req.params.id)
        // jika user yang akan di edit ditemukan 
        if (userToDeleted) {
            // bentuk sql nya  DELETE FROM "users" WHERE "uuid" = '682baa6c-9004-4a44-a687-dbaae32c781a'
            const deleted = await Users.destroy({
                where: {
                    uuid: req.params.id
                }
            })
            // kalau deleted nya samadengan angka 1 berarti berhasil 
            console.log(deleted)
            res.status(200).json({
                message: "SUCCESS"
            })
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (error) {
        next(error)
    }


})


router.delete('/api/user/game/biodata/:id', async (req, res, next) => {
    try {
        const userToDeleted = await UsersGameBiodata.findByPk(req.params.id)
        // jika user yang akan di edit ditemukan 
        if (userToDeleted) {
            // bentuk sql nya  DELETE FROM "users" WHERE "uuid" = '682baa6c-9004-4a44-a687-dbaae32c781a'
            const deleted = await UsersGameBiodata.destroy({
                where: {
                    uuid: req.params.id
                }
            })
            // kalau deleted nya samadengan angka 1 berarti berhasil 
            console.log(deleted)
            res.status(200).json({
                message: "SUCCESS"
            })
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/api/user/game/history/:id', async (req, res, next) => {
    try {
        const userToDeleted = await UsersGameHistory.findByPk(req.params.id)
        // jika user yang akan di edit ditemukan 
        if (userToDeleted) {
            // bentuk sql nya  DELETE FROM "users" WHERE "uuid" = '682baa6c-9004-4a44-a687-dbaae32c781a'
            const deleted = await UsersGameHistory.destroy({
                where: {
                    uuid: req.params.id
                }
            })
            // kalau deleted nya samadengan angka 1 berarti berhasil 
            console.log(deleted)
            res.status(200).json({
                message: "SUCCESS"
            })
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (error) {
        next(error)
    }
})