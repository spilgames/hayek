var colors = require('colors/safe');

exports.log = function(agent, packet) {
  var inwards = agent !== packet.source;

  var c = colors.cyan
  if( packet.level === 'ERROR') c = colors.red
  if( packet.level === 'WARN') c = colors.yellow

  console.log('\n%s %s %s %s\ntimestamp="%s"\ncid="%s"\n%s',
    c("[" + (packet.log || packet.demand || packet.signal) + "]"),
    c(packet.source),
    c(inwards ? '<-' : '->'),
    c(agent),
    packet.timestamp,
    packet.cid,
    formatLogPayload(packet.payload))
}

function formatLogPayload(payload) {
  return Object.keys(payload)
               .map(function(k) { return k + '="' + format(payload[k]) + '"' })
               .join('\n')
}

function format(value) {
  var inspect = require('util').inspect
  if( value === null || value === undefined ) return ''
  if( value.constructor.name === 'String' ) return value
  if( value.constructor.name === 'Number' ) return value
  return inspect(value)
}
