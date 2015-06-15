$(document).ready(function(){
  var conn = meshblu.createConnection({});
  conn.on('ready', function(data){
    console.log('Ready', data);
    data.type = 'octoblu:kiosk';
    data.discoverWhitelist = [data.uuid];
    conn.update(data);
    var url = 'https://kiosk.octoblu.com/kiosk.html#!' + data.uuid + '/' + data.token;
    $('.save-uuid').text(data.uuid)
    $('.save-url').html('<a href="'+url+'">'+url+'</a>');
    conn.on('error', console.log);
  });
})
