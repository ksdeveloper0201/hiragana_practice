import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'RecordDB.db', location: 'default' }, () => { }, error => { console.log(error) });

const RecordVoiceScreen: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async () => {
        const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
        try {
            await AudioRecorder.prepareRecordingAtPath(audioPath, {
                SampleRate: 22050,
                Channels: 1,
                AudioQuality: 'Low',
                AudioEncoding: 'aac',
            });
            await AudioRecorder.startRecording();
            setIsRecording(true);
        } catch (error) {
            console.error(error);
        }
    };

    const stopRecording = async () => {
        try {
            const filePath = await AudioRecorder.stopRecording();
            setIsRecording(false);
            saveRecording(filePath);
        } catch (error) {
            console.error(error);
        }
    };

    const saveRecording = (filePath: string) => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Recordings (id INTEGER PRIMARY KEY NOT NULL, path TEXT NOT NULL)');
            tx.executeSql('INSERT INTO Recordings (path) VALUES (?)', [filePath], () => {
                console.log('Recording saved: ' + filePath);
            }, error => {
                console.log(error);
            });
        });
    };

    return (
        <View style={styles.container}>
            <Text>{isRecording ? 'Recording...' : 'Press the button to start recording'}</Text>
            <Button title={isRecording ? 'Stop Recording' : 'Start Recording'} onPress={isRecording ? stopRecording : startRecording} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RecordVoiceScreen;