# Sample Projects on Blockchain

This is a basic distributed application built using Ethereum and MEAN technologies.
----------------------------------------------------------

Description

"BookMyConcert" Dapp is designed with the intent of understanding end to end data flow and working of Ethereum.
A smart contract is designed in Solidity language whose compiled code is deployed on Geth.
When the contract is mined on Geth, it returns an address. The address returned is used in the web application to interact with the Ethereum blockchain contract. 

The project is that already registered users on Ethereum can login to the site and can book tickets giving their username and password and also the number of tickets they want to buy.
The request will be sent to Server where the contract function for booking tickets will be called. 
After successful booking of tickets on Ethereum blockchain, a particular event will be fired. And then the data will be stored in MongoDb database also.
The status of tickets booking i.e. Usernames along with the number of tickets they have bought will be visible on front end.
Structuring of project and including package.json file is in progress.
----------------------------------------------------------

Future Enhancements:-


#Registering users before signing up.

#Assigning accounts dynamically on Ethereum to the registered users from the web application.
  
#Creating two types of users i.e. "Organiser" and "Buyer."

#Organisers can initiate multiple concerts on the website.

#To verify the identity of Organisers, some proof of id documnets can be asked to upload at the site before organising any concert.

#Different status can be visible on the site to different users according to the user type.

#Direct fetching of status from Ethereum Blockchain.

#Providing tokens with ticket numbers to the buyers of tickets.

