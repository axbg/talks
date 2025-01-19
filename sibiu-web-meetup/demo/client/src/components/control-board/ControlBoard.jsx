import {useEffect, useState} from "react";
import Video from "../video/Video";
import WebSocketManager from "../../sockets/WebSocketManager.js";
import {defaultConfigurations} from "../../data/defaults";
import {useParams} from "react-router";
import MediaStreamManager from "../../streams/MediaStreamManager.js";
import Button from "../button/Button.jsx";
import Preview from "../preview/Preview.jsx";

const ControlBoard = () => {
    const params = useParams();
    const [wsManager, setWsManager] = useState(null);
    const [mediaStreamManager, setMediaStreamManager] = useState(null);

    const room = params.id;
    const [isActive, setIsActive] = useState(false);

    const [localMediaStream, setLocalMediaStream] = useState(null);
    const [webcamStatus, setWebcamStatus] = useState(true);
    const [micStatus, setMicStatus] = useState(true);

    const [remoteMediaStreams, setRemoteMediaStreams] = useState([]);

    const [configurations] = useState(JSON.parse(JSON.stringify(defaultConfigurations)));

    useEffect(() => {
        async function captureLocalMedia() {
            const mdm = new MediaStreamManager();
            setMediaStreamManager(mdm);

            await mdm.captureLocalStream();
            setLocalMediaStream(mdm.localStreamCapture);
        }

        captureLocalMedia()
    }, [])

    useEffect(() => {
        return () => {
            if (mediaStreamManager) {
                setLocalMediaStream(null);
                mediaStreamManager.stopLocalStreamCapture();
            }
        }
    }, [mediaStreamManager])

    useEffect(() => {
        if (wsManager) {
            wsManager.connect(room, configurations, setIsActive, setVideoStream, micAudio);
        }

        return () => {
            if (wsManager) {
                wsManager.disconnect(setIsActive, setVideoStream);
            }
        }
    }, [wsManager]);

    const toggleWebcam = () => {
        setWebcamStatus(mediaStreamManager.toggleWebcam());
    }

    const toggleMic = () => {
        setMicStatus(mediaStreamManager.toggleMicrophone());
    }

    const start = () => {
        setWsManager(new WebSocketManager());
    }

    const stop = () => {
        setWsManager(null);
    }

    return (
        <>
            <h1 className={"text-right"}>{room}</h1>
            <div className={"h-[75vh] flex justify-center items-center gap-2 mt-6 flex-wrap overflow-y-auto"}>
                {!isActive ?
                    <Video preview={true} videoStream={localMediaStream}/>
                    :
                    remoteMediaStreams.map((stream, index) => <Video key={index} controls={true} videoStream={stream}/>)
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