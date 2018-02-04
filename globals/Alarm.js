import { Audio } from 'expo'

class Alarm {
    constructor() {
      this.soundObject = new Expo.Audio.Sound();
      this.soundObject.loadAsync(require('../assets/sounds/alarm.mp3'));
    }

    async play() {
      try {
        await this.soundObject.playAsync();
      } catch (error) {

      }
    }

    async stop() {
      try {
        await this.soundObject.stopAsync();
      } catch (error) {

      }
    }
}

let alarm = new Alarm();

export default alarm;