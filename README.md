# Common JavaScript Objects for Common Tasks 
Useful set of tools to automate the creating of things using JavaScript Objects.
I have been trying to keep everything written in plain JavaScript to allow flexibily between web applications. There are a few refrences to the JQuery library so it is important this be installed as well.

1. A Href String Generator  
2. BreadCrumb Creator
3. Simple HTML AJAX
4. Radio Button Value To DOM
5. Radio Button On Change
6. Grab and Serialize Form Data
7. Ajax Send w/ Modal Popup
8. Reorder A list with links
9. Dropdown Sub Menu Height
10. Equal Height of child divs
11. IE Image Replace    

## Additional Tools
<b>ASP Send Mail</b><br/>
Inside of the "ASP Email Submit" directory there is a folder that will send any of your forms to the selected email using ASP. This can also be utilized with #6 and #7 of the JavaScript Object tools by sending the serialized form data to this file. <br/>
<b>Steps for Execution:</b><br/>
1. Change the name values inside of this file <br/>
2. Add any additional CC's <br/>
3. Return false the form submit button <br/>
4. Send the serialzed data to the form using AJAX (#6 & #7)

===
<b>Node Web Scraper</b> <br/>
The tools also includes a app.js file which incorporates Node.js and several modules to web scrape a website. The scrapper creates a start and end tag on each of the pages for each find and replace with use of any IDE of your choosing. This tools also scrapes files of various types such as .js and .css when it comes in contact with them. In addition, the scrapper grabs images and saves them to a seperate directory. If a div container is selected then these "extra" files will remain empty. Unless you need support for this you will need to incorporate conditions based on file types.<br/>
<b>Steps for Execution:</b> <br/>
1. Download all dependancies for the application using npm <br/>
2. Add a pages and images folder <br/>
3. Update the variables in app.js for the website of your choosing and the main div for scrapping

