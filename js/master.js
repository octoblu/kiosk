$(document).ready(function(){
  var conn = meshblu.createConnection({});
  conn.on('ready', function(data){
    console.log('Ready', data);
    conn.subscribe({uuid: '3f05c000-dd6e-11e4-bea4-6baf4218425e'}, function(data){
      console.log('subscribe', data);
    });
    conn.on('error', console.log);
    conn.on('message', function(msg){
      var winner = msg.winner;
      $('.winner').text('@' + winner.screen_name);
      $('.chicken-dinner').text(winner.text);
    });
  });
})
