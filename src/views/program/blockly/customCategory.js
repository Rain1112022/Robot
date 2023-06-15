
import * as Blockly from 'blockly/core'
class CustomCategory extends Blockly.ToolboxCategory {
//类别定义:(categoryDef: CategoryInfo),在工具箱中创建类别所需的信息
//parentToolbox:(parentToolbox: IToolbox),类别的父级工具箱
//选择启用父级:( opt_parent?: ICollapsibleToolboxItem);(（可选）父级工具箱项，如果类别没有父级，则为 null。)
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }
  addColourBorder_(colour){
    this.rowDiv_.style.backgroundColor = colour;
  }

  setSelected(isSelected){
    var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
    if (isSelected) {
      this.rowDiv_.style.backgroundColor = 'white';
      labelDom.style.color = this.colour_;
      this.iconDom_.style.color = this.colour_;
    } else {
      this.rowDiv_.style.backgroundColor = this.colour_;
      labelDom.style.color = 'white';
      this.iconDom_.style.color = 'white';
    }
    Blockly.utils.aria.setState(
      (this.htmlDiv_),
      Blockly.utils.aria.State.SELECTED, isSelected);
  }
  createIconDom_() {
    const iconImg = document.createElement('img');
    iconImg.src = new URL('/src/assets/image/Icon_subprogram.png', import.meta.url).href;
    // iconImg.src = '/src/assets/image/Icon_subprogram.png';
    iconImg.alt = 'Blockly Logo';
    iconImg.width = '25';
    iconImg.height = '25';
    return iconImg;
  }
}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,//插件的类型。（例如，Field、Renderer）
    Blockly.ToolboxCategory.registrationName, //插件的名称。（例如 field_angle、geras）
    CustomCategory,//	要注册的类或对象。
true); //（可选）值为 True 时，可替换替换已经注册的内容时出错。
