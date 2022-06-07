import mongoose from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import mongooseUniqueValidator from "mongoose-unique-validator";
import * as bcrypt from "bcrypt";

const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

const GENDERS = {
  FEMALE: "female",
  MALE: "male",
  OTHER: "other",
};

interface IService {
  id: string;
  token: string;
}

interface IUser extends mongoose.Document {
  role: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  gender: string;
  birthday?: Date;
  about: string;
  username?: string;
  services?: {
    facebook: IService;
    google: IService;
    apple: IService;
  };
  avatar?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isPremium: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
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
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 4,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
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
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
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
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    // validateModifiedOnly: true,
  } // as any
); // TODO: FIX validator

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

UserSchema.plugin(mongoosePagination);
UserSchema.plugin(mongooseUniqueValidator);

export default mongoose.model<IUser, Pagination<IUser>>(
  "user",
  UserSchema,
  "users"
);
