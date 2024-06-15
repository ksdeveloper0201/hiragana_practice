import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, Platform, TextInput, FlatList } from "react-native";
import HeaderIcons from "../components/HeaderIcons";
import { styles } from "../styles/CommonStyles";
import * as SQLite from "expo-sqlite/legacy";
import { GestureHandlerRootView, RectButton, Swipeable } from "react-native-gesture-handler";
import { render } from "react-dom";
import * as ScreenOrientation from 'expo-screen-orientation';



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
    items: ItemProps[],
    navigation: any,
    onPressHandler: () => void;
}

type ItemComponentProps = {
    item: ItemProps,
    navigation: any,
    onPressHandler: () => void;
}

type ItemProps = { listId: number, name: string } | null;


const Item: React.FC<ItemComponentProps> = ({ item, navigation, onPressHandler }) => {

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

        return () => {
            ScreenOrientation.unlockAsync();
        };
    }, [])

    const renderRightActions = () => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => {
                db.transaction((tx) => {
                    tx.executeSql(`delete from words where listId = ?`, [item!.listId], () => onPressHandler())
                })
                db.transaction((tx) => {
                    tx.executeSql(`delete from lists where listId = ?`, [item!.listId], () => onPressHandler())
                })
            }}>
                <Text style={styles.deleteButtonText}>削除</Text>
            </RectButton>
        )
    }

    return (
        <Swipeable
            renderRightActions={renderRightActions}
        >
            <RectButton
                onPress={() => navigation.navigate("MakeListsWords", { listName: item!.name, listId: item!.listId })}
                style={styles.item}
            >
                <Text style={styles.itemText}>{item!.name}</Text>
            </RectButton>
        </Swipeable>
    );
};

const Items: React.FC<ItemsProps> = ({ items, navigation, onPressHandler }) => {
    if (items === null || items.length === 0) {
        return null;
    }

    return (
        <FlatList
            data={items}
            renderItem={({ item }) => <Item item={item} navigation={navigation} onPressHandler={onPressHandler} />}
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
};


const MakeListScreen: React.FC<Props> = ({ navigation }) => {
    const [text, setText] = useState<string>("")
    const [items, setItems] = useState<ItemProps[] | null>(null);


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
                `select * from lists order by listId desc`,
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
        <GestureHandlerRootView style={styles.container}>
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
            <Items items={items!} navigation={navigation} onPressHandler={() => loadItems()} />

            <RectButton style={styles.button}>
                <Text style={styles.buttonText}>ぜんぶ けす</Text>
            </RectButton>

        </GestureHandlerRootView>
    );
};

export default MakeListScreen;
