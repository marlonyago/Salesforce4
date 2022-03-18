import { LightningElement , api, track } from "lwc";
import getFieldList from '@salesforce/apex/ImportDataController.getObjectFields';
export default class DataImportWizard extends LightningElement {

	@api objects;
	@api create;
	@api update;
	@api delete;

    get created(){
        return this.create;
    }

    get updated(){
        return this.update;
    }

    get deleted(){
        return this.delete;
    }

    objectList;
    rendered = false;
    showModal = false;
    isLoading = true;


    allFields = [];
    fieldList = [];


    etapa1 = true;
    etapa2 = false;

    @track configuration = { accept: 'xlsx'};
    options = [{value: 'xlsx', label: 'Excel'},{value: 'csv', label: 'CSV'}];
    get accept(){
        return '.'+this.configuration.accept;
    }
    


    connectedCallback(){
        getFieldList({ objectName : 'Lead' })
            .then(data => {
                console.log(JSON.stringify(data))         
            }).catch(error => {
                console.log('error getDatabase');
                console.error(error);            
            });

        //this.getObjectName();
        //this.getObjectFields();
    }

    getObjectName(){
        let objects = this.objects.split(',');
        let data = {"Lead":"Lead", "Conta" : "Account", "Contato" : "Contact", "Oportunidade" : "Opportunity"};
        let key = Object.keys(data); 
        this.objectList = key.map( (element, index) => {
            return { value: element , key: index }
        });
        this.isLoading= false;
    }

    direto(){
        this.openfileUpload();
    }
    

