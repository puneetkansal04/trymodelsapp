import React, { useEffect } from "react";
import Orientation from "react-native-orientation-locker";
import WebView from "react-native-webview";

// https://sketchfab.com/models/bb4OJb5V4L0hgYjM3vtGvPB7ZMt/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0
const ViewModel = () => {
    useEffect(() => {
        Orientation.lockToLandscape();
    }, []);

    return (
        <WebView
            style={{ marginRight: -52 }}
            source={{ uri: "https://sketchfab.com/models/bb4OJb5V4L0hgYjM3vtGvPB7ZMt/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0" }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true} />
    )
}

export default ViewModel;