import {taskModule} from './taskModel'

const PubSub = require('./pubsub.js')
const taskView = require('./taskView')

const content = document.querySelector('.content');
content.classList.toggle('container');

