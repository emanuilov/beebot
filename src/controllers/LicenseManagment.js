import $ from 'jquery';
import config from '../config';

export default class ManageLicense {
	constructor(licenseKey) {
		this.licenseKey = licenseKey.trim();
		return this.startValidation();
	}

	async startValidation() {
		const request = await this.validateKey();
		if (request.status === 200) {
			this.activate(request);
		}
		return request.status;
	}

	activate(request) {
		localStorage.setItem('expiration', request.expiration);
		localStorage.setItem('mac', request.mac);
	}

	async validateKey() {
		let response;
		await $.ajax({
			beforeSend: xhr => {
				xhr.setRequestHeader('Authorization', config.AUTH);
			},
			url: config.REST,
			type: 'PUT',
			data: {
				action: 1,
				licenseKey: this.licenseKey,
				macAddress: window.MAC
			},
			success: async (res, textStatus, xhr) => {
				response = { status: await xhr.status, expiration: res, mac: window.MAC };
			}
		}).catch(err => {
			response = { status: err.status };
		});
		return response;
	}
}
