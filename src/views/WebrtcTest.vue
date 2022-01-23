<template>
  <div class="container mx-auto pt-16">
    <div class="text-center font-bold text-2xl">
      <h1>Test for the WebRTC in one tab</h1>
    </div>
    <div class="flex justify-center py-8">
      <div class="px-4">
        <video class="border border-green-400 h-64" playsinline autoplay muted :srcObject.prop="localUserMedia"></video>
        <button class="block border border-red-700 px-16 py-4" @click="stopVideo(localUserMedia)">Turn off camera</button>
      </div>
      <div class="px-4">
        <video ref="targetUser" class="border border-green-400 h-64" playsinline autoplay :srcObject.prop="targetUserMedia"></video>
        <button class="block border border-red-700 px-16 py-4" @click="stopVideo(targetUserMedia)">Turn off camera</button>
      </div>
    </div>
    <div class="flex justify-center">
      <button class="block border border-blue-700 px-16 py-4 text-xl uppercase" @click="call">Call</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WebrtcTest',
  data() {
    return {
      localUserMedia: {},
      targetUserMedia: {},
      localPeerConnection: {},
      targetPeerConnection: {}
    }
  },
  methods: {
    async initWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        // console.log('stream ->', stream);
        this.localUserMedia = stream;
      } catch (e) {
        console.error('getUserMedia() error', e.name);
      }
    },
    async call() {
      // const videoTracks = this.localUserMedia.getVideoTracks();
      // const audioTracks = this.localUserMedia.getAudioTracks();

      // console.log('tracks', videoTracks, audioTracks)

      this.localPeerConnection = new RTCPeerConnection();
      this.localPeerConnection.addEventListener('icecandidate', e => this.onIceCandidate(this.localPeerConnection, e))

      this.targetPeerConnection = new RTCPeerConnection();
      this.targetPeerConnection.addEventListener('icecandidate', e => this.onIceCandidate(this.targetPeerConnection, e))


      console.log('connection', this.localPeerConnection, this.targetPeerConnection)

      this.targetPeerConnection.addEventListener('track', this.gotRemoteStream.bind(this));

      this.localUserMedia.getTracks()
        .forEach(track => this.localPeerConnection.addTrack(track, this.localUserMedia));

      const offer = await this.localPeerConnection.createOffer({offerToReceiveAudio: 1, offerToReceiveVideo: 1});
      console.log('offer', offer.sdp);
      await this.onCreateOfferSuccess(offer);
    },
    gotRemoteStream(e) {
      if (this.targetUserMedia !== e.streams[0]) {
        this.targetUserMedia = e.streams[0];
      }
    },
    async onCreateOfferSuccess(desc) {
      await this.localPeerConnection.setLocalDescription(desc);
      await this.targetPeerConnection.setRemoteDescription(desc);

      const answer = await this.targetPeerConnection.createAnswer();
      console.info('answer', answer)
      await this.onCreateAnswerSuccess(answer);
    },
    async onCreateAnswerSuccess(desc) {
      await this.targetPeerConnection.setLocalDescription(desc);
      await this.localPeerConnection.setRemoteDescription(desc);
    },
    async onIceCandidate(peer, event) {
      if (peer === this.targetPeerConnection) {
        this.localPeerConnection.addIceCandidate(event.candidate);
      } else if (peer === this.localPeerConnection) {
        this.targetPeerConnection.addIceCandidate(event.candidate);
      }
    },
    stopVideo(stream) {
      stream.getTracks()
        .forEach(track => track.stop());
      // this.localPeerConnection.close();
    }
  },
  mounted() {
    this.initWebcam();
  }
}
</script>