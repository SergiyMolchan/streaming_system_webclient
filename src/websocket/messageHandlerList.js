import webRTCService from "../webrtc/webrtcService";

export default {
    'webrtc-answer': answer => webRTCService.setAnswer(answer)
}