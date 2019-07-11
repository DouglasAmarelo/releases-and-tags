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
		this.handleData();
	}

	handleData = async () => {
		this.setState({ loading: true });

		try {
			const { data: releases } = await api.get('/repos/DouglasAmarelo/releases-and-tags/releases');

			releases.published_at = moment(releases.published_at).fromNow();
			releases.lorem = 'Lorem ipsum';

			this.setState({
				loading: true,
				releases: releases
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
		const { releases } = this.state;

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
								<img src={item.author.avatar_url} alt={item.author.login} />
							</p>
							<p>
								<strong>Publication date: </strong>
								{item.published_at}
								{moment(item.published_at).fromNow()}
							</p>
							<p>
								<strong>Message: </strong>
								{item.body}
							</p>
							<p>{item.lorem}</p>
						</li>
					))}
				</ul>
			</div>

		);
	};
};

export default App;
