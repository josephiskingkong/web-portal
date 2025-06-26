import { Router } from 'express';
import { createTag } from '../controllers/tag.controller';

const router = Router();

/**
 * @swagger
 * /api/tags/:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     description: Create a new tag.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - slug
 *             properties:
 *               title:
 *                 type: string
 *                 example: "JavaScript"
 *               slug:
 *                 type: string
 *                 example: "javascript"
 *               description:
 *                 type: string
 *                 example: "Programming language for web development."
 *     responses:
 *       '201':
 *         description: Tag created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag created"
 *                 tag:
 *                   $ref: '#/components/schemas/Tag'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/', createTag);

export default router;
