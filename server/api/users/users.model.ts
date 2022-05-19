import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseUniqueValidator from "mongoose-unique-validator";
import * as bcrypt from "bcryptjs";

// console.log("mongoosePaginate", mongoosePaginate());

const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

const GENDERS = {
  FEMALE: "female",
  MALE: "male",
  OTHER: "other",
};

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 4,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(GENDERS),
      default: GENDERS.OTHER,
    },
    birthday: {
      type: Date,
    },
    about: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
    },

    services: {
      facebook: {
        id: String,
        token: String,
      },
      google: {
        id: String,
        token: String,
      },
      apple: {
        id: String,
        token: String,
      },
    },
    avatar: {
      type: String,
      required: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  const password = this.password;
  if (this.isModified("password")) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    this.password = passwordHash;
  }
});

UserSchema.methods = {
  verifyPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
  toJSON: function () {
    const obj = this.toObject({ virtuals: true });
    obj.hasPassword = !!obj.password;
    delete obj.password;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpires;
    return obj;
  },
  isAdmin: function () {
    return this.role === ROLES.ADMIN;
  },
};

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("User", UserSchema);
