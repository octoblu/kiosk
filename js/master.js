$(document).ready(function(){
  var conn = meshblu.createConnection({});
  conn.on('ready', function(data){
    console.log('Ready', data);
    data.type = 'device:kiosk';
    data.discoverWhitelist = [data.uuid];
    data.messageSchema = {
      "type": 'object',
      "properties": {
        "url": {
          "type": "string",
          "required": false
        },
        "text": {
          "type": "string",
          "required": false
        },
        "textStyles": {
          "type": "string",
          "required": false
        },
        "html": {
          "type": "string",
          "required": false
        }
      }
    };
    conn.update(data);
    var baseUrl = location.protocol + "//" + location.host;
    var url = baseUrl + '/kiosk.html#!' + data.uuid + '/' + data.token;
    $('.save-uuid').text(data.uuid);
    $('.save-token').text(data.token);
    $('.save-url').html('<a href="'+url+'">'+url+'</a>');
    conn.on('error', console.log);
  });
})
