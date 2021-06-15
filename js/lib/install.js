export class Install {
    /**
     * @param {DOMElement} trigger - Triggering element
     */
    constructor(trigger) {
      this._prompt;
      this._trigger = trigger;
    }
  
    /**
     * Toggle visibility of install button
     * @param {string} action
     */
    toggleInstallButton(action = 'hide') {
      if (action === 'hide') {
        this._trigger.style.display = 'none';
      } else {
        this._trigger.style.display = 'block';
      }
    }
  }