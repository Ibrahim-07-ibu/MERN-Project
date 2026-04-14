import Activity from "../schemas/Activity.js";

export const logActivity = async (req, res) => {
    try {
        const { username, action, type } = req.body;
        const newActivity = new Activity({ username, action, type });
        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getActivities = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        const activities = await Activity.find({ username }).sort({ createdAt: -1 });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