    openfileUpload(file){
        this.isLoading= true;
        console.log('openfileUpload');
        /*var reader = new FileReader();
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file);*/
        try {

            /*Promise.all([
                this.readFile();
                this.formatDocumentsAndNumbers();
            ]).then(results => {
                this.sendCaptura();
            }).catch(err => console.error(err));*/
    
               /*formatDocumentsAndNumbers(){        
                return new Promise((resolve, reject) => {   
                    try {
                        
                        resolve('formatDocumentsAndNumbers foi'); 
                    } catch (error) {
                        reject('formatDocumentsAndNumbers erro=> '+error);   
                    }
                    
                });*/



            let data = JSON.parse('[["First Name","Last Name","email","Phone","Title","Company","Address Line 1","City","State/Province","Postal Code","Country","Industry","Owner","Rating","Status"],["Adrian","Benavides","Benavides@123Warehousing.com","(415) 835-1656","Director of IT","123 Warehousing","1775 11th","San Francisco","CA",94106,"USA","Biotechnology","Anna Bressan","Hot","Open"],["Carla","Borgonovo","Borgonovo@ZiffCorp.com","(415) 835-1658","Director of Information Systems","ZiffCorp","82 T.W. Alexander Drive","Durham","NC",27718,"USA","Biotechnology","Anna Bressan","Cold","Open"],["Ann","Bowles","Bowles@AcmeCorp.com","(415) 242-9230","Director of Information Systems","Acme Corp","80 T.W. Alexander Drive","RTP","NC",27709,"USA","Manufacturing","Matt Wilson","Cold","Open"],["B","Bradley","Bradley@Mr.Sparkle.com","(415) 835-1659","Director of IT","Mr. Sparkle","79 T.W. Alexander Drive","Durham","NC",27715,"USA","Biotechnology","Anna Bressan","Cold","Open"],["Al","Broumand","Broumand@SmithandCo.com","(415) 835-1658","Director of Information Systems","Smith and Co.","2530 Berryessa Rd. # 524","San Francisco","CA",94108,"USA","Biotechnology","Anna Bressan","Cold","Open"],["David","Campbell","Campbell@Virtucon.com","(415) 835-1661","Director of Information Systems","Virtucon","2035 Gateway Place","Walnut Creek","CA",94601,"USA","Biotechnology","Anna Bressan","Hot","Open"],["Dan","Casey","Casey@ThriftBank.com","(415) 835-1655","Director of Information Systems","Thrift Bank","1776 11th","San Francisco","CA",94104,"USA","Recreation","Phil Smith","Hot","Open"],["Andy","Com","Com@Sampleinc.com","(415) 835-1665","CIO","Sample, inc","602 Van Ness Ave.","San Francisco","CA",94117,"USA","Finance","Phil Smith","Cold","Open"],["Brenda","Cowan","Cowan@StoPlainsHoldings.com","(925) 210-3943","Director of Information Systems","Sto Plains Holdings","4501 Durham Chapel Hill Boulevard","Chapel Hill","NC",27714,"USA","Finance","Phil Smith","Hot","Open"],["Chris","Dailey","Dailey@ThathertonFuels.com","(415) 835-1661","CIO","Thatherton Fuels","1761 Marin Ave","Durham","NC",27721,"USA","Manufacturing","Matt Wilson","Cold","Open"],["Christopher","Damman","Damman@MoobyCorp.com","(415) 242-9230","Director of IT","Mooby Corp","2034 Gateway Place","San Francisco","CA",94102,"USA","Biotechnology","Anna Bressan","Cold","Open"],["Dan","Davis","Davis@FlowersByIrene.com","(415) 835-1656","Manager, Hardware Procurement","Flowers By Irene","602 Van Ness Ave.","San Francisco","CA",94105,"USA","Technology","Phil Smith","Hot","Open"],["Carol","Diesner","Diesner@BluthCompany.com","(415) 835-1659","Manager, Hardware Procurement","Bluth Company","1762 Marin Ave","Raleigh","NC",27719,"USA","Transportation","Phil Smith","Hot","Open"],["Dee","Elson","Elson@KumatsuMotors.com","(415) 835-1663","Director of IT","Kumatsu Motors","1777 11th","Walnut Creek","CA",94603,"USA","Biotechnology","Anna Bressan","Cold","Open"],["Darres","Fischer","Fischer@OsatoChemicals.com","(415) 835-1658","CIO","Osato Chemicals","3104 Deerpark Dr,","Walnut Creek","CA",94598,"USA","Manufacturing","Matt Wilson","Hot","Open"],["Brenna","Fischer","Fischer@WayneEnterprises.com","(415) 835-1656","Director of IT","Wayne Enterprises","401 W. Main Street #604","Raleigh","NC",27716,"USA","Biotechnology","Anna Bressan","Hot","Open"],["Claire","Friesen","Friesen@Gringotts.com","(925) 210-3943","CIO","Gringotts","1259 1/2 11th Ave.","San Francisco","CA",94103,"USA","Transportation","Phil Smith","Warm","Open"],["Darin","Gelber","Gelber@TheLegitimateBusinessmensClub.com","(415) 835-1657","Director of IT","The Legitimate Businessmens Club","2531 Berryessa Rd. # 524","San Francisco","CA",94106,"USA","Manufacturing","Matt Wilson","Cold","Open"],["Anne","Hall","Hall@ExtensiveEnterprise.com","(415) 835-1656","CIO","Extensive Enterprise","2820 Pickett Road","Durham","NC",27712,"USA","Transportation","Phil Smith","Hot","Open"],["Ann","Hansen","Hansen@AlliedBiscuit.com","(925) 210-3943","Manager, Hardware Procurement","Allied Biscuit","1760 Marin Ave","Raleigh","NC",27710,"USA","Finance","Phil Smith","Cold","Open"],["Andre","Kahn","Kahn@Demoinc.com","(415) 835-1663","Manager, Hardware Procurement","Demo, inc.","1259 1/2 11th Ave.","San Francisco","CA",94114,"USA","Manufacturing","Matt Wilson","Hot","Open"],["Adam","Kehoe","Kehoe@WidgetCorp.com","(415) 835-1655","Manager, Hardware Procurement","Widget Corp","1258 1/2 11th Ave.","San Francisco","CA",94105,"USA","Transportation","Phil Smith","Cold","Open"],["Anna","Kuensch","Kuensch@AnkhStoAssociates.com","(415) 835-1655","Director of IT","Ankh-Sto Associates","1330 Hamlin Road","Chapel Hill","NC",27711,"USA","Finance","Phil Smith","Cold","Open"],["Bill","Lee","Lee@LexCorp.com","(415) 835-1661","Director of Information Systems","LexCorp","1335 Hamlin Road","RTP","NC",27717,"USA","Recreation","Phil Smith","Warm","Open"],["chris","Leontovitch","Leontovitch@ThreeWaters.com","(415) 835-1662","Director of Information Systems","Three Waters","1331 Hamlin Road","Raleigh","NC",27722,"USA","Finance","Phil Smith","Warm","Open"],["Daryl","Mcenhill","Mcenhill@TransworldConsortium.com","(415) 835-1659","Director of Information Systems","Transworld Consortium","202 E. Santa Clara St","Walnut Creek","CA",94599,"USA","Finance","Phil Smith","Hot","Open"],["Chris","Moore","Moore@WaterandPower.com","(415) 835-1663","CIO","Water and Power","2531 Berryessa Rd. # 524","San Francisco","CA",94105,"USA","Transportation","Phil Smith","Hot","Open"],["Blair","Murphy","Murphy@NorthCentralPositronics.com","(415) 835-1663","Director of IT","North Central Positronics","1761 Marin Ave","RTP","NC",27719,"USA","Telecommunications","Phil Smith","Warm","Open"],["Dervla","Peterson","Peterson@KeedslerMotors.com","(415) 835-1664","CIO","Keedsler Motors","603 Van Ness Ave.","Walnut Creek","CA",94604,"USA","Transportation","Phil Smith","Hot","Open"],["Alison","Propeller","Propeller@ABCTelecom.com","(415) 835-1660","Director of IT","ABC Telecom","2828 Aiello Dr #A","San Francisco","CA",94111,"USA","Recreation","Phil Smith","Cold","Open"],["Alan","Prussia","Prussia@FooBars.com","(415) 835-1659","Manager, Hardware Procurement","Foo Bars","200 E. Santa Clara St","San Francisco","CA",94109,"USA","Transportation","Phil Smith","Cold","Open"],["Blair","Robinson","Robinson@OmniConsimerProducts.com","(415) 835-1664","CIO","Omni Consimer Products","1331 Hamlin Road","RTP","NC",27720,"USA","Electronics","Matt Wilson","Hot","Open"],["Alix","Rowan","Rowan@FakeBrothers.com","(415) 835-1661","CIO","Fake Brothers","2033 Gateway Place","San Francisco","CA",94112,"USA","Technology","Phil Smith","Cold","Open"],["Ayla","Savelli","Savelli@Globo-Chem.com","(415) 835-1658","Manager, Hardware Procurement","Globo-Chem","4500 Durham Chapel Hill Boulevard","RTP","NC",27714,"USA","Biotechnology","Anna Bressan","Warm","Open"],["Brenda","See","See@Tessier-Ashpool.com","(415) 835-1655","Manager, Hardware Procurement","Tessier-Ashpool","80 T.W. Alexander Drive","Durham","NC",27715,"USA","Transportation","Phil Smith","Cold","Open"],["Christina","Sharron","Sharron@MammothPictures.com","(415) 835-1665","Manager, Hardware Procurement","Mammoth Pictures","2829 Aiello Dr #A","San Francisco","CA",94107,"USA","Biotechnology","Anna Bressan","Cold","Open"],["Dave","Simonds","Simonds@UniversalExport.com","(415) 835-1660","CIO","Universal Export","2830 Aiello Dr #A","Walnut Creek","CA",94600,"USA","Transportation","Phil Smith","Cold","Open"],["Brandi","Thomas","Thomas@SombraCorporation.com","(415) 242-9230","CIO","Sombra Corporation","4031 East Cornwallis Road","Raleigh","NC",27722,"USA","Manufacturing","Matt Wilson","Hot","Open"],["Chris","Thomas","Thomas@WesternGasElectric.com","(415) 835-1664","Director of Information Systems","Western Gas & Electric","201 E. Santa Clara St","San Francisco","CA",94106,"USA","Biotechnology","Anna Bressan","Hot","Open"],["Debi","Tonra","Tonra@Virtucon.com","(415) 835-1662","Manager, Hardware Procurement","Virtucon","1260 1/2 11th Ave.","Walnut Creek","CA",94602,"USA","Biotechnology","Anna Bressan","Warm","Open"],["Bill","Westgard","Westgard@LuthorCorp.com","(415) 835-1662","Manager, Hardware Procurement","LuthorCorp","81 T.W. Alexander Drive","RTP","NC",27718,"USA","Technology","Phil Smith","Cold","Open"],["Annie","Wishnie","Wishnie@GalaxyCorp.com","(415) 835-1657","Director of Information Systems","Galaxy Corp","4030 East Cornwallis Road","Raleigh","NC",27713,"","Biotechnology","Anna Bressan","Hot","Open"],["Cat","Wong","Wong@StricklandPropane.com","(415) 835-1660","Director of IT","Strickland Propane","81 T.W. Alexander Drive","Chapel Hill","NC",27720,"USA","Manufacturing","Matt Wilson","Hot","Open"],["Allen","Zimmers","Zimmers@QWERTYLogistics.com","(415) 835-1662","Director of Information Systems","QWERTY Logistics","735 Crocker Ave","San Francisco","CA",94113,"","Telecommunications","Phil Smith","Cold","Open"]]');
            if(data.length > 0){

                let headers = data[0];
                let records = data.slice(1).map( e => {
                    let item = {}
                    e.map( (element, index) => {
                        item[headers[index]] = element;
                        item['sobjectType'] = 'Lead';
                    }); 
                    return item;                          
                }); 

                for(let i=0; i<headers.length;i++){
                    headers[i] ==              
                    console.log(headers[i]); 
                }

                console.log(records); 
                console.log('headers'); 
                console.log(headers); 
                console.log(JSON.parse(JSON.stringify(this.allFields))); 
               
            }



            



            this.isLoading= false;
            this.etapa1 = false;
            this.etapa2 = true;

        } catch (error) {
            console.log('openfileUpload error');   
            console.log(error);   
        }


    }



    
    handleChange(event){
        let name = event.target.name; 
        let value = event.target.value; 
        switch (name) {
            case 'object':
                this.completStepOne(value);               
                break;
            case 'action':
                this.completStepTwo(value);               
                break;
            case 'format':
                this.configuration['accept'] = value;               
                break;
            case 'file':
                this.openfileUpload(event.target.files[0]);               
                break; 
            case 'enter-search':
                this.searchFilds(value);               
                break;     
        }

    }

