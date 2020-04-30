;(function(undefined) {
'use strict';

if (typeof sigma === 'undefined')
  throw 'sigma is not declared';

// Initialize packages:
sigma.utils.pkg('sigma.canvas.labels');

/**
 * This label renderer will just display the label on the right of the node.
 *
 * @param  {object}                   node     The node object.
 * @param  {CanvasRenderingContext2D} context  The canvas context.
 * @param  {configurable}             settings The settings function.
 */
sigma.canvas.labels.def = function(node, context, settings) {
  var fontSize,
      prefix = settings('prefix') || '',
      size = node[prefix + 'size'],
      labelWidth = 0,
      labelPlacementX,
      labelPlacementY,
      alignment,
      charWidth;

  if (size < settings('labelThreshold'))
    return;
  var label = node.sigma_label || node.label;
  if (!label || typeof label !== 'string')
    return;

  if (settings('labelAlignment') === undefined){
    alignment = settings('defaultLabelAlignment');
  } else {
    alignment = settings('labelAlignment');
  }
  // context.rotate(-90 * Math.PI / 180);
  fontSize = (settings('labelSize') === 'fixed') ?
    settings('defaultLabelSize') :
    settings('labelSizeRatio') * size;

  context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
    fontSize + 'px ' + settings('font');
  context.fillStyle = (settings('labelColor') === 'node') ?
    (node.color || settings('defaultNodeColor')) :
    settings('defaultLabelColor');
  labelWidth = context.measureText('W').width * label.length + label.length / 2;
  charWidth = context.measureText('W').width;
  if (!node.direction || node.direction === 'up'){
    labelPlacementY = Math.round(node[prefix + 'y'] + fontSize / 3) - size - labelWidth;
  } else {
    labelPlacementY = Math.round(node[prefix + 'y'] + fontSize / 3) + size + fontSize;
  }
  // labelPlacementY = Math.round(node[prefix + 'y'] + fontSize / 3) - size - fontSize - labelWidth;
  labelPlacementX = Math.round(node[prefix + 'x'] - charWidth / 2 );
  for (var i = 0; i < label.length; i++){
      context.fillText(
        label.charAt(i),
        labelPlacementX,
        labelPlacementY
      );
      labelPlacementY = labelPlacementY + charWidth;
  }
};
}).call(this);
