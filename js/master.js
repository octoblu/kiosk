$(document).ready(function(){
  var conn = meshblu.createConnection({});
  conn.on('ready', function(data){
    console.log('Ready', data);
    data.type = 'device:kiosk';
    data.discoverWhitelist = [data.uuid];
    conn.update(data);
    var baseUrl = location.protocol + "//" + location.host;
    var url = baseUrl + '/kiosk.html#!' + data.uuid + '/' + data.token;
    $('.save-uuid').text(data.uuid);
    $('.save-token').text(data.token);
    $('.save-url').html('<a href="'+url+'">'+url+'</a>');
    conn.on('error', console.log);
  });
})
