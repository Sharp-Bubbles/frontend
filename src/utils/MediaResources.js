import sio from 'socket.io';

class MediaResources {
  constructor(stream) {
    this.stream = stream;
    this.remoteStream;

    this.peer = new RTCPeerConnection();
    this.remotePeer = new RTCPeerConnection();

    this.initSockets();
    this.addListeners();
  }

  initSockets() {
    this.sio = sio('http://0.0.0.0:8000', {path: '/nodejs/socket.io'});
    console.log('server ->>', this.sio)
  }

  initSocketsListeners() {
    this.sio.on('connect')
  }

  setRemoteUsername(username) {
    this.remotePeerUsername = username;
  }

  addListeners() {
    this.peer.addEventListener('icecandidate', this.onIceCandidate.bind(this));
    this.peer.addEventListener('iceconnectionstatechange', this.onIceStateChange.bind(this));
    this.peer.addEventListener('track', this.gotRemoteStream.bind(this))
  }

  gotRemoteStream(e) {
    console.log('remote stream event ->', e);

    if (this.remoteStream !== e.streams[0]) {
      this.remoteStream = e.streams[0];
      console.log('received remote stream!!!');
    }
  }

  openLocalTracks() {
    this.stream.getTracks()
      .forEach(track => this.remotePeer.addTrack(track, this.stream));
  }

  async onIceCandidate(e) {
    try {
      if (e.candidate) {
        this.sio.emit('ice_candidate', { candidate: e.candidate, to: this.remotePeerUsername })
      }
    } catch (err) {
      console.log('failed to add ICE candidate', err);
    }
  }

  onIceStateChange(e) {
    console.log('ICE state', this.peer.iceConnectionState);
    console.log('ICE state change event ->>>', e);
  }

  async call() {
    this.openLocalTracks()
  }

  static initLocalMedia() {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => new this(stream))
      .catch(err => console.error('getUserMedia() error', err))
  }
}

export default MediaResources;