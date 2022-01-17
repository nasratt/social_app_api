const getAllFriends = async (req, res) => {
  try {
    const result = await getUserFriends(req.body.tokenData.id);

    if (!result.success) throw new Error(result.message);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import getUserFriends from '../services/getUserFriends.js';

export { getAllFriends };
