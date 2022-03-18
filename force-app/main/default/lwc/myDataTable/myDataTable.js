import { LightningElement, track } from 'lwc';

const actions = [
    { label: 'Em Andamento', name: 'andamento' },
    { label: 'Pedido Realizado', name: 'realizado' },
    { label: 'Reagendar', name: 'reagendar' },
    { label: 'Cancelar', name: 'cancelar' },
];


export default class MyDataTable extends LightningElement {
    
    /*columns = [
        { label: 'Record Name', fieldName: 'name', type: 'text'},
        { label: 'Custom Type A', fieldName: 'id', type: 'customTypeA', typeAttributes: {
                customValueA: { fieldName: 'customA' },
                createdDate: { fieldName: 'createdDate' }
            }
        },
        { label: 'Custom Type B', fieldName: 'id', type: 'customTypeB', typeAttributes: {
                customValueB: { fieldName: 'customB' },
                createdDate: { fieldName: 'createdDate' }
            }
        },
        { type: 'action', typeAttributes: { rowActions: actions }}
    ];*/


    /*@track data = [
        { id: 1, name: 'Example 1', customA: 1, customB: 11, createdDate: '08-05-2020 '},
        { id: 2, name: 'Example 2', customA: 2, customB: 12, createdDate: '08-05-2020 '},
        { id: 3, name: 'Example 3', customA: 3, customB: 13, createdDate: '08-05-2020 '},
        { id: 4, name: 'Example 4', customA: 4, customB: 14, createdDate: '08-05-2020 '},
        { id: 5, name: 'Example 5', customA: 5, customB: 15, createdDate: '08-05-2020 '},
        { id: 6, name: 'Example 6', customA: 6, customB: 16, createdDate: '08-05-2020 '},
        { id: 7, name: 'Example 7', customA: 7, customB: 17, createdDate: '08-05-2020 '},
        { id: 8, name: 'Example 8', customA: 8, customB: 18, createdDate: '08-05-2020 '}
    ];*/



    @track data = [
        {id: '0011I00001Zwy5iQAA', Name: 'SANTOS PROTESE ODONTOLOGICA LTDA', Phone: '04935664885', Speedy: '8979415'},
        {id: '0011I00001Zwy5iQAB', Name: 'CADDESIGN LABORATORIO DE PROTESE DENTARIA LTDA', Phone: '04935664885', Speedy: '8979415'},
        {id: '0011I00001Zwy5iQAC', Name: 'CLINICA DE ODONTOLOGIA CORREIA SANTA FE LTDA', Phone: '04935664885', Speedy: '8979415'},
        {id: '0011I00001Zwy5iQAD', Name: 'FERREIRA & SAMPAIO SERVIÇOS ODONTOLÓGICOS LTDA', Phone: '04935664885', Speedy: '8979415'},
        {id: '0011I00001Zwy5iQAE', Name: 'SPECIALITE ODONTOLOGIA PERSONALIZADA LTDA', Phone: '04935664885', Speedy: '8979415'},
        {id: '0011I00001Zwy5iQAF', Name: 'CLINICA ODONTOLOGICA DR. BRENO GONZAGA LTDA', Phone: '04935664885', Speedy: '8979415'}
    ];


    arrays = [
        {value: '1111', label: 'Banana'},
        {value: '2222', label: 'Maça'},
        {value: '3333', label: 'Uva'},
        {value: '4444', label: 'Pera'}
    ];

    columns = [
        { label: 'Conta', fieldName: 'Name', type: 'text'},
        { label: 'Phone', fieldName: 'Phone', type: 'text'},
        { label: 'Speedy', fieldName: 'Speedy', type: 'text'},
        { label: 'PickList', fieldName: 'id', type: 'pickList', typeAttributes:{ customValueA: this.arrays} },
        { type: 'action', typeAttributes: { rowActions: actions }}
    ];
    
    handleCustomTypeA(event) {
        const { recordId, newCustomValueA } = event.detail;
        console.log('CUSTOM TYPE A - ' + recordId + ' - ' + newCustomValueA);
        this.data.find(item => item.id == recordId).customA = newCustomValueA;
        this.data = [...this.data];
    }

    handleCustomTypeB(event) {
        const { recordId, customValueB } = event.detail;
        console.log('CUSTOM TYPE B - ' + recordId);
    }

    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log(actionName)
        console.log(JSON.parse(JSON.stringify(row)))
    }
}