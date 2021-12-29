import { Loader } from '../../../cmps/Loader.jsx';
import { noteService } from '../services/note.service.js';
import { eventBusService } from '../../../services/event-bus.service.js';

const { Link } = ReactRouterDOM;

export class NoteDetails extends React.Component {
	state = {
		note: null,
	};

	componentDidMount() {
		this.loadNote();
	}

	loadNote = () => {
		const { noteId } = this.props.match.params;
		noteService.getNoteById(noteId).then((note) => {
			if (!note) return this.props.history.push('/');
			this.setState({ note });
		});
	};

	onGoBack = () => {
		this.props.history.push('/keep');
	};

	onRemoveCar = () => {
		const { id } = this.state.note;
		noteService.removeNote(id).then(() => {
			eventBusService.emit('user-msg', {
				txt: 'Note deleted!',
				type: 'danger',
			});
			this.onGoBack();
		});
	};

	render() {
		const { note } = this.state;
		if (!note) return <Loader />;
		return (
			<section className="note-details">
				<Link
					className="primary-btn clean-link"
					to={`/car/edit/${car.id}`}>
					Edit car
				</Link>
				<h2>Vendor: {car.vendor}</h2>
				<h2>Speed: {car.speed}</h2>
				<p>{car.desc}</p>
				<button className="primary-btn" onClick={this.onGoBack}>
					Go back
				</button>
				<button className="primary-btn" onClick={this.onRemoveCar}>
					Remove car
				</button>
				<Link
					className="primary-btn clean-link"
					to={`/car/${carService.getNextCarId(car.id)}`}>
					Next car
				</Link>
			</section>
		);
	}
}
