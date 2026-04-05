import mongoose from "mongoose"

const userProfileSchema=new mongoose.Schema({
    user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // reference to Users collection
          required: true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true

    }
 } ,{timestamps:true} 
  )

  export default mongoose.model("UserProfile",userProfileSchema)