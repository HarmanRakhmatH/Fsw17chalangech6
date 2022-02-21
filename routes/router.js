const express = require('express')
// const app = express()
const router = express.Router()
const { Users, UsersGameHistory, UsersGameBiodata } = require('../models')






// router.post("/login", (req, res, next) => {
//     try {
//         const { status } = req.query
//         res.render('login', { PageTitle: "login", status })
//     } catch (error) {
//         next(error);
//     }
// });

//Menampilkan halaman website game
router.get('/', (req, res, next) => {
    const { status } = req.query // untuk ngebaca status dari query logins
    res.render('indexCh3', {
        PageTitle: "Home",
        status
    })
})



// menampilkan halaman Website Game
// router.get('/main', (req, res, next) => {
//     const { status } = req.query // untuk ngebaca status dari query login
//     res.render('mainTable', {
//         PageTitle: "MainTable",
//         status
//     })
// })



// Menampilkan Halaman AccountUser berdasarkan id tiap users denganfindOne
router.get("/AccountUser/:id", async (req, res, next) => {
    try {
        const usersSelected = await Users.findOne({
            where: {
                uuid: req.params.id,
            },
            include: ["user_game_biodata", "user_game_history"],
        });
        console.log(usersSelected);
        res.render('mainTable', {
            PageTitle: "UserGame",
            data: usersSelected,
        });
    } catch (error) {
        next(error);
    }
});



// Menampilkan tampilan login Users
router.get('/login', (req, res, next) => {
    const { status } = req.query // untuk ngebaca status dari query logins
    res.render('login', {
        PageTitle: "Login",
        status
    })
})




// Find all mencari semua Users yang akan melakukan proses login lalu mencari nya berdasarkan emails
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const usersAccount = await Users.findAll();

        const userMatch = usersAccount.find((item) => item.email === email);

        if (!userMatch) { // jadi kalo dia  usermatch nilainya negatif  balik lagi ke /login dengan res.redirect
            res.redirect('/login?status=emailnotfound')
        } else { // kalo email ketemu mau cek lagi si password itu sama gak sama  yang di input sama si user  . nilai data sema degan yang ada di data json kita
            if (password === userMatch.password) {
                res.redirect(`/AccountUser/${userMatch.uuid}`) // jadi kalo berhasil login saya mau balikin dia ke halaman home atau halaman mainnya
            } else {
                res.redirect('/login?status=wrongpassword')
            }
        }
    } catch (error) {
        next(error);
    }
})



// Read Users yang akan melakukan proses register 
router.get('/register', (req, res, next) => {
    try {
        res.render('register', { PageTitle: "Register" });
    } catch (error) {
        next(error);
    }
});

// Proses pembuatan registrasi Create User 
router.post('/register', async (req, res, next) => {
    const { username, email, password, age, address, city, win, lose, status, is_active } = req.body;

    try {
        const newUsers = await Users.create({
            username,
            email,
            password,
        });

        await UsersGameBiodata.create({
            age,
            address,
            city,
            user_uuid: newUsers.uuid,
        });

        await UsersGameHistory.create({
            win,
            lose,
            user_uuid: newUsers.uuid,
            status,
            is_active
        });

        if (newUsers) {
            res.redirect(`/AccountUser/${newUsers.uuid}`);
        }
    } catch (error) {
        next(error);
    }
});

// Menampilkan tampilan login Users
router.get('/AccountUser/edit/:id', (req, res, next) => {
    try {
        res.render('edit', { PageTitle: "Edit" });
    } catch (error) {
        next(error);
    }
});

// Melakukan Edit Pada AccountUser
router.post('/AccountUser/edit/:id', async (req, res, next) => {
    const { username, email, password, age, address, city, win, lose, status, is_active } = req.body;
    try {
        const userToUpdate = await Users.findByPk(req.params.id);

        if (userToUpdate) {
            const biodataToUpdate = await UsersGameBiodata.findOne({
                where: {
                    user_uuid: req.params.id,
                },
            });

            const updatedBiodata = await biodataToUpdate.update({
                age: age === "" ? biodataToUpdate.age : age,
                address: address ?? biodataToUpdate.address,
                city: city ?? biodataToUpdate.city,
            });

            const historyToUpdate = await UsersGameHistory.findOne({
                where: {
                    user_uuid: req.params.id,
                },
            });

            const updatedHistory = await historyToUpdate.update({
                win: win === "" ? historyToUpdate.win : win,
                lose: lose === "" ? historyToUpdate.lose : lose,
                status: status ?? historyToUpdate.status,
                is_active: (is_active !== null && is_active !== undefined) ? is_active : historyToUpdate.is_active
            });

            const updated = await userToUpdate.update({
                username: username ?? userToUpdate.username,
                email: email ?? userToUpdate.email,
                password: password === "" ? userToUpdate.password : password,
            });

            res.redirect(`/AccountUser/${updated.uuid}`);
        }
    } catch (error) {
        next(error);
    }
});

// Menghapus Akun (DELETE)
router.post("/delete/:id", async (req, res, next) => {
    try {
        const playerToDelete = await Users.findByPk(req.params.id);

        if (playerToDelete) {
            await UsersGameBiodata.destroy({
                where: {
                    user_uuid: req.params.id,
                },
            });

            await UsersGameHistory.destroy({
                where: {
                    user_uuid: req.params.id,
                },
            });

            const deleted = await Users.destroy({
                where: {
                    uuid: req.params.id,
                },
            });

            res.redirect("/?status=successfullydeleted");
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router 