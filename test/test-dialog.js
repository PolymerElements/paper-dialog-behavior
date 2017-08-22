import '../../polymer/polymer.js';
import { PaperDialogBehavior } from '../paper-dialog-behavior.js';
import '../paper-dialog-shared-styles.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <style include="paper-dialog-shared-styles"></style>
    <slot></slot>
`,

  is: 'test-dialog',

  behaviors: [
    PaperDialogBehavior
  ]
});
