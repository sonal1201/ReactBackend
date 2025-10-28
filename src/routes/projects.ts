import express, { Response } from 'express';
import prisma from '../prisma.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all projects for the current user
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.userId },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single project
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectID format (24 hex characters)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (!isValidObjectId) {
      return res.status(400).json({ error: 'Invalid project ID format' });
    }

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new project
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, files } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description: description || '',
        files: files || {},
        userId: req.userId!,
      },
    });

    res.status(201).json({ project });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a project
router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, files } = req.body;

    // Validate MongoDB ObjectID format
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (!isValidObjectId) {
      return res.status(400).json({ error: 'Invalid project ID format' });
    }

    // Verify project belongs to user
    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existingProject.name,
        description: description !== undefined ? description : existingProject.description,
        files: files !== undefined ? files : existingProject.files,
      },
    });

    res.json({ project });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a project
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectID format
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (!isValidObjectId) {
      return res.status(400).json({ error: 'Invalid project ID format' });
    }

    // Verify project belongs to user
    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

