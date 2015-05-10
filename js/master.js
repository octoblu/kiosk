$(document).ready(function(){
  var conn = meshblu.createConnection({});
  conn.on('ready', function(data){
    console.log('Ready', data);
    data.type = 'octoblu:kiosk';
    data.discoverWhitelist = [data.uuid];
    conn.update(data);
    $('.save-url').text('https://kiosk.octoblu.com/' + data.uuid + '/' + data.token);
    conn.on('error', console.log);
  });
})
