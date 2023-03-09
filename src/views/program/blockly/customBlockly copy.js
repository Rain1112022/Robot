import * as Blockly from 'blockly/core'
import {javascriptGenerator} from 'blockly/javascript';

export const reset = Blockly.Blocks['reset'] = {
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_label_serializable",
          "name": "reset",
          "text": "复位"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": null,
      "helpUrl": null
    });
  }
};

javascriptGenerator['reset'] = function(block) {
  const code = `{"reset":[0,0,0,0,0,0]};`;
  return code;
};

export const speed = Blockly.Blocks['speed'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1 %2",
      "args0": [
        {
          "type": "field_label_serializable",
          "name": "speed",
          "text": "速度："
        },
        {
          "type": "input_value",
          "name": "speed"
        }
      ],
      "inputsInline": true,
      "output": null,
      "colour": 230,
      "tooltip": null,
      "helpUrl": null
    });
  }
};

javascriptGenerator['speed'] = function(block) {
  const value_speed = javascriptGenerator.valueToCode(block, 'speed', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `{speed:${value_speed}};`;
  return code;
};

export const delaysend = Blockly.Blocks['delaysend'] = {
  init: function() {
    this.jsonInit({
      "message0": "延迟下发 %1 秒",
      "args0": [
        {
          "type": "input_value",
          "name": "delaySend"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": null,
      "helpUrl": null
    });
  }
};

javascriptGenerator['delaysend'] = function(block) {
  const value_delaysen = javascriptGenerator.valueToCode(block, 'delaySend', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `{delaysend:${value_delaysen}};`;
  return code;
};

export const delayexecution = Blockly.Blocks['delayexecution'] = {
  init: function() {
    this.jsonInit({
      "message0": "延迟下发 %1 秒",
      "args0": [
        {
          "type": "input_value",
          "name": "delaySend"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": null,
      "helpUrl": null
    });
  }
};

javascriptGenerator['delayexecution'] = function(block) {
  const value_delayexecution = javascriptGenerator.valueToCode(block, 'delayExecution', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `{delayexecution:${value_delayexecution}};`;
  return code;
};

export const jointmove = Blockly.Blocks['jointmove'] = {
  init: function() {
    this.jsonInit({
      "message0": "旋转到： %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12",
      "args0": [
        {
          "type": "field_label_serializable",
          "name": "J1",
          "text": "关节一"
        },
        {
          "type": "input_value",
          "name": "J1"
        },
        {
          "type": "field_label_serializable",
          "name": "J2",
          "text": "关节二"
        },
        {
          "type": "input_value",
          "name": "J2"
        },
        {
          "type": "field_label_serializable",
          "name": "B2",
          "text": "关节三"
        },
        {
          "type": "input_value",
          "name": "B2"
        },
        {
          "type": "field_label_serializable",
          "name": "J5",
          "text": "关节四"
        },
        {
          "type": "input_value",
          "name": "J5"
        },
        {
          "type": "field_label_serializable",
          "name": "J6",
          "text": "关节五"
        },
        {
          "type": "input_value",
          "name": "J6"
        },
        {
          "type": "field_label_serializable",
          "name": "T1",
          "text": "关节六"
        },
        {
          "type": "input_value",
          "name": "T1"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": null,
      "helpUrl": null
    });
  }
};

javascriptGenerator['jointmove'] = function(block) {
  const value_j1 =javascriptGenerator.valueToCode(block, 'J1',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_j2 =javascriptGenerator.valueToCode(block, 'J2',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_b2 =javascriptGenerator.valueToCode(block, 'B2',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_j5 =javascriptGenerator.valueToCode(block, 'J5',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_j6 =javascriptGenerator.valueToCode(block, 'J6',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_t1 =javascriptGenerator.valueToCode(block, 'T1',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `{jointmove:[{J1:${value_j1}},{J2:${value_j2}},{B2:${value_b2}},{J5:${value_j5}},{J6:${value_j6}},{T1:${value_t1}}]};`;
  return code;
};

export const tcpmove = Blockly.Blocks['tcpmove'] = {
  init: function() {
    this.jsonInit({
      "message0": "移动到： %1 X %2 Y %3 Z %4 %5 Rx %6 Ry %7 Rz %8",
      "args0": [
        {
          "type": "field_label_serializable",
          "name": "Axis",
          "text": "坐标："
        },
        {
          "type": "input_value",
          "name": "X"
        },
        {
          "type": "input_value",
          "name": "Y"
        },
        {
          "type": "input_value",
          "name": "Z"
        },
        {
          "type": "field_label_serializable",
          "name": "Angle",
          "text": "方向："
        },
        {
          "type": "input_value",
          "name": "Rx"
        },
        {
          "type": "input_value",
          "name": "Ry"
        },
        {
          "type": "input_value",
          "name": "Rz"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": null,
      "helpUrl": null
    });
  }
};

javascriptGenerator['tcpmove'] = function(block) {
  const value_x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_z = javascriptGenerator.valueToCode(block, 'Z', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_rx = javascriptGenerator.valueToCode(block, 'Rx', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_ry = javascriptGenerator.valueToCode(block, 'Ry', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_rz = javascriptGenerator.valueToCode(block, 'Rz', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `{tcpmove:[{J1:${value_x}},{J2:${value_y}},{B2:${value_z}},{J5:${value_rx}},{J6:${value_ry}},{T1:${value_rz}}]};` ;
  return code;
};






























export const text = Blockly.Blocks['add_text'] = {
  init: function() {
    this.jsonInit({
      'type': 'add_text',
      'message0': 'Add text %1 with color %2',
      'args0': [
        {
          'type': 'input_value',
          'name': 'TEXT',
          'check': 'String',
        },
        {
          'type': 'input_value',
          'name': 'COLOR',
          'check': 'Colour',
        },
      ],
      'previousStatement': null,
      'nextStatement': null,
      'colour': 160,
      'tooltip': '',
      'helpUrl': '',
    });
  }
};

javascriptGenerator['add_text'] = function(block) {
  const text = javascriptGenerator.valueToCode(block, 'TEXT',
  javascriptGenerator.ORDER_NONE) || '\'\'';
const color = javascriptGenerator.valueToCode(block, 'COLOR',
  javascriptGenerator.ORDER_ATOMIC) || '\'#ffffff\'';

const addText = javascriptGenerator.provideFunction_(
  'addText',
  ['function ' + javascriptGenerator.FUNCTION_NAME_PLACEHOLDER_ +
      '(text, color) {',
  '  // Add text to the output area.',
  '  const outputDiv = document.getElementById(\'output\');',
  '  const textEl = document.createElement(\'p\');',
  '  textEl.innerText = text;',
  '  textEl.style.color = color;',
  '  outputDiv.appendChild(textEl);',
  '}']);
// Generate the function call for this block.
const code = `${addText}(${text}, ${color});\n`;
return code;
};


