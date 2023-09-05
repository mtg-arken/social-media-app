const yup =require ("yup")

const UserBioSchema= yup.object({
    bio: yup.string().min(5,"it should be 5 letters at least ").required()
})

module.exports=UserBioSchema