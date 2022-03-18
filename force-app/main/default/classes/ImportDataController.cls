public with sharing class ImportDataController {

    /*******************************************************************************************************
    * @description 
    * @param objectName 
    */
    @AuraEnabled(cacheable=true)
    public static List<ObjectFields> getObjectFields(String objectName){
        //String objectName = 'Account';
        List<ObjectFields> result = new List<ObjectFields>();
        SObjectType objToken = Schema.getGlobalDescribe().get(objectName);
        DescribeSObjectResult objDef = objToken.getDescribe();
        Map<String, SObjectField> fields = objDef.fields.getMap();        
        Map<String, String> allFields = new Map<String, String>();
        Set<String> fieldSet = fields.keySet();
        for(String s:fieldSet){
            SObjectField fieldToken = fields.get(s);
            DescribeFieldResult selectedField = fieldToken.getDescribe();
            ObjectFields field = new ObjectFields(
                String.valueOf(selectedField.getLabel()),
                String.valueOf(selectedField.getName()),
                String.valueOf(selectedField.getType()),
                String.valueOf(selectedField.getReferenceTo()),
                Boolean.valueOf(selectedField.isAccessible()),
                Boolean.valueOf(selectedField.isWriteRequiresMasterRead()),
                Boolean.valueOf(selectedField.isCalculated()),
                Boolean.valueOf(selectedField.isIdLookup())
            );
            
            /*
                            label = String.valueOf(selectedField.getLabel()), 
                teste  = String.valueOf(selectedField.getName()), 
                type  = String.valueOf(selectedField.getType()), 
                */
            System.debug(' =============================== ');
            System.debug('getLabel => '+selectedField.getLabel());
            System.debug('getName => '+selectedField.getName());
            System.debug('getType => '+selectedField.getType());
            System.debug('isAccessible() => '+selectedField.isAccessible()); //o usuario pode ver esse campo
            System.debug('isWriteRequiresMasterRead() => '+selectedField.isWriteRequiresMasterRead());
            System.debug(' isCalculated() => '+selectedField.isCalculated()); //campo formula
            System.debug('isIdLookup() => '+selectedField.isIdLookup()); //se é um campo referencia
            System.debug('getReferenceTo() => '+selectedField.getReferenceTo()); //se é um campo referencia
            System.debug(' =============================== ');


            result.add(field);
            allFields.put(selectedField.getLabel(), selectedField.getName());
        }
        return result;
    }

    /*******************************************************************************************************
    * @description 
    * @param objectName 
    */
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getObjectNames(List<String> objectNames){
        Map<String, String> result = new Map<String, String>();
        for(String forS : objectNames){
            SObjectType objToken = Schema.getGlobalDescribe().get(forS);
            DescribeSObjectResult objDef = objToken.getDescribe();            
            result.put(String.valueOf(objDef.getLabel()), forS);
        }
        return result;
    }

    
    

   


    /*******************************************************************************************************
    * @description 
    * @param objectName 
    */
    @AuraEnabled(cacheable=false)
    public static void hanlderAction(List<SObject> records){

    }




    /*******************************************************************************************************
    * @description 
    * @param objectName 
    */
    @AuraEnabled(cacheable=false)
    public static void createdRecords(List<SObject> records){}


    /*******************************************************************************************************
    * @description 
    * @param objectName 
    */
    @AuraEnabled(cacheable=false)
    public static void deletedRecords(List<SObject> records){}


    /*******************************************************************************************************
    * @description 
    * @param objectName 
    */
    @AuraEnabled(cacheable=false)
    public static void updateRecords(List<SObject> records){}


    public class ObjectFields{
        @AuraEnabled public String label {get; set;}
        @AuraEnabled public String name {get; set;}
        @AuraEnabled public String type {get; set;}
        @AuraEnabled public String reference {get; set;}
        @AuraEnabled public Boolean lookup {get; set;}
        @AuraEnabled public Boolean formula {get; set;}
        @AuraEnabled public Boolean accessible {get; set;}
        @AuraEnabled public Boolean writeRequiresMasterRead {get; set;}

        public ObjectFields(String label, String name, String type, String reference, Boolean formula, Boolean accessible, Boolean writeRequiresMasterRead, Boolean lookup){
            this.label = label; 
            this.name  = name; 
            this.type  = type; 
            this.reference  = reference; 
            this.lookup = lookup;
            this.formula = formula;
            this.accessible = accessible;
            this.writeRequiresMasterRead = writeRequiresMasterRead;
        }

        public ObjectFields(String label){
            this.label = label; 
        }

        public ObjectFields(){}
 
    }





}