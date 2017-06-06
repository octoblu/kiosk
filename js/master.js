$(document).ready(function(){
  var conn = meshblu.createConnection({});
  conn.on('ready', function(data){
    console.log('Ready', data);

    var baseUrl = location.protocol + "//" + location.host;
    var url = baseUrl + '/kiosk.html#!' + data.uuid + '/' + data.token;
    var claimUrl = "https://app.octoblu.com/node-wizard/claim/" + data.uuid + "/" + data.token;

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
    data.octoblu = {
      "links": [
        {
          "title": "View Kiosk",
          "url": url
        }
      ]
    };
    conn.update(data);

    $('.claim-button').attr("href", claimUrl);
    $('.save-uuid').text(data.uuid);
    $('.save-token').text(data.token);
    $('.save-url').html('<a href="'+url+'">'+url+'</a>');
    conn.on('error', console.log);
  });
})
