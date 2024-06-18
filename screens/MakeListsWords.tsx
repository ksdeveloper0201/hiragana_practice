import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, Platform, TextInput, FlatList } from "react-native";
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
    const db = SQLite.openDatabase("hiragana.db");
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


    const registerGreetingWords = (id: string) => {
        db.transaction((tx) => {
            tx.executeSql("select * from words where listId = ?",
                [id],
                (_, { rows }) => {
                    if (rows.length === 0) {
                        // 
                        tx.executeSql("insert into words (listId, word) values (?, ?)", [id, "おはよう"]);
                        tx.executeSql("insert into words (listId, word) values (?, ?)", [id, "こんにちは"]);
                        tx.executeSql("insert into words (listId, word) values (?, ?)", [id, "こんばんは"]);
                        tx.executeSql("insert into words (listId, word) values (?, ?)", [id, "おやすみ"]);
                        tx.executeSql("insert into words (listId, word) values (?, ?)", [id, "またね"]);
                    }
                });
        });
    }

    useEffect(() => {
        db.transaction((tx) => {
            // wordsテーブルがない場合作成
            // tx.executeSql("drop table words")
            tx.executeSql(
                "create table if not exists words (wordId INTEGER PRIMARY KEY AUTOINCREMENT, listId integer, word text);",
                [],
                () => {
                    let greetingId: string;
                    tx.executeSql(
                        "select * from lists where name = ? ",
                        ["あいさつ"],
                        (_, { rows: { _array } }) => {
                            greetingId = _array[0].listId;
                            registerGreetingWords(greetingId);
                        }
                    );
                }
            );
        });
        loadItems();
    }, []);

    const loadItems = () => {
        console.log(`loadItems: ${items}`)
        db.transaction((tx) => {
            tx.executeSql(
                `select * from words where listId = ? order by wordId asc`,
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
        <GestureHandlerRootView style={styles.container}>
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
            <RectButton style={styles.button} onPress={() => navigation.navigate("ShowWordList", { wordList: items?.map((item) => item?.word), isRandom: false })}>
                <Text style={styles.buttonText}>じゅんばんによもう</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={() => navigation.navigate("ShowWordList", { wordList: items?.map((item) => item?.word), isRandom: true })}>
                <Text style={styles.buttonText}>ランダムによもう</Text>
            </RectButton>
        </GestureHandlerRootView>
    );
};


export default MakeListsWordsScreen;