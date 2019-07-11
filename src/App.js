import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.github.com/' });

class App extends Component {
	state = {
		loading: false,
		tags: '00900',
		releases: [],
	};

	componentDidMount() {
		this.handleReleases();
	}

	handleReleases = async () => {
		this.setState({ loading: true });

		try {
			const { data: releases } = await api.get('/repos/DouglasAmarelo/releases-and-tags/releases');

			console.log('releases', releases);

			releases[0].published_at = moment(releases[0].published_at).fromNow();

			console.log('releases', releases);

			this.setState({
				releases
			});
		}
		catch (error) {
			console.log('Error', error);
		}
		finally {
			this.setState({ loading: false });
		}
	};

	render() {
		const { releases, loading } = this.state;

		return (
			<div className="App container">
				<h1>Hello World</h1>


				<p>{this.state.tags}</p>

				<ul>
					{releases && releases.map(item => (
						<li key={item.id}>
							<p>
								<strong>Release: </strong>
								{item.name}
							</p>
							<p>
								<strong>Author: </strong>
								{item.author.login}
								{/* <img src={item.author.avatar_url} alt={item.author.login} /> */}
							</p>
							<p>
								<strong>Publication date: </strong>
								{item.published_at}
							</p>
							<p>
								<strong>Message: </strong>
								{item.body}
							</p>
						</li>
					))}
				</ul>
			</div>
		);
	};
};

export default App;
