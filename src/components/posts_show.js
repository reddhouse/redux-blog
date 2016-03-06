import React, { Component, PropTypes } from 'react';
import { connect } from  'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';


class PostsShow extends Component {

	// Establish access to this.context.router inside of our component
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
			.then(() => {
				// Blog post has been deleted, navigate the user to the index
				// We navigate by calling this.context.router.push with the 
				// new path to which we'll navigate
				this.context.router.push('/');
			});
	}

	render() {
	{/*
		Need an "Ajax Spinner" for in between when me make the request,
		and when the data is acutally loaded"
	*/}
		if (!this.props.post) {
			return <div>Loading...</div>
		}

		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button 
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}>
					Delete Post
				</button>
				<h3>{this.props.post.title}</h3>
				<h6>Categories: {this.props.post.categories}</h6>
				<p>{this.props.post.content}</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost }) (PostsShow);
