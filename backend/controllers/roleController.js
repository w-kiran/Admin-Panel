import prisma from "../utils/db.js"

export const updateRole = async (req, res) => {
    const { targetUserId, role: newRole } = req.body; 
    const Me = req.user; 

    try {
        const targetUser = await prisma.user.findUnique({
            where: { id: targetUserId },
        });

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        if (Me.id === targetUserId) {
            return res.status(403).json({ message: 'You cannot change your own role.', success: false });
        }

        if (Me.role === 'SUPERADMIN') {
            if (!['ADMIN', 'USER'].includes(newRole)) {
                return res.status(400).json({ message: 'Invalid role assignment.', success: false });
            }
        } else if (Me.role === 'ADMIN') {
            if (newRole !== 'USER' || targetUser.role !== 'USER') {
                return res.status(403).json({ message: 'Admins can only manage users.', success: false });
            }
        } else {
            return res.status(403).json({ message: 'Unauthorized: insufficient permissions.', success: false });
        }

        // Update role
        const updatedUser = await prisma.user.update({
            where: { id: targetUserId },
            data: { role: newRole },
        });

        return res.status(200).json({
            message: `User role updated to ${newRole}`,
            success: true,
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            },
        });
    } catch (err) {
        console.error('Error updating role:', err);
        return res.status(500).json({ message: 'Server error', success: false });
    }
};
