annApp.service('rssFeed', ['$http', 'x2js', function($http, $q, x2js)
  {
    this.eventsTop = function(callbackFunc)
    {
        var events = [];
        $http.get('')
        .then(function successCallback(response){
          var news = new X2JS();
          var transform = news.xml_str2json(response.data);
          callbackFunc(true, transform);      
          }); 
     }
}]);

annApp.controller('calendar', function($http, $scope, rssFeed, $q)
{
  rssFeed.eventsTop(function(success, dataResponse)
  {
    if (success)
    {
      var newDate = moment(dataResponse.rss.channel.pubDate).format("MMM Do YYYY, h:mm:ss a");
      var month = moment(dataResponse.rss.channel.pubDate).format("MMMM"); 
      $scope.events= 
      {
          'title': dataResponse.rss.channel.title,
          'date': newDate, 
          'month': month,
          'link':dataResponse.rss.channel.link[0],
          'description':dataResponse.rss.channel.description
      }
    }
  });
}); 