import bcryptjs from "bcryptjs";
import { User } from "../models/user_model.js";
import { generate_token } from "../utils/generate_token_and_cookies.js";

export const adminUser = async (req, res) => {
    try {
        const users = [
            {
                name: "Elijah",  // Changed from userName to name
                email: "elijahfx43@gmail.com",
                password: "07010057350Pe*",
                isAdmin: true
            },
        ];

        const createdUsers = [];  

        // Iterate over users array to handle multiple users
        for (const user of users) {
            const hashedPassword = await bcryptjs.hash(user.password, 10); 
            const newUser = new User({
                name: user.name,  // Updated key to name
                email: user.email,
                password: hashedPassword,
                isAdmin: user.isAdmin
            });
            await newUser.save();
            createdUsers.push(newUser);  
        }

        // Generate token and set cookie for the last user after all users are created
        await generate_token(res, createdUsers[createdUsers.length - 1]._id);

        // Send the response after setting the cookie
        res.status(201).json({ message: 'Admin user(s) created successfully!', createdUsers });

    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ message: 'Failed to create admin user.' });
    }
};
