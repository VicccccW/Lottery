global with sharing class GlobalUtility {

    //Utility method for getting DeveloperName->Record Type map for an object. Consumes 1 SOQL query
    public static Map<String, RecordType> getObjectRecordTypes(String objectApi){
        Map<String, RecordType> recordTypes = new Map<String, RecordType>();
        //Query record types
        List<RecordType> recordTypeList = [SELECT Id, Name, DeveloperName FROM RecordType WHERE SObjectType = :objectApi];
        for (RecordType rti : recordTypeList)
            //Add to map
            recordTypes.put(rti.DeveloperName, rti);
        return recordTypes;
    }
}
