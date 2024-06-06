import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, Platform, TextInput, FlatList } from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";
import * as SQLite from "expo-sqlite/legacy";
import { RectButton, Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";


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

type ItemsProps = {
    items: ItemProps[];
    onPressHandler: () => void
}
type ItemComponentProps = {
    item: ItemProps,
    onPressHandler: () => void
}
type ItemProps = { wordId: number, listId: number, word: string } | null;


const Item: React.FC<ItemComponentProps> = ({ item, onPressHandler }) => {
    if (!item) {
        return (<Text>とくになし</Text>)
    }

    const renderRightActions = () => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => {
                db.transaction((tx) => {
                    tx.executeSql(`delete from words where wordId = ?`, [item.wordId], () => onPressHandler())
                })
            }}>
                <Text style={styles.deleteButtonText}>削除</Text>
            </RectButton>
        )
    }

    return (

        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.word}</Text>
            </View>
        </Swipeable>
    );
};


const Items: React.FC<ItemsProps> = ({ items, onPressHandler }) => {
    if (items === null || items.length === 0) {
        return null;
    }
    return (
        <FlatList
            data={items}
            renderItem={({ item }) => <Item item={item} onPressHandler={onPressHandler} />}
            keyExtractor={(item) => item!.listId.toString()}
            contentContainerStyle={{
                padding: 16,
            }}
            style={{ maxHeight: 5 * 80 }}
        />
    );
}

type Props = {
    navigation: any;
    route: any;
};


const MakeListsWordsScreen: React.FC<Props> = ({ navigation, route }) => {
    const [text, setText] = useState<string>("")
    const [items, setItems] = useState<ItemProps[] | null>(null);


    useEffect(() => {
        db.transaction((tx) => {
            // tx.executeSql("drop table words")
            tx.executeSql(
                "create table if not exists words (wordId INTEGER PRIMARY KEY AUTOINCREMENT, listId integer, word text);"
            );
        });
        loadItems();
    }, []);

    const loadItems = () => {
        console.log(`loadItems: ${items}`)
        db.transaction((tx) => {
            tx.executeSql(
                `select * from words where listId = ?`,
                [route.params.listId],
                (_, { rows: { _array } }) => {
                    setItems(_array)
                    console.log(_array)
                },
                (t, error) => {
                    console.log("error loading items: ", error);
                    return false
                }
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
        console.log(`listId: ${route.params.listId}`);
        db.transaction(
            (tx) => {
                tx.executeSql("insert into words (listId, word) values (?, ?)", [route.params.listId, text], (_, { insertId }) => {
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
            <GestureHandlerRootView>
                <HeaderIcons navigation={navigation} />
                <Text style={styles.subtitle}>{route.params.listName}</Text>
                <View style={styles.flexRow}>
                    <TextInput
                        onChangeText={(text) => setText(text)}
                        onSubmitEditing={() => { add(text); }}
                        placeholder="ことばをとうろく"
                        style={styles.input}
                        value={text}
                    />
                </View>
                <Items items={items!} onPressHandler={() => loadItems()} />
                <TouchableOpacity style={styles.button} onPress={() => console.log("connected")}>
                    <Text style={styles.buttonText}>接続する</Text>
                </TouchableOpacity>
            </GestureHandlerRootView>
        </View>
    );
};


export default MakeListsWordsScreen;