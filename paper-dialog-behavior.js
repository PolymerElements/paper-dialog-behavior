import '../polymer/polymer.js';
import { IronOverlayBehavior } from '../iron-overlay-behavior/iron-overlay-behavior.js';
import { dom } from '../polymer/lib/legacy/polymer.dom.js';

export const PaperDialogBehaviorImpl = {

  hostAttributes: {
    'role': 'dialog',
    'tabindex': '-1'
  },

  properties: {

    /**
     * If `modal` is true, this implies `no-cancel-on-outside-click`, `no-cancel-on-esc-key` and `with-backdrop`.
     */
    modal: {
      type: Boolean,
      value: false
    },

    __readied: {
      type: Boolean,
      value: false
    }

  },

  observers: [
    '_modalChanged(modal, __readied)'
  ],

  listeners: {
    'tap': '_onDialogClick'
  },

  ready: function() {
    // Only now these properties can be read.
    this.__prevNoCancelOnOutsideClick = this.noCancelOnOutsideClick;
    this.__prevNoCancelOnEscKey = this.noCancelOnEscKey;
    this.__prevWithBackdrop = this.withBackdrop;
    this.__readied = true;
  },

  _modalChanged: function(modal, readied) {
    // modal implies noCancelOnOutsideClick, noCancelOnEscKey and withBackdrop.
    // We need to wait for the element to be ready before we can read the
    // properties values.
    if (!readied) {
      return;
    }

    if (modal) {
      this.__prevNoCancelOnOutsideClick = this.noCancelOnOutsideClick;
      this.__prevNoCancelOnEscKey = this.noCancelOnEscKey;
      this.__prevWithBackdrop = this.withBackdrop;
      this.noCancelOnOutsideClick = true;
      this.noCancelOnEscKey = true;
      this.withBackdrop = true;
    } else {
      // If the value was changed to false, let it false.
      this.noCancelOnOutsideClick = this.noCancelOnOutsideClick &&
        this.__prevNoCancelOnOutsideClick;
      this.noCancelOnEscKey = this.noCancelOnEscKey &&
        this.__prevNoCancelOnEscKey;
      this.withBackdrop = this.withBackdrop && this.__prevWithBackdrop;
    }
  },

  _updateClosingReasonConfirmed: function(confirmed) {
    this.closingReason = this.closingReason || {};
    this.closingReason.confirmed = confirmed;
  },

  /**
   * Will dismiss the dialog if user clicked on an element with dialog-dismiss
   * or dialog-confirm attribute.
   */
  _onDialogClick: function(event) {
    // Search for the element with dialog-confirm or dialog-dismiss,
    // from the root target until this (excluded).
    var path = dom(event).path;
    for (var i = 0, l = path.indexOf(this); i < l; i++) {
      var target = path[i];
      if (target.hasAttribute && (target.hasAttribute('dialog-dismiss') || target.hasAttribute('dialog-confirm'))) {
        this._updateClosingReasonConfirmed(target.hasAttribute('dialog-confirm'));
        this.close();
        event.stopPropagation();
        break;
      }
    }
  }

};

export const PaperDialogBehavior = [IronOverlayBehavior, PaperDialogBehaviorImpl];
