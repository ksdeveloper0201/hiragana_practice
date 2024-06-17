const HIRAGANA =
    "あいうえおかきくけこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをん";
const HIRAGANA_DAKUTEN = "ざじずぜぞだぢづでどはびぶべぼ";
const HIRAGANA_HANDAKUTEN = "ぱぴぷぺぽ";
export const HIRAGANA_JAPANESE =
    HIRAGANA + HIRAGANA_DAKUTEN + HIRAGANA_HANDAKUTEN;

export const HIRAGANA_LIST = [
    "あいうえお",
    "かきくけこ",
    "さしすせそ",
    "たちつてと",
    "なにぬねの",
    "はひふへほ",
    "まみむめも",
    "やゆよ",
    "らりるれろ",
    "わをん",
];

export const KANA_LIST = [
    "アイウエオ",
    "カキクケコ",
    "サシスセソ",
    "タチツテト",
    "ナニヌネノ",
    "ハヒフヘホ",
    "マミムメモ",
    "ヤユヨ",
    "ラリルレロ",
    "ワヲン",
];

export const ABC_ARRAY = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export const NUMBER_10 = Array.from({ length: 10 }, (_, index) => index + 1);
export const NUMBER_100 = Array.from({ length: 100 }, (_, index) => index + 1);

export const NUMBER_x = (num: number) => {
    return Array.from({ length: num }, (_, index) => (index + 1).toString());
};
