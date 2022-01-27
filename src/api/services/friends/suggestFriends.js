import mongoose from 'mongoose';

import User from '../../models/user.model.js';
import APIError from '../../helpers/apiError.js';

const { ObjectId } = mongoose.Types;

/* Uses mongoDB aggregation to find the friends of user's
 * friends, this may include mutual friends and the user
 * itself also, which is not ideal for suggestions, hence
 * they are filtered out by 2 match stages. Then, suggestions
 * of user is replace with user document and after prjection
 * it is returned.
 */

/**
 * Finds friend suggestions for a user
 * @param {String} userId ID of user to which suggestions are given
 * @param {Number} page Page number, default is 1
 * @param {Number} limit Number of results per page, default is 50
 * @returns {Array} Array of friend suggestions
 */
const suggestFriends = async (userId, page = 1, limit = 50) => {
  if (!mongoose.isValidObjectId(userId))
    throw new APIError(400, 'Invalid user ID provided');

  const suggestions = await User.aggregate([
    {
      $match: {
        _id: ObjectId(userId)
      }
    },
    {
      $graphLookup: {
        from: 'users',
        startWith: '$friends',
        connectFromField: 'friends',
        connectToField: '_id',
        as: 'suggestions',
        maxDepth: 1
      }
    },
    {
      $unwind: {
        path: '$suggestions',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        $expr: {
          $not: {
            $in: ['$suggestions._id', '$friends']
          }
        }
      }
    },
    {
      $match: {
        $expr: {
          $not: {
            $in: ['$suggestions._id', [ObjectId(userId)]]
          }
        }
      }
    },
    { $replaceRoot: { newRoot: '$suggestions' } },
    {
      $project: {
        email: false,
        hash: false,
        verified: false,
        inRequests: false,
        outRequests: false,
        blocked: false,
        createdAt: false,
        updatedAt: false,
        __v: false
      }
    },
    { $skip: (page - 1) * limit },
    { $limit: limit }
  ]).exec();

  return suggestions;
};

export default suggestFriends;
