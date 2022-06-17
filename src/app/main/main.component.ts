import { Component, Input, OnInit } from "@angular/core";
import { ApiChecklistService      } from "../back-office-module/service-admin/api-checklist.service";
import { APIService     } from "../services/API.service";
import { MedCarService  } from "../services/med-car.service";
import { CheckList      } from "./model/checklist";
import { CheckListNode  } from "./model/checklist_node";
import { HomeForm       } from "./model/homeForm";
import { ApiItemService } from "../back-office-module/service-admin/api-item.service";
import { HomeService    } from "../services/home.service";
import { Router         } from "@angular/router";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
	//inizializzazione degli oggetti Checklist e ChecklistNode
	//il primo conterrà l'intera checklist di automezzo
	check: CheckList = new CheckList();
	//il secondo ogni singolo nodo
	node: CheckListNode = new CheckListNode();
	parentNode: CheckListNode = new CheckListNode();
	objItems: CheckListNode[] = [];

	//prende l'indice del menu
	indice = 0;

	//valori riempiti
	valueschange: string[] = [];
	checkListInfo = new HomeForm();

	@Input() checklistID: string;

	campi: CheckListNode[] = [];
	activeTab: number = 1;
	canSubmit: boolean = false;
	arrayOrderID: number[] = [];
	avvisoChecklist: string | undefined = undefined;

	constructor(
		private homeService: HomeService,
		private router: Router,
		public medCarService: MedCarService,
		private apiService: APIService,
		private apiChecklist: ApiChecklistService,
		private apiItem: ApiItemService
	) { }

	ngOnInit() {
		this.avvisoChecklist = undefined;
		this.objItems = this.setCategories();
		this.medCarService.canSubmit.subscribe((canSubmit) => {
			this.canSubmit = canSubmit;
		});
		if(this.checklistID!==undefined){
			//acquisiamo la checklist tramite il servizio
			this.apiChecklist.getChecklistJSON(this.checklistID)
				.toPromise()
				.then((jsondati) => {
					if(jsondati!==null&&jsondati!==undefined){
					//lista dei nodi
					this.check.Name = "checklist";
					this.check.Childs = jsondati;
					this.check.Childs.sort((a, b) => {
						return a.OrderID - b.OrderID;
					})
					this.check.Childs.forEach(categoria => {
						categoria.Value = null;
						if (categoria.Childs) {
							categoria.Childs.sort((c, d) => {
								return c.OrderID - d.OrderID;
							})
							categoria.Childs.forEach(sottocategoria => {
								sottocategoria.Value = null;
								if (sottocategoria.Childs) {
									sottocategoria.Childs.forEach(oggetto => {
										oggetto.Value = null;
									})
								}
							})
						}
					});
					this.campi = this.check.Childs;
					//chiamata della funzione alla quale passiamo la lista per la ricerca dei nodi
					let node: CheckListNode | null = this.getFirstCategory(
						this.check,
						null
					);
					if (node != null) {
						this.node = node;
					}
					} else {
						this.avvisoChecklist = "Nessuna checklist presente, contattare l'amministratore";
					}
				})
				.catch(err => {
					console.log(err);
					this.avvisoChecklist = "Nessuna checklist presente, contattare l'amministratore";
				});
		} else {
           this.avvisoChecklist = "Nessuna checklist presente, contattare l'amministratore";
		}
	}

	//funzione che recupera o la lista o il singolo nodo della lista
	/*getFirstCategory(
		checkList: CheckList | null,
		inputNode: CheckListNode | null
	): CheckListNode | null {
		let result: CheckListNode | null = inputNode;
		//condizione per verificare l'esistenza della lista
		if (checkList) {
			//ciclo for scandisce la lista per recuperare i nodi
			for (let j = 0; j < checkList.Childs.length; j++) {
				//assegna alla varibaile nodo il risulta to della ricerca del nodo con la ricorsione della funzione
				let node = this.getFirstCategory(null, checkList.Childs[j]);
				//se la varibile nodo non è nulla, il risultato è il nodo stesso e il ciclo s'interrompe
				if (node != null && !node.IsDropDown) {
					result = node;
					this.parentNode = node;
					break;
				}
			}
		}
		//se il valore del parametro checklist è nullo, quindi è nulla la lista, fa la verifica sul nodo
		else {
			//se il nodo non è nullo ed è di tipo DropdownMenu fa il ciclo per cercare ulteriori nodi con la ricorsione
			if (inputNode != null && inputNode.IsDropDown) {
				this.parentNode = inputNode;
				for (let j = 0; j < inputNode.Childs.length; j++) {
					//assegna alla variabile node1 il nodo sul quale ciclare per cercare gli altri nodi
					let node1 = inputNode.Childs[j];
					//assegna alla varibaile nodo il risultato della ricerca del nodo con la ricorsione della funzione
					if (node1.IsDropDown) {
						let node = this.getFirstCategory(null, node1);
						if (node != null) {
							result = node;
							break;
						}
					}
				}
			}
		}
		return result;
	}*/
	getFirstCategory(
		checkList: CheckList | null,
		inputNode: CheckListNode | null
	): CheckListNode | null {
		let result: CheckListNode | null = inputNode;
		if (checkList !== null) {
			let ricerca2
			let ricerca = checkList.Childs.find((node: CheckListNode) => node.OrderID === 1);
			if (ricerca !== undefined && ricerca.IsDropDown) {
				ricerca2 = ricerca.Childs.find((node: CheckListNode) => node.OrderID === 1);
			} else if(ricerca !== undefined) {
				result = ricerca;
			}
			if (ricerca2 !== undefined) {
				result = ricerca2;
			}
		}
		return result;
	}
	//recupera la lista corrispondente al tab schiacciato
	getNodeByName(tabName: string) {
		for (let i = 0; i < this.campi.length; i++) {
			if (
				this.campi[i].Name == tabName &&
				!this.campi[i].IsDropDown
			) {
				this.arrayOrderID.push(this.campi[i].OrderID);
				this.node = this.campi[i];
				this.activeTab = this.node.OrderID;
				this.indice = i;
				this.parentNode = this.campi[i];
				break;
			} else {
				if (this.campi[i].IsDropDown) {
					let campi2 = this.campi[i].Childs;
					for (let ii = 0; ii < campi2.length; ii++) {
						if (
							campi2[ii].Name == tabName &&
							!campi2[ii].IsDropDown
						) {
							this.node = campi2[ii];
							this.activeTab = this.node.OrderID;
							this.indice = i;
							this.parentNode = this.campi[i];
						} else {
							let campi3 = campi2[ii].Childs;
							for (let jj = 0; jj < campi3.length; jj++) {
								if (campi2[ii].Name == tabName) {
									this.node = campi3[jj];
									this.parentNode = this.campi[i];
									break;
								}
							}
						}
					}
				}
			}
		}
	}

	onValueChange() {
		for (let item of this.check.Childs) {
			if (!item.IsDropDown) {
				for (let item2 of item.Childs) {
					let name = item2.Name;
					let note = item2.Note;
					let value = item2.Value;
					if (item2.Value === '0' || item2.Value === 0) {
						value = false;
					}
					let alert = this.searchAlertLevel(item2.ItemCode);
					if (item2.Value === 'vuoto') {
						alert = '220f01ee-f939-40d2-bda3-5d69a0dc44fd';
						value = false;
					} else if (item2.Value === "1/4") {
						alert = '45bd7cc1-429d-4a17-89d1-0012f2c41474';
						value = true;
					} else if (item2.Value === "1/2" || item2.Value === "3/4" || item2.Value === "pieno") {
						alert = '9d6b439f-4d62-4d22-a8c3-937938035bf0';
						value = true;
					} else {
						alert = this.searchAlertLevel(item2.ItemCode);
					}
					if (typeof value === 'string' || typeof value === 'number') {
						value = true;
					}
					let contact = item2.ContactCode;
					let category = item.ItemCode;
					this.medCarService.resultForm.push({ Name: name, Value: value, Note: note, Category: category, AlertLevelID: alert, ContactCode: contact });
				}
			} else if (item.IsDropDown) {
				for (let item3 of item.Childs) {
					for (let item4 of item3.Childs) {
						let name = item4.Name;
						let note = item4.Note;
						let value = item4.Value;
						let contact = item4.ContactCode;
						if (item4.Value === 0 || item4.Value === '0') {
							value = false;
						}
						let alert = this.searchAlertLevel(item4.ItemCode);
						if (item4.Value === 'vuoto') {
							alert = '9d6b439f-4d62-4d22-a8c3-937938035bf0';
							value = false;
						} else if (item4.Value === "1/4") {
							alert = '45bd7cc1-429d-4a17-89d1-0012f2c41474';
							value = true;
						} else if (item4.Value === "1/2" || item4.Value === "3/4" || item4.Value === "pieno") {
							alert = '220f01ee-f939-40d2-bda3-5d69a0dc44fd';
							value = true;
						} else {
							alert = this.searchAlertLevel(item4.ItemCode);
						}
						if (typeof value === 'string' || typeof value === 'number') {
							value = true;
						}
						let category = item3.ItemCode;
						this.medCarService.resultForm.push({ Name: name, Value: value, Note: note, Category: category, AlertLevelID: alert, ContactCode: contact });
					}
				}
			}
		}
		this.medCarService.formCollect();
		//chiamata HTTP
		this.apiService.onPostRequest(this.medCarService.resultFormTotal);
	}

	activateButton() {
		let isFull = true;
		if (!this.check.Name && this.check.Name !== null) {
			return this.check.Childs.every(
				(child: CheckListNode) => child.Value === "full"
			)
				? false
				: this.check.Childs.some(
					(child: CheckListNode) => child.Value === "full"
				)
					? true
					: true;
		}
		return isFull;
	}

	searchAlertLevel(id?: string) {
		for (let obj of this.objItems) {
			if (obj.Code === id) {
				return obj.AlertLevelCode;
			}
		}
		return '220f01ee-f939-40d2-bda3-5d69a0dc44fd';
	}

	setCategories() {
		let objCategorie: CheckListNode[] = [];
		this.apiItem.onFetchRequestItems()
			.subscribe(categories => {
				categories.forEach((category) => {
					objCategorie.push(category);
				});
			},
				error => { console.log(error.status) }
			);
		return objCategorie;
	}

	backHome(){
		this.homeService.avanti = false;
		this.homeService.avantiDisabile = false;
		this.homeService.numeroSocc = 0;
		this.homeService.resultHomeForm = [];
		this.router.navigateByUrl('/#').then(data => {this.router.navigateByUrl('/')});
	}
}