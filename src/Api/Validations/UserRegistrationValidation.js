const yup =require ("yup")

const UserBioSchema= yup.object({
    UserName:yup.string().required('username is required').min(6,'UserName must be at least 6 letters ').max(12,'max username length is 12 letters'),
    Email: yup.string().required('email is required ').email('invalid email format'),
    Password:yup.string().required('password is required').min(8,'Password must be at least 8 characters ')
})

module.exports=UserBioSchema