class WebrtcService {
    constructor() {
        this.peerConnection = new RTCPeerConnection();
        this.offer = undefined;
        this.onTrack = undefined;
        this.setEventHandlers();
    }

    async connect() {
        this.offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(this.offer);
    }

    get getOffer() {
        return this.offer;
    }

    setAnswer(answer) {
        console.log(answer);
        this.peerConnection.setRemoteDescription(answer);
        this.createDateChannel();
    }

    setEventHandlers() {
        this.peerConnection.onicecandidate = event => this.onICECandidate(event);
        this.peerConnection.ontrack = event => this.onTrack(event);
    }

    onICECandidate(event) {
        this.offer = this.peerConnection.localDescription;
    }

    addTrack(track, localStream) {
        return this.peerConnection.addTrack(track, localStream);
    }

    setOnTrack(callback) {
        this.onTrack = callback;
    }

    createDateChannel() {
        const dataChannel = this.peerConnection.createDataChannel('test');
        dataChannel.onopen = () => console.log('data channel is opened')
        dataChannel.onerror = error => console.error('channel error: ', error)
        dataChannel.onmessage  = e => console.log('channel message: ', e.data)
        return dataChannel;
    }
}

export default new WebrtcService();