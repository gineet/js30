class DrumKit {
  constructor() {
    this.#init();
  }

  /**
   * Handles the keydown event for the event listener attached to window object
   * 
   * @remarks
   * Unlike the keypress event, the keydown event is fired for all keys,
   * regardless of whether it produces a character value or not.
   * 
   * @param event - The fired keydown event
   */
  #keydownHandler(event: KeyboardEvent) {
    const { code: keyCode } = event;
    this.#handleAudioPlayback(keyCode);
  }

  /**
   * Checks if there is an audio element with data-code attribute equal to the keyCode param
   * Returns if it doesn't find it, else handles the audio element playback and triggers the
   * key animation by invoking the method handleKeyAnimation.
   * 
   * @remarks
   * When an audio element is playing already and we call .play() on it, it doens't do anything.
   * For that reason, also resets the seek time by setting currentTime to 0, to handle playing the sound again.
   * 
   * @param keyCode - event.code for the fired keydown event
   */
  #handleAudioPlayback(keyCode: string) {
    const audioElement = document.querySelector(`audio[data-code="${keyCode}"]`) as HTMLAudioElement | null;
    if (!audioElement) {
      return;
    }

    audioElement.currentTime = 0;
    audioElement.play();
    this.#handleKeyAnimation(keyCode);
  }


  /**
   * Adds the playing class to the HTMLDivElement associated with the pressed key.
   * 
   * @param keyCode - event.code for the fired keydown event
   * 
   */
  #handleKeyAnimation(keyCode: string) {
    const pressedKey = document.querySelector(`div.key[data-code="${keyCode}"]`) as HTMLDivElement;
    pressedKey.classList.add('playing');
  }

  /**
   * Sets up the transitionend event listeners on all keys, to remove the transition effects
   * and set the key's back to its default state from the transitioned state.
   * 
   */
  #setupKeyTransitionEnd() {
    const allKeyElements = document.querySelectorAll('div.key') as NodeListOf<HTMLDivElement>;
    allKeyElements.forEach((keyElement) => {
      keyElement.addEventListener('transitionend', this.#handleTransitionEnd);
    })
  }

  /**
   * All transitioned properties fire an event, although we want to handle when the transform completes.
   * When it does, simply removes the playing class from classList
   * 
   * @param this - Automatically passed reference to the element on which the event occurred
   * @param event - TransitionEvent 
   * 
   */
  #handleTransitionEnd(this: HTMLDivElement, event: TransitionEvent) {
    if (event.propertyName !== 'transform') {
      return;
    }

    this.classList.remove('playing');
  }

  #init() {
    window.addEventListener('keydown', this.#keydownHandler.bind(this));
    this.#setupKeyTransitionEnd();
  }
}

new DrumKit();
