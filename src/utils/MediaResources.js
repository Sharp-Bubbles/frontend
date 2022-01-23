const sio = require('socket.io-client');

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};
class MediaResources {
  constructor(stream, username) {
    this.stream = stream;
    this.remoteStream;

    this.peer = new RTCPeerConnection();
    this.remotePeer = new RTCPeerConnection();

    this.initSockets();
    this.addListeners();
    this.setLocalUsername(username);
  }

  initSockets() {
    this.sio = sio.connect('http://localhost:8000');

    this.initSocketsListeners();
    console.log('server ->>', this.sio)
  }

  initSocketsListeners() {
    this.sio.on('connect', async () => {
      console.log('connected');
      this.sio.emit('add_user', { username: this.localPeerUsername })
    })
    this.sio.on('user_added', data => {
      console.log('user added', data.username);
    })
    this.sio.on('user_disconnected', data => {
      console.log("user disconnected " + data.username)
    })
    
    this.sio.on('call_offered', async data => {
        console.log("call_offered")
        console.log(data)
        await this.acceptCall(data.offer, data.from)
    })
    
    this.sio.on('call_accepted', async data => {
        console.log("call_accepted")
        console.log(data)
        await this.peer.setRemoteDescription(new RTCSessionDescription(data.answer))
    })
    
    this.sio.on('add_ice_candidate', async data => {
        console.log("try to add ice candidate")
        console.log(data.candidate)
        await this.peer.addIceCandidate(new RTCIceCandidate(data.candidate))
    })
    
    this.sio.on('disconnect', () => {
        console.log('disconnected');
    });
  }

  setRemoteUsername(username) {
    this.remotePeerUsername = username;
  }

  setLocalUsername(username) {
    this.localPeerUsername = username;
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
    this.openLocalTracks();
    
    this.offerCall(this.remotePeerUsername)
      .then(() => console.log('call offer sent', this.remotePeer))
  }

  async offerCall() {
    const offer = await this.createOffer();
    this.sio.emit('offer_call', {
      offer,
      to: this.remotePeerUsername
    })
  }

  async acceptCall(offer) {
    const answer = await this.createAnswer(offer);
    sio.emit('accept_call', { answer, with: this.localPeerUsername })
  }

  async createOffer() {
    const offer = await this.peer.createOffer(offerOptions);
    await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }

  async createAnswer(offer) {
    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peer.createAnswer(offerOptions);
    await this.peer.setLocalDescription(new RTCSessionDescription(answer));
    return answer
  }

  static initLocalMedia(username) {
    return navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => new this(stream, username))
      .catch(err => console.error('getUserMedia() error', err))
  }
}

export default MediaResources;