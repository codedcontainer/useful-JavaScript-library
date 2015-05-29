 
/* ====================================================== */
/*				Custom JavaScript tools					  */
/*				-----------------------					  */
/*				1.) A link generator					  */
/*				2.) Breadcrumb generator				  */
/* ====================================================== */

/* ====================================================== */
/* 1.) Creates a link with two inputs (location, text)    */
/* ====================================================== */ 
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
  
/* ====================================================== */
/* 2.) Creates a breadcrumb string on pages. Uses h2 or   */
/*		h3 if nothing is set for h2						  */
/* ====================================================== */
  var breadcrumb = {
    hostname: window.location.host,
    urlName: window.location + '',
    breadString: breadString = "<a href='"+hostName+"'>Home</a> > ",
    parameters: '#main-content', //can change depending on which page you are on.
    pageTitle: '',
    h3Title : '', 
    urlArray: [],
    parPrint: function()
    {
        this.pageTitle = $(this.parameters+' h2').first().text();
        this.h3title = $(this.parameters+' h3').first().text();

        return this.pageTitle;
        return this.h3title; 
    },
    removeLast: function()
    {
        for ( i = 0; i<=this.urlArray.length -3; i++ )
        {
            this.breadString = this.breadString + this.urlArray[i] + " > "; 
        }
        this.breadString = this.breadString + this.urlArray[i] + " > ";
    },
    //get main title which is a h2 if there is not a main title that ia h3
    newtitle: function()
    {
        if ( this.pageTitle == '' )
        {
            this.pageTitle = h3Title;
        }
    },
     urlArray : function()
    {
        this.urlArray = this.urlName.split('/');
        this.urlArray = this.urlArray.splice(4);
        return urlArray; 
        
    },
    printString: function()
    {
        this.parPrint();
         this.urlArray();
        this.removeLast();
        this.newtitle(); 
        this.breadString = this.breadString + this.parPrint();
        return this.breadString;
    }
  };