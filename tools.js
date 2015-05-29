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

  var breadcrumb = {
    hostname: window.location.host,
    urlName: window.location + '',
    icon : ' >> ',
    breadString: aString.createString(this.hostname, 'Home') + ' >> ',
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
     urlArray : function()
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
        return this.breadString;

    }
  };