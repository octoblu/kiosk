'use strict';

var connection = meshblu.createConnection({
  uuid: location.hash.substring(2).split('/')[0],
  token: location.hash.substring(2).split('/')[1]
});

var currentUrl;

connection.once('ready', function(data){
  console.log('ready');
  $('#text').fitText();
  connection.whoami({}, function(result){
    result = result || {};
    if(result.error){
      return console.log('whoami error', result);
    }
    updateKiosk(result);
  });
});

connection.on('message', function(message){
  var object = {};
  object.url = getProperty(message, 'url');
  object.text = getProperty(message, 'text');
  object.textStyles = getProperty(message, 'textStyles');
  object.html = getProperty(message, 'html');
  updateKiosk(object);
});

function getProperty(message, key){
  var value = message[key];
  if(!value){
    var payload = message.payload || {};
    value = payload[key];
  }
  return value;
}

function updateKiosk(object){
  object = object || {};
  resetKioskElements();

  if(object.url && currentUrl !== object.url){
    console.log('Opening URL', object.url);
    currentUrl = object.url;

    prepStageForRender();
    renderIframe(object.url);

    return;
  }

  if(object.text){
    console.log('Showing Text', object.text, 'with styles', object.textStyles);

    prepStageForRender();
    renderText(object.text);
    updateStyles(object.textStyles);

    return;
  }

  if(object.html){
    console.log('Showing HTML', object.html);

    prepStageForRender();
    renderHtml(object.html);
    updateStyles(object.textStyles);

    return;
  }
}

function prepStageForRender() {
  $('#loading-indicator').hide();
  $('#kiosk-elements').show();
}

function renderText(text) {
  $('#text')
    .show()
    .text(text);
}

function renderIframe(url) {
  $('#iframe')
    .attr('src', url)
    .show();
}

function renderHtml(html) {
  $('#html')
    .html(html)
    .show();
}

function updateStyles(styles) {
  if (!styles) return;

  if (typeof styles === 'string') {
    $('#kiosk-elements').attr('style', styles);
    return;
  }

  if (typeof styles === 'object') {
    $('#kiosk-elements').css(styles);
  }
}

function resetKioskElements() {
  console.log('Reseting Kiosk Elements');
  $('.kiosk-element')
    .hide()
    .empty();

  $('#kiosk-elements')
    .attr('style', '')
    .css({});
}
