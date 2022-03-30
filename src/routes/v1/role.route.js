const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(auth(), roleValidation.createRole), roleController.createRole)
  .get(validate(auth(), roleValidation.getAllRole), roleController.getAllRole);

router
  .route('/:id')
  .get(validate(auth(), roleValidation.getRole), roleController.getRole)
  .patch(validate(auth(), roleValidation.updateRole), roleController.updateRole)
  .delete(validate(auth(), roleValidation.deleteRole), roleController.deleteRole);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management and retrieval
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a role
 *     description: Only admins can create other roles.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleName
 *               - roleTitle
 *               - description
 *             properties:
 *               roleName:
 *                 type: string
 *               roleTitle:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               roleName: Role
 *               roleTitle: Manager
 *               description: visit again
 *     responses:
 *       "201":
 *         description: Node Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Role'
 *       "400":
 *         $ref: '#/components/responses/DuplicateRoleName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     description: Only admins can retrieve all roles.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: roleName
 *         schema:
 *           type: string
 *         description: Role name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Role type
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of roles
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role
 *     description: Logged in nodes can fetch only their own role information. Only admins can fetch other roles.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Node id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Role'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /roles/{id}:
 *   patch:
 *     summary: Update a role
 *     description: Logged in roles can only update their own information. Only admins can update other roles.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *               roleTitle:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               roleName: Role2
 *               roleTitle: Senior Manager
 *               description: VIsit again
 *     responses:
 *       "200":
 *         description: OK,Role is Updated Successfully!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Role'
 *       "400":
 *         $ref: '#/components/responses/DuplicateRoleName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     description: Logged in roles can delete only themselves. Only admins can delete other roles.
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role id
 *     responses:
 *       "200":
 *         description: Role is Deleted Successfully!
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
