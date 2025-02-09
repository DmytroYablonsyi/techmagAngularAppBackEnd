import bcrypt from 'bcryptjs'

export const adminUser = [
    {
        name: "Dmytro",
        email : "admin_dmytro@gmail.com",
        password: bcrypt.hashSync('123456', 10),
    }
]