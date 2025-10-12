import { SITE } from './config.js';
import { init } from './init.js';

function start() { init(SITE); }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
