import { useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { AudioRecorder, AudioUtils } from 'react-native-audio';



const db = SQLite.openDatabase({ name: 'RecordDB.db', location: 'default' }, () => { }, error => { console.log(error) })

const RecordVoiceScreen: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false)

    const startRecording = async () => {
        const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac'
    }
}