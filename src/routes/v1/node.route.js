const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const nodeValidation = require('../../validations/node.validation');
const nodeController = require('../../controllers/node.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(auth(), nodeValidation.createNode), nodeController.createNode)
  .get(validate(auth(), nodeValidation.getAllNode), nodeController.getAllNode);

router
  .route('/:id')
  .get(validate(auth(), nodeValidation.getNode), nodeController.getNode)
  .patch(validate(auth(), nodeValidation.updateNode), nodeController.updateNode)
  .delete(validate(auth(), nodeValidation.deleteNode), nodeController.deleteNode);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Nodes
 *   description: Node management and retrieval
 */

/**
 * @swagger
 * /nodes:
 *   post:
 *     summary: Create a node
 *     description: Only admins can create other nodes.
 *     tags: [Nodes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nodeName
 *               - parentNode
 *             properties:
 *               nodeName:
 *                 type: string
 *               parentNode:
 *                 type: string
 *             example:
 *               nodeName: first name
 *               parentNode: last name
 *     responses:
 *       "201":
 *         description: Node Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Node'
 *       "400":
 *         $ref: '#/components/responses/DuplicateNodeName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /nodes:
 *   get:
 *     summary: Get all nodes
 *     description: Only admins can retrieve all nodes.
 *     tags: [Nodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nodeName
 *         schema:
 *           type: string
 *         description: Node name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Node role
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
 *         description: Maximum number of nodes
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
 *                     $ref: '#/components/schemas/Node'
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
 * /nodes/{id}:
 *   get:
 *     summary: Get a node
 *     description: Logged in nodes can fetch only their own node information. Only admins can fetch other nodes.
 *     tags: [Nodes]
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
 *                $ref: '#/components/schemas/Node'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /nodes/{id}:
 *   patch:
 *     summary: Update a node
 *     description: Logged in nodes can only update their own information. Only admins can update other nodes.
 *     tags: [Nodes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nodeName:
 *                 type: string
 *               parentNode:
 *                 type: string
 *             example:
 *               nodeName: first name
 *               parentNode: last name
 *     responses:
 *       "200":
 *         description: OK,Node is Updated Successfully!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Node'
 *       "400":
 *         $ref: '#/components/responses/DuplicateNodeName'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /nodes/{id}:
 *   delete:
 *     summary: Delete a node
 *     description: Logged in nodes can delete only themselves. Only admins can delete other nodes.
 *     tags: [Nodes]
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
 *         description: Node is Deleted Successfully!
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
