import * as Blockly from 'blockly/core'
import {javascriptGenerator} from 'blockly/javascript';
import { ref, reactive, watch, toRaw, computed } from "vue";
import store from "@/store/index.js"


Blockly.Blocks['reset'] = {
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
  const code = `reset-(0,0,0,0,0,0)-reset`;
  return code;
};

Blockly.Blocks['speed'] = {
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
  const code = `speed-${value_speed}-speed`;
  return code;
};

Blockly.Blocks['delay_send'] = {
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

javascriptGenerator['delay_send'] = function(block) {
  const value_delaysen = javascriptGenerator.valueToCode(block, 'delaySend', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `delay_send-${value_delaysen}-delay_send`;
  return code;
};

Blockly.Blocks['delay_execution'] = {
  init: function() {
    this.jsonInit({
      "message0": "延迟执行 %1 秒",
      "args0": [
        {
          "type": "input_value",
          "name": "delayExecution"
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

javascriptGenerator['delay_execution'] = function(block) {
  const value_delayexecution = javascriptGenerator.valueToCode(block, 'delayExecution', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `delay_execution-${value_delayexecution}-delay_execution`;
  return code;
};

Blockly.Blocks['joint_move'] = {
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
          "name": "J1",
          "check": "Number"
        },
        {
          "type": "field_label_serializable",
          "name": "J2",
          "text": "关节二"
        },
        {
          "type": "input_value",
          "name": "J2",
          "check": "Number"
        },
        {
          "type": "field_label_serializable",
          "name": "B2",
          "text": "关节三"
        },
        {
          "type": "input_value",
          "name": "B2",
          "check": "Number"
        },
        {
          "type": "field_label_serializable",
          "name": "J5",
          "text": "关节四"
        },
        {
          "type": "input_value",
          "name": "J5",
          "check": "Number"
        },
        {
          "type": "field_label_serializable",
          "name": "J6",
          "text": "关节五"
        },
        {
          "type": "input_value",
          "name": "J6",
          "check": "Number"
        },
        {
          "type": "field_label_serializable",
          "name": "T1",
          "text": "关节六"
        },
        {
          "type": "input_value",
          "name": "T1",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": null,
      "helpUrl": null,
      
    });
  }
};

javascriptGenerator['joint_move'] = function(block) {
  const value_j1 =javascriptGenerator.valueToCode(block, 'J1',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_j2 =javascriptGenerator.valueToCode(block, 'J2',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_b2 =javascriptGenerator.valueToCode(block, 'B2',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_j5 =javascriptGenerator.valueToCode(block, 'J5',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_j6 =javascriptGenerator.valueToCode(block, 'J6',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_t1 =javascriptGenerator.valueToCode(block, 'T1',javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  // const code = `{joint_move:[{J1:${value_j1}},{J2:${value_j2}},{B2:${value_b2}},{J5:${value_j5}},{J6:${value_j6}},{T1:${value_t1}}]},`;
  const code =`joint_move-(${value_j1},${value_j2},${value_b2},${value_j5},${value_j6},${value_t1})-joint_move`;
  return code;
};

Blockly.Blocks['tcp_move'] = {
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

javascriptGenerator['tcp_move'] = function(block) {
  const value_x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_z = javascriptGenerator.valueToCode(block, 'Z', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_rx = javascriptGenerator.valueToCode(block, 'Rx', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_ry = javascriptGenerator.valueToCode(block, 'Ry', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const value_rz = javascriptGenerator.valueToCode(block, 'Rz', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `tcp_move-(${value_x},${value_y},${value_z},${value_rx},${value_ry},${value_rz})-tcp_move`;
  return code;
};

Blockly.Blocks['terminal_position'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1 移动 %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "Axis",
          "options": [
            [
              "X",
              "x"
            ],
            [
              "Y",
              "y"
            ],
            [
              "Z",
              "z"
            ]
          ]
        },
        {
          "type": "input_value",
          "name": "position",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

javascriptGenerator['terminal_position'] = function(block) {
  const dropdown_axis = block.getFieldValue('Axis') || '\'\'';
  const value_position = javascriptGenerator.valueToCode(block, 'position', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `terminal_position-(${dropdown_axis},${value_position})-terminal_position`;
  return code;
};

Blockly.Blocks['single_joint_revolve'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "jointName",
          "options": [
            [
              "关节一",
              "J1"
            ],
            [
              "关节二",
              "J2"
            ],
            [
              "关节三",
              "B2"
            ],
            [
              "关节四",
              "J5"
            ],
            [
              "关节五",
              "J6"
            ],
            [
              "关节六",
              "T1"
            ]
          ]
        },
        {
          "type": "field_label_serializable",
          "name": "revolve",
          "text": "旋转"
        },
        {
          "type": "input_value",
          "name": "jointAngle",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

javascriptGenerator['single_joint_revolve'] = function(block) {
  const dropdown_jointname = block.getFieldValue('jointName') || '\'\'';
  const value_jointangle = javascriptGenerator.valueToCode(block, 'jointAngle', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `single_joint_revolve-(${dropdown_jointname},${value_jointangle})-single_joint_revolve`;
  return code;
};

Blockly.Blocks['loop'] = {
  init: function () {
    this.jsonInit({
      "message0": "重复 %1 %2 次 %3 执行 %4",
      "args0": [
        {
          "type": "field_label_serializable",
          "name": "count",
          "text": ""
        },
        {
          "type": "input_value",
          "name": "count"
        },
        {
          "type": "input_dummy"
        },
        {
          "type": "input_statement",
          "name": "do"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

javascriptGenerator['loop'] = function(block) {
  const value_count = javascriptGenerator.valueToCode(block, 'count',javascriptGenerator.ORDER_ATOMIC) || '0';
  const statements_do = javascriptGenerator.statementToCode(block, 'do');
  const code = `loop-${value_count}{${statements_do}}-loop`;
  return code;
};

Blockly.Blocks['option_move'] = {
  tempOption:function(){
    const option_point = computed(()=> {
      return store.state.teaching.teachPoint
    })
    let res = []
    if(option_point.value.length){
      option_point.value.forEach((item, index) => {
        res[index] = [`${item.name}`, `${item.val}`]
      })
      return res
    }else{
      return [['空', '空']]
    }
  },
  init: function () {
    this.jsonInit({
      "message0": "%1 至点 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "dropdown",
      "options": [
        [
          "关节运动",
          "joint"
        ],
        [
          "tcp运动",
          "tcp"
        ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "teach_point",
      "options": this.tempOption 
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

javascriptGenerator['option_move'] = function(block) {
  const dropdown_name = block.getFieldValue('dropdown')
  const dropdown_value =block.getFieldValue('teach_point');
  // const dropdown_value =javascriptGenerator.valueToCode(block, 'input',javascriptGenerator.ORDER_ATOMIC) || '';
  const code = `${dropdown_name}_move-(${dropdown_value})-${dropdown_name}_move`;
  return code;
};

Blockly.Blocks['point_option'] = {
  tempOption:function(){
    const option_point = computed(()=> {
      return store.state.teaching.teachPoint
    })
    let res = []
    if(option_point.value.length){
      option_point.value.forEach((item, index) => {
        res[index] = [`${item.name}`, `${item.val}`]
      })
      return res
    }else{
      return [['空', '空']]
    }
    
    
  },
  init: function () {
    this.jsonInit({
      "message0": "%1",
  "args0": [
    {
      "type":  "field_dropdown",
      "name": "points",
      "options": this.tempOption
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

javascriptGenerator['point_option'] = function(block) {
  const dropdown_points = block.getFieldValue('points')
  // const dropdown_value =javascriptGenerator.valueToCode(block, 'input',javascriptGenerator.ORDER_ATOMIC) || '';
  const code = `${dropdown_points}`;
  return [code, javascriptGenerator.ORDER_NONE];
};

Blockly.Blocks['move_to_point'] = {
  init: function () {
    this.jsonInit({
      "message0": "%1 至点 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "dropdown",
      "options": [
        [
          "关节运动",
          "joint"
        ],
        [
          "tcp运动",
          "tcp"
        ],
      ]
    },
    {
      "type": "input_value",
      "name": "input",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": "",
    });
    const _this = this;
    this.setTooltip(function(){
      return 'Add a target point to command !'.replace('%1',_this.getFieldValue('dropdown'))
    })
  }
};

Blockly.Extensions.register('warning_on_change', function() {
  this.setOnChange(function(changeEvent) {
    if (this.getInput('input').connection.targetBlock()) {
      this.setWarningText(null);
    } else {
      this.setWarningText('Must have an input block.');
    }
  });
});

javascriptGenerator['move_to_point'] = function(block) {
  const dropdown_name = block.getFieldValue('dropdown')
  const input_value = javascriptGenerator.valueToCode(block, 'input', javascriptGenerator.ORDER_ATOMIC) || '\'\'';
  const code = `${dropdown_name}_move-(${input_value})-${dropdown_name}_move`;
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


