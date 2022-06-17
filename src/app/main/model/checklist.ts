import { CheckListNode } from "./checklist_node";
//struttura dati checklist principale
export class CheckList {
        Name: string = "";
        Childs: Array<CheckListNode> = [];
}