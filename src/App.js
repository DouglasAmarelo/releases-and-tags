import React, { Component } from 'react';
import ax from 'axios';

class App extends Component {
	state = {
		tags: '00900',
		releases: [],
	};

	componentDidMount() {
		console.log('Iniciando....');
		this.handleData();
	}

	handleData = async () => {
		try {
			const api = ax.create({ baseURL: 'https://api.github.com/' });
			const data = await api.get('/repos/DouglasAmarelo/releases-and-tags/releases');

			this.setState({ releases: data.data });

			console.log('releases', data.data[0]);
		}
		catch (error) {
			// this.setState({ repositoryError: true });

			console.log('Error', error);
		}
		// finally {
		// 	this.setState({ loading: false });
		// }
	};


	render() {
		return (
			<div className="App container">
				<h1>Hello World</h1>
				<p>{this.state.tags}</p>
				<ul>
					{
						this.state.releases.map(item => (
							<li>{item}</li>
						))
					}
				</ul>
			</div>

		);
	};
};

export default App;
