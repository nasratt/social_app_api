import getUserFriends from '../services/getUserFriends.js';
import sendRequest from '../services/sendRequest.js';

const sendFriendRequest = async (req, res) => {
  const {
    recieverId,
    tokenData: { id }
  } = req.body;

  try {
    const result = await sendRequest(id, recieverId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getAllFriends = async (req, res) => {
  try {
    const result = await getUserFriends(req.body.tokenData.id);

    if (!result.success) throw new Error(result.message);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { getAllFriends, sendFriendRequest };
