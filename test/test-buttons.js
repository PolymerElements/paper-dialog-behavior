import '../../polymer/polymer.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <button dialog-dismiss="" id="dismiss">dismiss</button>
    <button dialog-confirm="" id="confirm">confirm</button>
`,

  is: 'test-buttons'
});
