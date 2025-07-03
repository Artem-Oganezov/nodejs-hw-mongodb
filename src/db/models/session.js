import { model, Schema, Types } from 'mongoose';
import { User } from './user.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'sessions',
  },
);

export const Session = model('session', sessionSchema);
