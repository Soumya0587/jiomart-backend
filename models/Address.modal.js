const mongoose=require("mongoose")

const AddressSchema=mongoose.Schema({
    mobile:{type:Number,isrequired:true},
    address:{type:String,isrequired:true},
    houseNo:{type:String,isrequired:true},
    building:{type:String,isrequired:true},
    pincode:{type:Number,isrequired:true},
    landmark:{type:String,isrequired:false},
    city:{type:String,isrequired:true},
    state:{type:String,isrequired:false},
    userId:{type:String,isrequired:true}
},{
    versionKey:false
})
const AddressModel=mongoose.model('address',AddressSchema)

module.exports=AddressModel