const { User } = require("../config").models;
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    try {
        const isAdmin = req.user && req.user.is_admin;

        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByUid = async (req, res) => {
    try {
        const isAdmin = req.user && req.user.is_admin;

        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userUid = req.params.uid;
        const user = await User.findOne({ where: { uid: userUid } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        // Only allow admin to set is_admin and role
        const { is_admin, role, ...userData } = req.body;

        // Check if the user is an admin
        const isAdmin = req.user && req.user.is_admin;

        // If user is not an admin and trying to set is_admin or role, deny the request
        if (!isAdmin && (is_admin || role)) {
            return res
                .status(401)
                .json({ message: "Unauthorized to set is_admin or role" });
        }

        const { email, username, password } = userData;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            // Only set is_admin and role if user is an admin
            ...(isAdmin && { is_admin }),
            ...(isAdmin && { role }),
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// const updateUser = async (req, res) => {
//     try {
//         const user = await User.findOne({ where: { uid: req.params.uid } });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         await user.update(req.body);
//         res.json(user);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

const deleteUser = async (req, res) => {
    try {
        const userUid = req.params.uid;
        const currentUserUid = req.user.uid; // UID of the user making the request
        const isAdmin = req.user && req.user.is_admin;

        // Find the user to be deleted
        const userToDelete = await User.findOne({ where: { uid: userUid } });

        // If user not found, return 404
        if (!userToDelete) {
            return res.status(404).json({ message: "User not found" });
        }

        // If the user is trying to delete another user
        if (userUid !== currentUserUid) {
            // If not an admin, return unauthorized
            if (!isAdmin) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const permanentDelete = req.query.permanent === "true";
            if (permanentDelete) {
                // Hard delete if permanent=true
                await userToDelete.destroy({ force: true });
                return res.json({ message: "User permanently deleted" });
            } else {
                // Soft delete otherwise
                userToDelete.destroy();
                await userToDelete.save();
                return res.json({ message: "User deleted" });
            }
        } else {
            // If the user is deleting himself
            // Soft delete
            userToDelete.destroy();
            await userToDelete.save();
            return res.json({ message: "User deleted" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserByUid,
    createUser,
    // updateUser,
    deleteUser,
};
