const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["owner", "customer"],
        default: "customer"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.isOwner = function () {
    return this.role == "owner";
};

userSchema.methods.comparePassword = async function (password, cb) {
    let result;
    try {
        result = await bcrypt.compare(password, this.password);
        return cb(null, result);
    } catch (e) {
        return cb(e, result);
    }
};

// mongoose middlewares
// 若使用者為新用戶，或者是正在更改密碼，則將密碼進行雜湊處理
userSchema.pre("save", async function (next) {
    // this 代表 mongoDB 內的 document
    if (this.isNew || this.isModified("password")) {
        const hashValue = await bcrypt.hash(this.password, 10);
        this.password = hashValue;
    }
    next();
});


module.exports = mongoose.model('User', userSchema)