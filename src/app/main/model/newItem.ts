export class NewItem {
    Code: string;
    Tool: string;
    ItemType: string;
    AlertLevelCode: string;
    Name: string;
    NameComplete: string;
    IsDropDown: boolean;
    OrderID: number;
    Childs: Array<NewItem> = [];

    CategoryCode?: string;
    ItemID?: string;

    ContactCode: string;
}