    handleClick(event){
        let name = event.target.name; 
        switch (name) {
         case 'modal-close':
            this.closeModal();               
            break;
        case 'modal-save':
            this.closeModal();               
            break;   
        case 'change-field':
            this.openModal();               
            break;       
        }
    }

    openModal(){
        
        this.showModal = true;
    }

    closeModal(){
        this.showModal = false;
        this.fieldList = this.allFields;
    }

    completStepOne(value){
        this.configuration['object'] = value;
    }

    completStepTwo(value){
        this.configuration['action'] = value;
    }



    searchFilds(value){        
        var name = value.toLowerCase();
        if(value != ''){
            this.fieldList = this.allFields.filter( (element) => {
                let label = element.label.toLowerCase();
                if(label.indexOf(name) !=-1 )
                    return element;
            });
        }else{
            this.fieldList = this.allFields;
        }
    }

    getObjectFields(){
        console.log('getObjectFields');
        let data = JSON.parse('[{"accessible":false,"formula":true,"label":"Account ID","lookup":true,"name":"Id","reference":"()","type":"ID","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Deleted","lookup":false,"name":"IsDeleted","reference":"()","type":"BOOLEAN","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Master Record ID","lookup":false,"name":"MasterRecordId","reference":"(Account)","type":"REFERENCE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Name","lookup":false,"name":"Name","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Type","lookup":false,"name":"Type","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Parent Account ID","lookup":false,"name":"ParentId","reference":"(Account)","type":"REFERENCE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing Street","lookup":false,"name":"BillingStreet","reference":"()","type":"TEXTAREA","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing City","lookup":false,"name":"BillingCity","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing State/Province","lookup":false,"name":"BillingState","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing Zip/Postal Code","lookup":false,"name":"BillingPostalCode","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing Country","lookup":false,"name":"BillingCountry","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing Latitude","lookup":false,"name":"BillingLatitude","reference":"()","type":"DOUBLE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing Longitude","lookup":false,"name":"BillingLongitude","reference":"()","type":"DOUBLE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing Geocode Accuracy","lookup":false,"name":"BillingGeocodeAccuracy","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Billing Address","lookup":false,"name":"BillingAddress","reference":"()","type":"ADDRESS","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping Street","lookup":false,"name":"ShippingStreet","reference":"()","type":"TEXTAREA","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping City","lookup":false,"name":"ShippingCity","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping State/Province","lookup":false,"name":"ShippingState","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping Zip/Postal Code","lookup":false,"name":"ShippingPostalCode","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping Country","lookup":false,"name":"ShippingCountry","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping Latitude","lookup":false,"name":"ShippingLatitude","reference":"()","type":"DOUBLE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping Longitude","lookup":false,"name":"ShippingLongitude","reference":"()","type":"DOUBLE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping Geocode Accuracy","lookup":false,"name":"ShippingGeocodeAccuracy","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Shipping Address","lookup":false,"name":"ShippingAddress","reference":"()","type":"ADDRESS","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Phone","lookup":false,"name":"Phone","reference":"()","type":"PHONE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Fax","lookup":false,"name":"Fax","reference":"()","type":"PHONE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Number","lookup":false,"name":"AccountNumber","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Website","lookup":false,"name":"Website","reference":"()","type":"URL","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Photo URL","lookup":false,"name":"PhotoUrl","reference":"()","type":"URL","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"SIC Code","lookup":false,"name":"Sic","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Industry","lookup":false,"name":"Industry","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Annual Revenue","lookup":false,"name":"AnnualRevenue","reference":"()","type":"CURRENCY","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Employees","lookup":false,"name":"NumberOfEmployees","reference":"()","type":"INTEGER","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Ownership","lookup":false,"name":"Ownership","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Ticker Symbol","lookup":false,"name":"TickerSymbol","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Description","lookup":false,"name":"Description","reference":"()","type":"TEXTAREA","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Rating","lookup":false,"name":"Rating","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Site","lookup":false,"name":"Site","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Owner ID","lookup":false,"name":"OwnerId","reference":"(User)","type":"REFERENCE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Created Date","lookup":false,"name":"CreatedDate","reference":"()","type":"DATETIME","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Created By ID","lookup":false,"name":"CreatedById","reference":"(User)","type":"REFERENCE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Last Modified Date","lookup":false,"name":"LastModifiedDate","reference":"()","type":"DATETIME","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Last Modified By ID","lookup":false,"name":"LastModifiedById","reference":"(User)","type":"REFERENCE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"System Modstamp","lookup":false,"name":"SystemModstamp","reference":"()","type":"DATETIME","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Last Activity","lookup":false,"name":"LastActivityDate","reference":"()","type":"DATE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Last Viewed Date","lookup":false,"name":"LastViewedDate","reference":"()","type":"DATETIME","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Last Referenced Date","lookup":false,"name":"LastReferencedDate","reference":"()","type":"DATETIME","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Data.com Key","lookup":false,"name":"Jigsaw","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Jigsaw Company ID","lookup":false,"name":"JigsawCompanyId","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Clean Status","lookup":false,"name":"CleanStatus","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Account Source","lookup":false,"name":"AccountSource","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"D-U-N-S Number","lookup":false,"name":"DunsNumber","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Tradestyle","lookup":false,"name":"Tradestyle","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"NAICS Code","lookup":false,"name":"NaicsCode","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"NAICS Description","lookup":false,"name":"NaicsDesc","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Year Started","lookup":false,"name":"YearStarted","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"SIC Description","lookup":false,"name":"SicDesc","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"D&B Company ID","lookup":false,"name":"DandbCompanyId","reference":"(DandBCompany)","type":"REFERENCE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Operating Hour ID","lookup":false,"name":"OperatingHoursId","reference":"(OperatingHours)","type":"REFERENCE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Customer Priority","lookup":false,"name":"CustomerPriority__c","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"SLA","lookup":false,"name":"SLA__c","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Active","lookup":false,"name":"Active__c","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Number of Locations","lookup":false,"name":"NumberofLocations__c","reference":"()","type":"DOUBLE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Upsell Opportunity","lookup":false,"name":"UpsellOpportunity__c","reference":"()","type":"PICKLIST","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"SLA Serial Number","lookup":false,"name":"SLASerialNumber__c","reference":"()","type":"STRING","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"SLA Expiration Date","lookup":false,"name":"SLAExpirationDate__c","reference":"()","type":"DATE","writeRequiresMasterRead":false},{"accessible":false,"formula":true,"label":"Marlon Formula","lookup":false,"name":"Marlon_Formula__c","reference":"()","type":"STRING","writeRequiresMasterRead":true},{"accessible":false,"formula":true,"label":"Asset","lookup":false,"name":"marlobasset__c","reference":"(Asset)","type":"REFERENCE","writeRequiresMasterRead":false}]');
       //let data = JSON.parse('{"Account ID":"Id","Deleted":"IsDeleted","Master Record ID":"MasterRecordId","Account Name":"Name","Account Type":"Type","Parent Account ID":"ParentId","Billing Street":"BillingStreet","Billing City":"BillingCity","Billing State/Province":"BillingState","Billing Zip/Postal Code":"BillingPostalCode","Billing Country":"BillingCountry","Billing Latitude":"BillingLatitude","Billing Longitude":"BillingLongitude","Billing Geocode Accuracy":"BillingGeocodeAccuracy","Billing Address":"BillingAddress","Shipping Street":"ShippingStreet","Shipping City":"ShippingCity","Shipping State/Province":"ShippingState","Shipping Zip/Postal Code":"ShippingPostalCode","Shipping Country":"ShippingCountry","Shipping Latitude":"ShippingLatitude","Shipping Longitude":"ShippingLongitude","Shipping Geocode Accuracy":"ShippingGeocodeAccuracy","Shipping Address":"ShippingAddress","Account Phone":"Phone","Account Fax":"Fax","Account Number":"AccountNumber","Website":"Website","Photo URL":"PhotoUrl","SIC Code":"Sic","Industry":"Industry","Annual Revenue":"AnnualRevenue","Employees":"NumberOfEmployees","Ownership":"Ownership","Ticker Symbol":"TickerSymbol","Account Description":"Description","Account Rating":"Rating","Account Site":"Site","Owner ID":"OwnerId","Created Date":"CreatedDate","Created By ID":"CreatedById","Last Modified Date":"LastModifiedDate","Last Modified By ID":"LastModifiedById","System Modstamp":"SystemModstamp","Last Activity":"LastActivityDate","Last Viewed Date":"LastViewedDate","Last Referenced Date":"LastReferencedDate","Data.com Key":"Jigsaw","Jigsaw Company ID":"JigsawCompanyId","Clean Status":"CleanStatus","Account Source":"AccountSource","D-U-N-S Number":"DunsNumber","Tradestyle":"Tradestyle","NAICS Code":"NaicsCode","NAICS Description":"NaicsDesc","Year Started":"YearStarted","SIC Description":"SicDesc","D&B Company ID":"DandbCompanyId","Operating Hour ID":"OperatingHoursId","Customer Priority":"CustomerPriority__c","SLA":"SLA__c","Active":"Active__c","Number of Locations":"NumberofLocations__c","Upsell Opportunity":"UpsellOpportunity__c","SLA Serial Number":"SLASerialNumber__c","SLA Expiration Date":"SLAExpirationDate__c"}');
   
       console.log(data); 

        this.allFields = data;
        this.fieldList = this.allFields;




    }




}