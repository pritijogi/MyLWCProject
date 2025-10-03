public with sharing class AccountControllerOne {

    @AuraEnabled
    public static Account createAccount(String accName, String accRating, String accNumber) {
        Account acc = new Account();
        acc.Name = accName;
        acc.Rating = accRating; // Updated to use the Rating field
        acc.AccountNumber = accNumber; // Updated to use the Account Number field
        insert acc;
        return acc;
    }

    @AuraEnabled
    public static void deleteAccount(Id accountId) {
        delete [SELECT Id FROM Account WHERE Id = :accountId LIMIT 1];
    }
}