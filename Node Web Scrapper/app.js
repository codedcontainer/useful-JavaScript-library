var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var fs = require('fs');
var crawler = require('simplecrawler'); 

var dataUrl = ""; 
var contentDiv = ""; 

var sCrawler = crawler.crawl(dataUrl).on('fetchcomplete', function(queueItem)
{
	var url = queueItem.url;
	var fileName = url.substring( url.lastIndexOf('/')+1 ); 
	request(queueItem.url, function(error, response, body) //queue the url 
	{
		if(!error && response.statusCode == 200)
		{
			$ = cheerio.load(body) 
			var content = $(contentDiv).html();
			var mainHeader = $(contentDiv+' h1').text();
			var image = $(contentDiv+' img');  
			image.each(function(index, value){
				var imageName = value.attribs.src.substring(value.attribs.src.lastIndexOf('/')+1 ); 
				var imageLocation = dataUrl+value.attribs.src;
				imageLocation = imageLocation.replace('../../','/'); 
				request(imageLocation).pipe(fs.createWriteStream('images/'+imageName)).on('close', function(){});
			}); 
			fs.writeFile('pages/'+fileName, '<!--Start-->\n'+content+'\n <!--End-->', function(err)
			{
				if(err)
				{
					console.log('error')
				}
			});
		} 
	}); 
});




 