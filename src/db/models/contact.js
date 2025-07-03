import { model, Schema, Types } from 'mongoose';
import { User } from './user.js';

const contactSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'contacts',
  },
);

export const Contact = model('Contact', contactSchema);
