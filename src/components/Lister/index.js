import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';
import Loader from '../Loader/Loader';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	useEffect(() => {
		getPosts().then(data => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	/* code added */
	const noPosts = allPosts.length === 0;

	const onDeletePost = (id) => {
		/* code added */
		setPosts(allPosts.filter((post) => post.id !== id));
	};

	const onCreatePost = (post) => {
		/* code added */
		setPosts((prev) => [...prev, post]);
	};
	/* code added */
	return (
		<div className="postList">
			{loading ? (
				<Loader />
			) : (
				<div className="postList__inner">
					<CreatePost onCreate={onCreatePost} />
					<div>
						{allPosts.map((post) => (
							<Post
								key={`${post.title}-${post.author}`}
								{...post}
								onDelete={() => onDeletePost(post.id)}
							/>
						))}
						{noPosts && !loading && (
							<h3 className="text--info">No posts available...</h3>
						)}
					</div>
				</div>
			)}
		</div>
	)
};

export default Lister;