/* ========================================== */
/* Common JavaScript Objects for Common Tasks */
/* 1. A Href String Generator                 */
/* 2. BreadCrumb Creator                      */
/* 3. Simple HTML AJAX                        */
/* 4. Radio Button Value To DOM               */
/* 5. Radio Button On Change                  */
/* 6. Grab and Serialize Form Data            */
/* 7. Ajax Send w/ Modal Popup                */
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
    findPageUrl: '', 
    parentTitle: '',
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
        var sampleArray = this.urlArray[i]; 
        this.breadString = this.breadString + this.parentTitle + this.icon;
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
    findPage: function(findPageUrl)
    { 
        var pageUrl = '';
        var last = this.urlArray.length; 
        last = this.urlArray[last-1];
        //return last;
        $('nav ul li a').each(function(index,value)
        {
            var newUrl =  $(this).attr('href');
           newUrl =  newUrl.indexOf(last); 
            if(newUrl != -1)
            {
                breadcrumb.parentTitle = $(this).parent().parent().parent().find('a').eq(0).text();
                breadcrumb.pageUrl = $(this).html();   
            }
        });
    },
    printString: function()
    {
        this.parPrint();
        this.urlArray();
        this.findPage(); 
        this.removeLast();
        this.newtitle(); 
        this.findPage(); 
        this.breadString = this.breadString + aString.createString(this.urlName, this.pageUrl);
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
/* ========================================================= */
/* 5. Radio Button On Change                                 */
/* Gets the value of a radio button group whenever there     */   
/* is a click inside of the main document.                   */
/* and replaces it with the new string.                      */
/*    EXECUTION:                                             */
/*      The function needs to be called inside               */
/*       of a click handler!                                 */
/*      radioChange.check(fieldset);                         */
/*       fieldset = fieldset or other DOM container          */ 
/* ========================================================= */
var radioChange = {
    check: function(fieldsetId) {
             if ( $(fieldsetId+" input[type='radio']").is(':checked') )
                {
                    isChecked = $(fieldsetId + " input[type='radio']").filter(':checked').val(); 
                    return isChecked;
                }          
        }
};
/* ========================================================= */
/* 6. Grab and Serialize Form Data                           */
/* Gets the value of all webform data for computations       */
/* also comes with the return of serialized data for ajax.   */
/*    EXECUTION:                                             */
/*    The function needs to be called from inside            */       
/*    of a click handler.                                    */
/*    Don't forget to return false on click.                 */   
/*    forms.submitDefault() -> Serializes all data for ajax  */
/*    forms.getVal(name)                                     */  
/*    forms.allData -> all serialzied data in var            */ 
/*        name = actual name of form item                    */
/* ========================================================= */
var forms = {
        allData:'',
        newArray: [],
        arrayFun: [],
        ohYea: '',
        //inject the id of first for every select option
        htmlInject : function ()
        {
            $('select option').eq(0).attr('id', 'first');
        },
        submitDefault: function() {
            forms.newArray = [];
            this.allData = $('form').serialize();  
            var splitString = this.allData.split('&');
            $.each(splitString, function(index, value)
            {
                 var splitArray = value.split('=');
                 forms.newArray.push(splitArray);       
            });            
        },
        getVal: function(name)
        {
            $.each(this.newArray, function(index,value){
                var foundIt = $.inArray(name, value);
                if (foundIt != -1)
                {
                   forms.ohYea = forms.newArray[index][1];
                   var strReplace = forms.ohYea.replace(/\+/g, ' '); 
                   forms.ohYea = strReplace;                   
                } 
            });
             return forms.ohYea;         
        }
    };
/* ========================================================= */
/* 7. Ajax Send w/ Modal Popup                               */
/* Uses the serialized data to send info to another page     */
/* Also comes with Bootstrap Modal.                          */
/*    EXECUTION:                                             */
/*      Fill out the following properties (url, data).       */
/*      Other properties are optional.                       */
/*      Make sure to append modal if using Bootstrap         */ 
/*    EXAMPLE:                                               */
/*      $('#submitBtn').on('click',function(e){              */
/*      e.preventDefault();                                  */
/*      forms.submitDefault();                               */
/*      $(this).attr('disabled','disabled');                 */
/*      ajax.url = '/sendMail.asp';                          */
/*      ajax.data = forms.allData;                           */
/*      ajax.send();                                         */
/*      }).after(ajax.modal);                                */
/* ========================================================= */
var ajax = {
    url: '',
    async: 'false',
    data: '',
    method: 'post',
    modal: '<div id="myModal" class="modal fade" style="top: 100px;"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><button type="button" class="close" data-dismiss="modal">&times;</button>Your Form Was Succesfully Sent</div><div class="modal-footer"><button type="button" class="btn btn-primary">Close</button></div></div></div></div>', 
    /* append a Bootstrap modal to the form submit button */
    modalError: '<div id="myModalError" class="modal fade" style="top: 100px;"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><button type="button" class="close" data-dismiss="modal">&times;</button>Your Form Was Not Succesfully Sent. Please refresh the page and try again.</div><div class="modal-footer"><button type="button" class="btn btn-primary">Close</button></div></div></div></div>', 
    send:function(){
        $('.modal .modal-footer button, button.close').click(function(){
            $('.modal').css({'opacity':0, 'display': 'none'});
        });

        $.ajax({
            url: ajax.url,
            data: ajax.data, 
            async: ajax.async,
            method: ajax.method,
            success: function(e){
                $('#myModal').css({'opacity': 1, 'display':'inline'});
            },
            error: function()
            {
                $('#myModalError').css({'opacity': 1, 'display':'inline'});
            }
        });
    }
};
