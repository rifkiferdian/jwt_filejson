const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const port = 4000;
const { checkIdExist, signToken, getData, verifyToken } = require("./middleware");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    const data = {
            id : 'INJS-KS03-005',
            nama : 'Rifki Ahmad Perdian',
            kampus : 'Universitas Amikom'
    }
    res.status(200).json({'Tugas Membuat Api memakai JWT dan file Json':data});
});

app.post("/createtoken",async (req, res) => {
    try {
        const id_hactiv8 = req.body.id_hactiv8;
        const cekcek = await checkIdExist(id_hactiv8);
        const createJwt = await signToken(cekcek.data);
        res.status(200).json({'token JWT':createJwt});
    } catch (error) {
        res.status(400).json({'message':'Id tidak ditemukan'});
    }
});

app.use( async (req,res,next) => {
    try {
        var token = req.headers['x-access-token'];
        await verifyToken(token)
        next();
    } catch(err) {
        res.status(400).json({'message':'token salah'})
    }
})

app.get("/data", async (req, res) => {
    try {
        const data = await getData()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({'message':error.message});
    }
    
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});