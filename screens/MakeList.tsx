import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform, TextInput, ScrollView } from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";
import * as SQLite from "expo-sqlite/legacy";


function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                }
            }
        }

    }
    const db = SQLite.openDatabase("sampleDb.db");
    return db;
}

const db = openDatabase();

type ItemProps = {
    items: { listId: number, name: string }[] | null;
    navigation: any
}



const Items: React.FC<ItemProps> = ({ items, navigation }) => {
    if (items === null || items.length === 0) {
        return null;
    }

    return (
        <View style={styles.sectionContainer}>
            {items.map(({ listId, name }) => (
                <TouchableOpacity
                    key={listId}
                    onPress={() => navigation.navigate("MakeListsWords", { listId: listId, listName: name })}
                    style={styles.item}
                >
                    <Text style={styles.itemText}>{name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

type Props = {
    navigation: any;
};


const MakeListScreen: React.FC<Props> = ({ navigation }) => {
    const [text, setText] = useState<string>("")
    const [items, setItems] = useState<{ listId: number, name: string }[] | null>(null);


    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists lists (listId integer primary key not null, name text);"
            );
        });

        loadItems();
    }, []);

    const loadItems = () => {
        console.log("load items")
        db.transaction((tx) => {
            tx.executeSql(
                `select * from lists`,
                [],
                (_, { rows: { _array } }) => setItems(_array)
            );
        });
    };


    const add = (text: string | null) => {
        console.log(`add: ${text}`)
        // is text empty?
        if (text === null || text === "") {
            console.log("no text")
            return false;
        }
        db.transaction(
            (tx) => {
                tx.executeSql("insert into lists (name) values (?)", [text], (_, { insertId }) => {
                    console.log(`Inserted with ID: ${insertId}`);
                });
            },
            undefined,
            () => {
                setText("");
                loadItems();
            }

        );
    };


    return (
        <View style={styles.container}>
            <HeaderIcons navigation={navigation} />
            <Text style={styles.subtitle}>ことばリスト</Text>
            <View style={styles.flexRow}>
                <TextInput
                    onChangeText={(text) => setText(text)}
                    onSubmitEditing={() => { add(text); }}
                    placeholder="あたらしいリストのなまえ"
                    style={styles.input}
                    value={text}
                />
            </View>
            <Items items={items} navigation={navigation} />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>接続する</Text>
            </TouchableOpacity>

        </View>
    );
};

export default MakeListScreen;
