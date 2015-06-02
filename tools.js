/* ========================================== */
/* Common JavaScript Objects for Common Tasks */
/* 1. A Href String Generator                 */
/* 2. BreadCrumb Creator                      */
/* 3. Simple HTML AJAX                        */
/* 4. Radio Button Value To DOM               */
/* ========================================== */

/* ========================================== */
/* 1. A Href String Generator                 */
/*      EXECUTION :                           */
/*      aString.createString(location, text)  */
/*      PROPERTIES:                           */
/*      aString.location = location           */  
/*      aString.text = inside text            */
/* ========================================== */
var aString = {
    location: '',
    text: '', 
    createString: function(location, text)
    {
        if ( location != '')
        {
            this.location = location;
            this.text = text;  
        }
      
        string = "<a href='"+this.location+"'>"+this.text+"</a>";
        return string;
    }
  };

/* ================================================ */
/* 2. BreadCrumb Creator                            */
/* Creates a breadcrumb string based on the current */
/* URL structure and the current4 pages h2 or h3    */
/* This will exclude the first directory path,      */
/* in this case ".com/page". Page would be ignored  */ 
/*      EXECUTION :                                 */
/*      breadCrumb.printString()                    */   
//* =============================================== */

  var breadcrumb = {
    hostname: window.location.host,
    urlName: window.location + '',
    icon : ' >> ',
    breadString: aString.createString('/', 'Home') + ' >> ',
    parameters: '#main-content', //can change depending on which page you are on.
    pageTitle: '',
    h3Title : '', 
    urlArray: [],
    parPrint: function()
    {
        this.pageTitle = $(this.parameters+' h2').first().text();
        this.h3Title = $(this.parameters+' h3').first().text();

        return this.pageTitle;
        return this.h3Title; 
    },
    removeLast: function()
    {
        for ( i = 0; i<=this.urlArray.length -3; i++ )
        {
            this.breadString = this.breadString + this.urlArray[i].toUpperCase() + this.icon; 
        }
        this.breadString = this.breadString + this.urlArray[i] + this.icon;
    },
    //get main title which is a h2 if there is not a main title that ia h3
    newtitle: function()
    {
        if ( this.pageTitle == '' )
        {
            this.pageTitle = this.h3Title;
        }
        return this.pageTitle;
    },
    urlArray: function()
    {
        this.urlArray = this.urlName.split('/');
        this.urlArray = this.urlArray.splice(4);
        return this.urlArray;   
    },
    printString: function()
    {
        this.parPrint();
        this.urlArray();
        this.removeLast();
        this.newtitle(); 
        this.breadString = this.breadString + aString.createString(this.urlName, this.newtitle().toLowerCase() );
        return "<div class='crumNav'>"+this.breadString+"</div>";

    }
  };
/* ========================================================= */
/* 3. Simple HTML AJAX                                       */
/* Clicking on a link will replace the content               */
/* from that link into the specified div container           */
/* The page getting data needs to be simplified!             */
/*      EXECUTION:                                           */
/*      simpleAjax.replaceContent(domPath, replaceContainer) */
/*      domPath = clickable link to get data                 */
/*      replaceContainer = place to replace this new data    */   
/* ========================================================= */
var simpleAjax = {
    domPath : '',
    replaceContainer : '',
    replaceContent: function(domPath, replaceContainer){
         // make the link return false
        $(domPath).click(function(e){
            var currentLink = $(this).attr('href');

            $.ajax({
                url: currentLink,
                dataType: 'html',
                success: function(data){
                    $(replaceContainer).empty().append(data);
                }
            });
           e.preventDefault();
            return false;
        });
    }
};
/* ========================================================= */
/* 4. Radio Button Value To DOM                              */
/* Gets the value of a radio button on click and then uses   */   
/* that value inside of a string. This empties a dom element */
/* and replaces it with the new string.                      */
/*    EXECUTION:                                             */
/*    radioVal.printPop(name, domContent)                    */
/*    name = name of the radio button group                  */   
/*    domContent = tag to get emptied and replaced           */
/*        with string.                                       */
/* ========================================================= */
 var radioVal = {
        value: '',
        content: '',
        html: '',
        printPop: function(name, domContent)
        {
            $("input:radio[name="+name+"]").click(function(){
                this.value = $(this).val();
                
                //get the contents of the modal body and remove them.
                this.content = $(domContent);
                this.content.empty();
                //replace the contents with the following content

                this.html = "Thank you for submitting your ";
                this.html = this.html + this.value + " grievance."; 
                this.html = this.html + " Please verify that the grievance has been received by the intended recipient.";
                console.log(this.html);
                this.content.append(this.html);
            });
        }
    }
