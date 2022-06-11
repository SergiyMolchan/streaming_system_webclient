import { websocket } from "../websocket";
import webRTCService from '../webrtc/webrtcService';
import {useEffect, useRef} from "react";

const webRTCSetConnect = async () => {
    await webRTCService.connect();
    const offer = webRTCService.getOffer;
    console.log(offer);
    websocket.send(JSON.stringify({ event: 'webrtc', data: { user: 'test', offer } }));
}

export default function Room () {
    const localVideo = useRef(null);
    const streamVideo = useRef(null);
    const onTrack = (event) => {
        console.log('ok')
        const [remoteStream] = event.streams;
        console.log('remoteStream', remoteStream)
        streamVideo.current.srcObject = remoteStream;
    }

    webRTCService.setOnTrack(onTrack);

    useEffect(() => {
        webRTCSetConnect();
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(localStream => {
                localVideo.current.srcObject = localStream;
                localVideo.current.play();
                localStream.getTracks().forEach(track => {
                    webRTCService.addTrack(track, localStream);
                });
            });
    });

    return (
        <section>
            <video ref={localVideo} autoPlay muted/>
            <video ref={streamVideo} autoPlay/>
        </section>
    )
}