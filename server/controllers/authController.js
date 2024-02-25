const User = require("../models/userModel.js");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'E-mail không tồn tại' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }
    const token = generateToken(user._id);
    res.json({
      user: user,
      token: token,
      message: 'Đăng nhập thành công'
    });
  } catch (error) {
    res.status(500).send({ message: "error", error: error });
  }
};

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, password, phone, email, student_id, faculty, department } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: 'Người dùng đã tồn tại!' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstname,
      lastname,
      password: hashedPassword,
      phone,
      email,
      student_id,
      faculty,
      department
    });

    await newUser.save();

    res.status(200).json({ message: 'Người dùng đã được thêm thành công!' });
  } catch (error) {
    res.status(500).send({ message: "error", error: error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);

      const send_email = sendEmail(email, randomNumber);
      if (send_email) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(randomNumber.toString(), saltRounds);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Mật khẩu mới đã được gửi đến e-mail' });
      }
      else {
        res.status(401).json({ message: 'E-mail không tồn tại' });
      }
    }
    else
      res.status(401).json({ message: 'Tài khoản người dùng không tồn tại' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error", error: error });
  }
};

const sendEmail = async (recipient_email, randomNumber) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: 'pttnguyen528@gmail.com',
      pass: 'tmdbgerilmkxvmst',
    },
  });

  const mailOptions = {
    from: 'pttnguyen528@gmail.com',
    to: recipient_email,
    subject: 'PASSWORD RESET',
    html: `<html>
             <body>
               <h2>Mật khẩu mới của bạn là</h2>
               <h3>${randomNumber}</h3>
             </body>
           </html>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};

const generateToken = (user_id) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: user_id,
  };

  const token = jwt.sign(data, jwtSecretKey);

  return token;
};

const validateToken = (token) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const verified = jwt.verify(token, jwtSecretKey);
  if (verified) {
    return true;
  } else {
    return false;
  }
};
