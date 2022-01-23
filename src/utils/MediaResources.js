class MediaResources {
  constructor(stream) {
    this.stream = stream;
  }

  static initLocalMedia() {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => new this(stream))
      .catch(err => console.error('getUserMedia() error', err))
  }
}

export default MediaResources;