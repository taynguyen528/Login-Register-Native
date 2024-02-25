const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            "mongodb://0.0.0.0:27017/AuthDatabase",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Kết nối cơ sở dữ liệu thành công");
        return connection.connection.db;
    } catch (error) {
        console.error("Lỗi kết nối cơ sở dữ liệu:", error);
        throw error;
    }
};

module.exports = {
    async up(db) {
        const database = await connectDB();

        const usersCollection = database.collection("users");
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash("12345678", saltRounds);

        await usersCollection.insertOne({
            firstname: "Tây",
            lastname: "Nguyên",
            password: hashedPassword,
            phone: "0867835779",
            email: "pttnguyen528@gmail.com",
            student_id: "20110528",
            faculty: "faculty",
            department: "department",
        });
    },

    async down(db) {
        const database = await connectDB();
        const usersCollection = database.collection("users");

        await usersCollection.deleteMany({});
    },
};
