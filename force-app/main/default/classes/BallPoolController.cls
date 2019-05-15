public with sharing class BallPoolController {

    static Id ozLottoRecTypeId;

    @AuraEnabled(cacheable=true)
    public static List<Ball_Pool__c> getOZLottoBallList() {
        getRecordTypeIds();

        List<Ball_Pool__c> ozLottoBalls = new List<Ball_Pool__c>();
        ozLottoBalls = [SELECT Id, Name, Ball_Number__c FROM Ball_Pool__c WHERE RecordTypeId =: ozLottoRecTypeId ORDER BY Ball_Number__c];

        return ozLottoBalls;
    }


    static void getRecordTypeIds() {

        Map<String,Schema.RecordTypeInfo> recTypeMapByDevNameBallPool = Schema.SObjectType.Ball_Pool__c.getRecordTypeInfosByDeveloperName();
       
        ozLottoRecTypeId = recTypeMapByDevNameBallPool.get('OZ_Lotto').getRecordTypeId();
    }

}

