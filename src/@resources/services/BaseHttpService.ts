import { environment } from './../../environment/environment';
import axios from 'axios';

export default axios.create({
	baseURL: `${environment.url}`,
	headers: {
	}
})
