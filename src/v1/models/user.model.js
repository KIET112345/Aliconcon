const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    userId: { type: Number, required: true },
    email: String,
    userName: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);
UserSchema.virtual('getTime').get( ()=> {
  return Date.now();
})
UserSchema.statics.getStatics = () => {
    return "get statics";
}

UserSchema.methods.getMethods = function() {
    return `get methods ${this.getTime}`;
}

UserSchema.statics.generatorOtp = () => {
  const num = Math.floor(Math.random() * (999999 - 10000) + 10000);
  const otp = num.toString();
  return otp;
}
// Middleware
// UserSchema.pre('save', function(next){
//   this.userName = "M30";
//   next();
// })

module.exports = model('users', UserSchema);