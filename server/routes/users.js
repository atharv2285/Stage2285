import express from 'express';
import { findUserById, findUserByUsername, updateUser } from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let user;

    if (isNaN(identifier)) {
      user = await findUserByUsername(identifier);
    } else {
      user = await findUserById(parseInt(identifier));
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updates = req.body;
    const user = await updateUser(parseInt(id), updates);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/setup', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const setupData = req.body;

    const user = await updateUser(userId, setupData);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Setup user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
