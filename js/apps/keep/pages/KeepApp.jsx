import { Loader } from '../../../cmps/Loader.jsx';
import { NoteList } from '../cmps/NoteList.jsx';
const { link } = ReactRouterDOM;

export class KeepApp extends React.Component {
	state = {
		notes: null,
	};


	render() {
		const { notes } = this.state;
		// if (!notes) return <Loader />;
		return (
			<section>
				<h1>KeepApp</h1>
				<NoteList notes={notes} />
			</section>
		);
	}
}
