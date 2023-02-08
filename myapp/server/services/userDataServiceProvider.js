
import userModel from "../models/userModel"
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { token } from "morgan"
import bcrypt from 'bcrypt'
export class UserDataServiceProvider {
    async createUser(userObject) {
        const newUser = new userModel(userObject)
        const saltRounds = 10
        // newUser.setPassword(userObject.password)
        const hasedpassword=await bcrypt.hash(userObject.password,saltRounds)
        newUser.password = hasedpassword
    
        await newUser.save()
        return newUser
    }
    async signIn(signInObject) {
        const user = await userModel.findOne({ email: signInObject.email });
   
        const client = await bcrypt.compare(signInObject.password,user.password)
        console.log(client)
        return user
       
      }
      
      
}

export default new UserDataServiceProvider();