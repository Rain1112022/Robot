
## defineProps 和 defineEmits 
- 都是只能在 `<script setup> `中使用的编译器宏。他们不需要导入，且会随着 `<script setup>` 的处理过程一同被编译掉;
- 传入到 defineProps 和 defineEmits 的选项会从 setup 中提升到模块的作用域。因此，传入的选项不能引用在 setup 作用域中声明的局部变量。这样做会引起编译错误。但是，它可以引用导入的绑定，因为它们也在模块作用域内;


## defineExpose
- 使用 `<script setup> `的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在` <script setup> `中声明的绑定,可以通过 defineExpose 编译器宏来显式指定在 `<script setup> `组件中要暴露出去的属性;
- 当父组件通过模板引用的方式获取到当前组件的实例，获取到的实例会像这样 { a: number, b: number } (ref 会和在普通实例中一样被自动解包);

## useSlots() 和 useAttrs()：
- 在 `<script setup>` 使用 slots 和 attrs 的情况应该是相对来说较为罕见的，因为可以在模板中直接通过 $slots 和 $attrs 来访问它们。在你的确需要使用它们的罕见场景中，可以分别用 useSlots 和 useAttrs 两个辅助函数：
- useSlots 和 useAttrs 是真实的运行时函数，它的返回与 setupContext.slots 和 setupContext.attrs 等价。
- 它们同样也能在普通的组合式 API 中使用。

## three.js
### 相机PerspectiveCamera 和 OrthographicCamera
- three.js中提供了两种基本的照相机，分别是正投影相机OrthographicCamera和透视投影相机PerspectiveCamera。透视投影照相机对应投影到的物体的大小是随着距离逐渐变小的，而正投影照相机投影到的物体大小是不受距离影响的
- 透视投影相机PerspectiveCamera
  - 透视投影相机模式一般用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式，该构造函数总共有四个参数，分别是fov，aspect，near，far 。
    - fov表示摄像机视锥体垂直视野角度，最小值为0，最大值为180，默认值为50，实际项目中一般都定义45，因为45最接近人正常睁眼角度；
    - aspect表示摄像机视锥体长宽比，默认长宽比为1，即表示看到的是正方形，实际项目中使用的是屏幕的宽高比；
    - near表示摄像机视锥体近端面，这个值默认为0.1，实际项目中都会设置为1；
    - far表示摄像机视锥体远端面，默认为2000，这个值可以是无限的，说的简单点就是我们视觉所能看到的最远距离。
  - 透视投影相机的位置和position，up，lookAt有关系。position用来指定相机在三维坐标中的位置，up用来指定相机拍摄时相机头顶的方向，lookAt表示相机拍摄时指向的中心点
### 光源
- 环境光源THREE.AmbientLight
  - 场景当中添加了THREE.AmbientLight光源，光源的颜色将会影响全局的每一个物体每一个面的颜色。该光源没有特别得来源方向，也不会产生阴影。 通常不会使用THREE.AmbientLight作为场景内的唯一光源，一般配合点光源或者平行光等光源使用。其作用是为了弱化阴影或给场景添加一些额外的颜色。个人感觉重要的作用是，不添加环境光源，如果点光源照射不到的面，three.js压根就不绘制照射不到的面
- DirectionalLight平行光可以看作距离很远的光。它发出的所有光线都是平行的。比如太阳光，由于太阳离我们很远，我们可以把太阳的光线看作是平行的。

### THREE.AxesHelper
- Threejs里通过AxesHelper 类，可以创建一个可视化的三维坐标系,参数轴的线的大小，默认为 1
- hreejs中采用的是右手坐标系:红线是X轴，绿线是Y轴，蓝线是Z轴
### 网格辅助线GridHelper
- GridHelper 本质上是对线模型对象 Line 的封装，纵横交错的直线构成一个矩形网格模型对象。
- GridHelper( size : number, divisions : Number, colorCenterLine : Color, colorGrid : Color )
  - 参数说明:size -- 网格宽度，默认为 10  divisions -- 等分数，默认为 10 colorCenterLine -- 中心线颜色，默认 0x444444 colorGrid --  网格线颜色，默认为 0x888888
### 相机控件OrbitControls
- 通过OrbitControls.js可以对Threejs 的三维场景进行缩放，平移，旋转操作，其本质上改变的幷不是场景，而是相机的参数
- 鼠标操作：通过拖动鼠标左键可以720旋转展示三维场景，通过拖动鼠标右键可以平移三维场景，通过上下滚动鼠标中键可以缩放三维场景。
- 使用相机空间OrbitControls创建一个相机空间对象的时候，默认情况下，在浏览器的窗口整个内容区域body发生鼠标事件都会旋转、平移或缩放三维场景。但是在实际应用中如果需要控制OrbitControls的作用范围，你需要通过OrbitControls构造函数的第二个参数设置
- 执行THREE.OrbitControls构造函数时候，默认设置.target属性的值是Vector3(0,0,0),如果在执行new THREE.OrbitControls之前设置了camera.lookAt(特定位置);，相当于再次设置camera.lookAt(new THREE.Vector3(0,0,0))
- enableDamping: Boolean 默认false。设置为true则启用阻尼(惯性)，用来给控制相机一个重量，必须调用update()在你的animation循环中


### 格式信息

- 不同的三维模型格式能够包含的模型信息是不同的，比如.stl格式、.ply格式可以保存几何体顶点信息，但是没有材质信息；对于obj格式而言无法保存模型的动画信息，无法保存场景中的光源信息，也无法保存相机信息。对于GLTF而言，可以像FBX格式一样保存模型的材质、几何体信息，骨骼、变形动画数据，光源信息，相机信息，甚至自定义的着色器代码，也就是说GLTF基本上可以保存所有你想保存的三维场景信息;


## Blockly搭积木式可视化编程
### 引入blockly
- `npm install --save blockly`
- `import Blockly from 'blockly';`
  
### 注入或直接创建两种初始化方式
- 您可以通过调用 `Blockly.inject（location，options）` 来注入一个 `Blockly `工作区。 第一个参数告诉 `Blockly` 将工作空间注入 DOM 的位置。 第二个参数是用于配置的名称-值对字典。 注入代码将选项字典解析为 `Blockly.Options`的实例。

- 您还可以通过直接调用 `Blockly.WorkspaceSvg(new Blockly.Options(options))` 创建工作区。请注意，您需要调用 `new Blockly.Options(options)`，并传入您的选项字典——工作区构造函数需要一个实例 `Blockly.Options`，而不是裸选项字典。
- 
  ```
  // 引入Blockly
import Blockly from'blockly'
// 引入想要转换的语言，语言有php python dart lua javascript
import 'blockly/javascript'
// 引入语言包并使用
import * as hans from 'blockly/msg/zh-hans'
Blockly.setLocale(hans);

  ```

```
<!-- blockly工作区 -->
<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
<!-- blockly工具栏 -->
</xml id="toolbox" style="display: none">
  <category name="逻辑" colour="%{BKY_LOGIC_HUE}">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
  </category>
  <sep></sep>
  <category name="数学" colour="%{BKY_MATH_HUE}">
    <block type="math_number">
        <field name="NUM">123</field>
    </block>
    <block type="math_arithmetic"></block>
    <block type="math_single"></block>
  </category>
</xml>
<!-- blockly代码区 -->
<textarea name="" id="textarea" cols="30" rows="10"></textarea>
```