public with sharing class AccountTriggerHandler extends TriggerHandler {

    //public OpportunityTriggerHandler() {
       // this.newOppMap = (Map<Id, Opportunity>) Trigger.newMap;
      //}

    public override void beforeUpdate() {
        System.debug('beforeUpdate');        
        for(Account o : (List<Account>) Trigger.new) {
            System.debug('item =>'+o);
        }
    }
  
    public override void afterInsert() {
        System.debug('afterInsert');        
        for(Account o : (List<Account>) Trigger.new) {
            System.debug('item =>'+o);
        }
    }


    public override void afterUpdate() {
        System.debug('afterUpdate');     
        Map<Id,Account> old =  (Map<Id,Account>) Trigger.oldMap;
        List<Account> news = (List<Account>) Trigger.new;
        System.debug('old =>'+old);
        System.debug('new =>'+news);
    }
    
}