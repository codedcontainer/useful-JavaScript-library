/* ========================================== */
/* Common JavaScript Objects for Common Tasks */
/* 1. A Href String Generator                 */
/* 2. BreadCrumb Creator                      */
/* 3. Simple HTML AJAX                        */
/* 4. Radio Button Value To DOM               */
/* 5. Radio Button On Change                  */
/* 6. Grab and Serialize Form Data            */
/* 7. Ajax Send w/ Modal Popup                */
/* 8. Reorder A list with links               */
/* 9. Dropdown Sub Menu Height                */
/* 10. Equal Height of child Divs             */
/* 11. IE Image Replace                       */
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
    pageTitle: '', //dependant on h# tag
    h3Title : '', 
    findPageUrl: '', 
    parentTitle: '',
    urlArray: [],
    pageUrl: '', 
    singlePage: false,
    parPrint: function()
    {
        this.pageTitle = $(this.parameters+' h2').first().text();
        this.h3Title = $(this.parameters+' h3').first().text();
    },
     newtitle: function()
    {
        if ( this.pageTitle == '' )
        {
            this.pageTitle = this.h3Title;
        }
    },
    createUrlArray: function()
    {
        this.urlArray = this.urlName.split('/');
        this.urlArray = this.urlArray.splice(4);
        //adds the file name and the page before in array. exludes a "pages directory"
        if (this.urlArray.length < 2)
        {
            this.singlePage = true; 
        }  
    },
    removeLast: function()
    {
        for ( i = 0; i<=this.urlArray.length -3; i++ )
        {
            this.breadString = this.breadString + this.urlArray[i].toUpperCase() + this.icon; 
        }
        var sampleArray = this.urlArray[i]; 
       
        if ( this.singlePage == true)
        {
            this.breadString = this.breadString; 
        }
        else {
             this.breadString = this.breadString + this.parentTitle + this.icon;
        }
    },
   
    findPage: function(findPageUrl)
    { 
        var pageUrl = '';
        var last = this.urlArray.length; 
        last = this.urlArray[last-1]; //name of the document with extension 
        $('nav ul li a').each(function(index,value)
        {
            var newUrl =  $(this).attr('href'); //gets all the href values of every nav link 
            newUrl =  newUrl.indexOf(last); //see if document name is in the navigation system 
            var parent = $(value).hasClass('dropdown-toggle' ); //do not use if there is a duplicate parent 
            if(newUrl != -1 && parent == false ) // if the page is in the navigation system 
            {
                breadcrumb.parentTitle = $(this).parent().parent().parent().find('a').eq(0).text();
                breadcrumb.pageUrl = $(this).html(); 
                console.log( typeof(breadcrumb.pageUrl)) ;

                if (breadcrumb.pageUrl == "")
                {
                    breadcrumb.pageUrl = breadcrumb.urlName.substring(breadcrumb.urlName.lastIndexOf('/')+1); 
                    console.log(breadcrumb.pageUrl);
                }
            }
        });
    },
    printString: function()
    {
        this.parPrint();
        this.createUrlArray();
        this.findPage(); 
        this.removeLast();
        this.newtitle(); 
        this.findPage();
        if (this.singlePage == false)
        {
            this.breadString = this.breadString + aString.createString(this.urlName, this.pageUrl);
        return "<div class='crumNav'>"+this.breadString+"</div>";
        }
        else{
            this.breadString = this.breadString + aString.createString(this.urlName, this.pageTitle); 
            return "<div class='crumNav'>"+this.breadString+"</div>";
        }
        
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
/*    forms.init(true) -> Adds autocomplete and session save */
/*    and needs to be called independatly from click hander  */
/* ========================================================= */
var forms = {
        allData:'',
        newArray: [],
        arrayFun: [],
        ohYea: '',
        //inject the id of first for every select option
        init: function(complete){
            if(complete == true)
            {
                this.autocomplete();
                this.loadCache();
            }
        },
        autocomplete: function()
        {
            $('form [name]').attr('autocomplete','true');
        },
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
            this.cacheSerialize(this.newArray);           
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
        },
        cacheSerialize: function(data)
        {
            $.each(data, function(index,value){
                document.cookie= value[0] + '=' + value[1]; 
            });
        },
        loadCache: function()
        {
            var cookies = document.cookie;
            cookies = cookies.split(';'); 
            $.each(cookies, function(indexa, cookieString){
                var formNames = $('form [name]');
                $.each(formNames, function(index,value){ 
                var formName = $(this).attr('name'); 
                var inValue = cookieString.search(formName) 
                if(inValue != -1) 
                  {
                    var cookieSplit = [];
                    cookieSplit.push(cookieString.split('='));
                    cookieSplit[0][1] = cookieSplit[0][1].replace(/%40/g,'@');
                    cookieSplit[0][1] = cookieSplit[0][1].replace(/\+/g, ' ');
                    cookieSplit[0][1] = cookieSplit[0][1].replace(/%2C/g,',');
                    cookieSplit[0][1] = cookieSplit[0][1].replace(/%2B/g,'+');
                    $('[name='+formName+']').val(cookieSplit[0][1]);
                  }
                });
            });
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
/*      ajax.send(this);                                     */
/*      }).after(ajax.modal, ajax.modalError);               */
/* ========================================================= */
var ajax = {
    url: '',
    async: 'false',
    data: '',
    method: 'post',
    modal: '<div id="myModal" class="modal fade" style="top: 100px;"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><button type="button" class="close" data-dismiss="modal">&times;</button>Your Form Was Succesfully Sent</div><div class="modal-footer"><button type="button" class="btn btn-primary">Close</button></div></div></div></div>', 
    /* append a Bootstrap modal to the form submit button */
    modalError: '<div id="myModalError" class="modal fade" style="top: 100px;"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><button type="button" class="close" data-dismiss="modal">&times;</button>Your Form Was Not Succesfully Sent. Please refresh the page and try again.</div><div class="modal-footer"><button type="button" class="btn btn-primary">Close</button></div></div></div></div>', 
    send:function(id){
        $('.modal .modal-footer button, button.close').click(function(){
            $('.modal').css({'opacity':0, 'display': 'none'});
        });
        console.log(id);
        $.ajax({
            url: ajax.url,
            data: ajax.data, 
            async: ajax.async,
            method: ajax.method,
            success: function(e){
                var btnId = id.getAttribute('id');
                console.log(btnId);
                $('#myModal').css({'opacity': 1, 'display':'inline'});

                $('#'+btnId).attr('disabled','disabled');
            },
            error: function()
            {
                $('#myModalError').css({'opacity': 1, 'display':'inline'});
                $('#'+btnId).removeAttr('disabled');
            }
        });
    }
};
/* ========================================================= */
/* 8. Reorder A list with links                              */
/* Great for sitemap links or other lists. The js helper     */
/* should not be loaded every time as this will take times   */
/*    EXECUTION:                                             */
/*      The result should be copied and                      */ 
/*       pasted back into the page.                          */
/*       listOrder(reorder(id))                              */  
/* ========================================================= */
var listOrder = {
    reorder: function(id)
    {
        var innerA = [];
        var innerB = [];
        var innerC = [];
        var list = $('ul#'+id+' li a'); 
        $.each( list, function(index, value){
            innerA.push(value.innerHTML); 
            innerB.push(value);  
        });
            innerA.sort(); 
        $.each(innerA, function(indexa, valuea){
            $.each(innerB,function(indexb, valueb){
                if( valueb.innerHTML == valuea )
                {
                 innerC.push("<a href='"+valueb+"'>"+valuea + "</a>");    
                }
            }); 
        });
        $('ul#'+id).empty(); 
        $.each(innerC, function(indexC, valueC){
            $('ul#'+id).append('<li>'+valueC+'</li>');
        });
    }
}
/* ========================================================= */
/* 9. Dropdown Sub Menu Height                               */
/* Keeps the top height of the submenu even with the height  */
/* of the listed item                                        */
/* should not be loaded every time as this will take times   */
/*    EXECUTION:                                             */
/*        1.) Add what one li height value equals            */ 
/*        2.) Make sure to add .firstSub to first li in ul   */
/*        3.) Breadcrumb.begin() to start                    */  
/* ========================================================= */
var dropdown = {
    liHeight: 0,
    begin: function(){
        $('nav li.firstSub a').hover(function(){
            var numbers = $(this).parent().index();
            var childrenBool = $(this).parent().has('ul');
            if (childrenBool != '')
            {
                $(this).parent().find('ul').css('top', (numbers * dropdown.liHeight )) ; 
            }
        })
    }
}
/* ========================================================= */
/* 10. Equal Height of children divs                         */
/* Sometimes you cannot get equal heights with flexbox or    */
/* with display table. This is especially true if you are    */ 
/* using bootstrap columns or if you are not able to create  */
/* new rows and have to create a clearfix class div.         */    
/*    EXECUTION:                                             */
/*     1.) Set your parent div heightBalance.containerName   */
/*     2.) Set your child div heightBalance.childElements    */
/*     3.) Execute heightBalance.cal()                       */  
/* ========================================================= */
var heightBalance = {
    containerName:  '',
    childElements: '', 
    heightArray: [], 
   calc: function(){
       var divs = $(this.containerName + " " + this.childElements); 
       $.each(divs, function(index, value){
        var innHeight = $(value).height(); ; 
        heightBalance.heightArray.push(innHeight); 
       });  
       this.largestHeight(this.heightArray); 
   },
   largestHeight: function(data)
   {
       var i = data.indexOf(Math.max.apply(Math, data));
       $(heightBalance.childElements).height(this.heightArray[i] ); 
   }
}
/* ========================================================= */
/* 10. IE Image Replace                                      */
/* IE CSS filters no longer work from version 9 and above.   */ 
/* You might have images that need to be inverted, these     */ 
/* images can be substituted. Even if you don't have a svg   */
/* invert issue this will still work for any other           */
/* image in IE                                               */    
/*    EXECUTION:                                             */
/*     1.) Substitute image with image id                    */
/* ========================================================= */
var ieImage = {
    changeImage: function(newImage, elementId)
    {
        var ua = window.navigator.userAgent;
        var edge = ua.indexOf('Edge');
        var msie = ua.indexOf('MSIE ');
        
        if (msie > 0 || edge > 0)
        {
            $(elementId).attr('src',newImage);
        }
    }
}
