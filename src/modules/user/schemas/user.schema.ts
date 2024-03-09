import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { logger } from '../../../config/logger';


/**
 * Represents a user in the system.
 */
export interface User extends mongoose.Document {         
    email: string;    
    password: string;    
    createdAt: Date;
    firstName: string;    
    lastName?: string; 
}
  


/**
 * User schema structure
 */
export const UserSchema = new mongoose.Schema({  
  // User's email, required field and unique
  email: { type: String, required: true, unique: true },
  // Password for the user account, required field
  password: { type: String, required: true, select: false},
  // Timestamp for when the user account was created
  createdAt: { type: Date, default: Date.now },
  // First name of the user, required field
  firstName: { type: String, required: true },
  // Last name of the user, optional field
  lastName: { type: String, required: false },  
  // Roles assigned to the user
  roles: { type: [String], required: true},
});

// Pre-save hook that executes before a User document is saved to the database
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
if (!this.isModified('password')) return next();

try {
    // Generate a salt for hashing
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt and replace the plain text password with the hash
    this.password = await bcrypt.hash(this.password, salt);    
    return next();
} catch (error) {    
    logger.error(`Failed login attempt for user: ${this.email}`);
    return next(error);
}
});


UserSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate() as any;
  
  if (update?.password) {  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(update.password, salt);
      this.setUpdate({ ...update, password: hash });
    } catch (error) {
      return next(error);
    }
  }
  next();
});
