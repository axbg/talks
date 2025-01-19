import {useEffect, useRef, useState} from "react";
import Video from "../video/Video";
import WebSocketManager from "../../sockets/WebSocketManager.js";
import {defaultConfigurations} from "../../data/defaults";
import {useParams} from "react-router";
import MediaStreamManager from "../../streams/MediaStreamManager.js";
import Button from "../button/Button.jsx";
import Preview from "../preview/Preview.jsx";

const ControlBoard = () => {
    const configurations = useRef(JSON.parse(JSON.stringify(defaultConfigurations)));

    const params = useParams();
    const room = params.id;

    const [wsManager, setWsManager] = useState(null);
    const [mediaStreamManager, setMediaStreamManager] = useState(null);

    const [isActive, setIsActive] = useState(false);
    const [webcamStatus, setWebcamStatus] = useState(true);
    const [micStatus, setMicStatus] = useState(true);

    const [localMediaStream, setLocalMediaStream] = useState(null);
    const [remoteMediaStreams, setRemoteMediaStreams] = useState([]);

    useEffect(() => {
        async function captureLocalMedia() {
            const mdm = new MediaStreamManager();
            setMediaStreamManager(mdm);

            await mdm.captureLocalStream();
            setLocalMediaStream(mdm.localStreamCapture);
        }

        captureLocalMedia();
        setWsManager(new WebSocketManager());

        return () => {
            stop();

            if (mediaStreamManager) {
                setLocalMediaStream(null);
                mediaStreamManager.stopLocalStreamCapture();
            }
        }
    }, [])

    const toggleWebcam = () => {
        setWebcamStatus(mediaStreamManager.toggleWebcam());
    }

    const toggleMic = () => {
        setMicStatus(mediaStreamManager.toggleMicrophone());
    }

    const start = () => {
        if (wsManager) {
            wsManager.connect(room, configurations.current, localMediaStream, setIsActive, setRemoteMediaStreams);
        }
    }

    const stop = () => {
        if (wsManager) {
            wsManager.disconnect(setIsActive, setRemoteMediaStreams);
        }
    }

    return (
        <>
            <h1 className={"text-right"}>{room}</h1>
            <div className={"h-[75vh] flex justify-center items-center gap-2 mt-6 flex-wrap overflow-y-auto"}>
                {!isActive ?
                    <Video preview={true} videoStream={localMediaStream}/>
                    :
                    Object.values(remoteMediaStreams).map((remoteStream, index) => <Video key={index} controls={true} videoStream={remoteStream}/>)
                }
            </div>
            <div className="flex justify-center gap-2 pt-4">
                {!isActive ?
                    <Button text="Connect" onClick={start}/>
                    : <Button text="Disconnect" onClick={stop}/>
                }
                <Button text={(webcamStatus ? "Turn off " : "Turn on") + " camera"} onClick={toggleWebcam}/>
                <Button text={(micStatus ? "Turn off " : "Turn on") + " microphone"} onClick={toggleMic}/>
            </div>
            {isActive && <Preview isActive={isActive} videoStream={localMediaStream}/>}
        </>
    )
}

export default ControlBoard;