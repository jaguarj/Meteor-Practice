import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';


import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
});

Template.body.helpers({
	tasks() {
		return Tasks.find({}, { sort: { createdAt: -1 } });
	},
});

Template.body.events({
	'submit .new-task'(event) {
		event.preventDefault();

		const target = event.target;
		const text = target.text.value;

		Tasks.insert({
			text,
			createdAt: new Date(),
		});

		target.text.value = '';
	},
});


