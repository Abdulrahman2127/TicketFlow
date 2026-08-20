import Ticket from "../models/ticket.js"


export const createTicketController = async (req, res) => {
    try {
        const { title, department, description, workspaceId } = req.body;

        if (!title || !department || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTicket = new Ticket({
            title,
            department,
            description,
            workspace: workspaceId,
            user: req.user.id,
        });

        await newTicket.save();

        return res.status(201).json({
            message: "Ticket created successfully",
            ticket: newTicket
        });
        
    } catch (error) {
        console.error("Ticket Creation Error:", error);
        return res.status(500).json({ message: "Server error while creating ticket" });
    }
};