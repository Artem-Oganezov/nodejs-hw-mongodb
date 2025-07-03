import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model('user', userSchema);
