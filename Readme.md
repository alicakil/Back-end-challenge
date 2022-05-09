<h1>Back-end challenge</h1>
<br>
<h3>Run</h3>
Go to Models/Context.cs and modify connectionstring for your local machine then run.<br>
App will create a initial database and sample data. <br>
For each startup database will be recreated for a refresh testing (global.ajax)<br>
 <br>
<h3>Updates</h3>
•	For a persistent database, I installed entity framework. <br>
•	Data desing is a little bit changed, ItemDbo can hold all fields related to stock for this example. <br>
•	Key  attribute added to id fields to make primary field. <br>
•	Sample data and database creation code added to global.ajax. <br>
•	Sample data modified; id values from 1,1,1,1 to  1,2,3,4. Because we need unique fields are a must. <br>
•	Class diagram added for a clear view (ClassDiagram.cd) <br>
•	Repositories are modified <br>
•	Backend functionaliy completed as described in the <a href="https://github.com/alicakil/Back-end-challenge/tree/master/docs">document</a>. (OrderController/Submit) <br>
•	UnitTesting added for the backend functionality <br>
 <br>

<h3>Improvment Suggestions</h3>
Database model can be improved, seperated tables and fields. Such as, <br>
Order Table, OrderDetail table, UserOrders for following transactions. <br>
ilogger implemetation. <br>