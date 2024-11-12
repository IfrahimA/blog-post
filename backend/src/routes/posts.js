import {
	createPost,
	deletePost,
	updatePost,
	getPostById,
	listAllPosts,
	listPostsByTag,
	listPostsByAuthor,
} from '../services/posts.js';

import express from 'express';

export const router = express.Router();

router.get('/v1/posts', async (req, res) => {
	const { sortBy, sortOrder, author, tag } = req.query;
	const options = { sortBy, sortOrder };

	try {
		if (author && tag) {
			return res
				.status(400)
				.json({ error: 'query by either author or tag, not both' });
		} else if (author) {
			return res.json(await listPostsByAuthor(author, options));
		} else if (tag) {
			return res.json(await listPostsByTag(tag, options));
		} else {
			return res.json(await listAllPosts(options));
		}
	} catch (error) {
		console.error('error listing posts', error);
		return res.status(500).end();
	}
});

router.get('/v1/posts/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const post = await getPostById(id);
		if (post === null) {
			return res.status(404).end();
		} else {
			return res.json(post);
		}
	} catch (error) {
		console.error('error getting post', error);
		return res.status(500).end();
	}
});

router.post('/v1/posts', async (req, res) => {
	try {
		const post = await createPost(req.body);
		return res.json(post);
	} catch (error) {
		console.error('error creating post', error);
		return res.status(500).end();
	}
});

router.patch('/v1/posts/:id', async (req, res) => {
	try {
		const post = await updatePost(req.params.id, req.body);
		return res.json(post);
	} catch (error) {
		console.error('error updating post', err);
		return res.status(500).end();
	}
});

router.delete('/v1/posts/:id', async (req, res) => {
	try {
		const { deletedCount } = await deletePost(req.params.id);
		if (deletedCount === 0) return res.sendStatus(404);
		return res.status(204);
	} catch (error) {
		console.error('error deleting post', error);
		return res.status(500).end();
	}
});
