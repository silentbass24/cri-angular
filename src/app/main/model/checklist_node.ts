//struttura dati di ogni singolo nodo
export class CheckListNode {
        Code: string;
        Tool: string;
        Type: string;
        AlertLevelCode: string;
        Name:         string;
        NameComplete: string;
        IsDropDown:   boolean;
        OrderID: number;
        OrderSubID: number;
        Childs: Array<CheckListNode> = [];

        Value: any;
        Note: string;
 
        CategoryCode?: string;
        ItemCode: string;

        ContactCode: string;
}