<template>
  <div ref="mygoChart" class="mygoChart"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAssetsFile } from '@/utils/share';
const mygoChart = ref<HTMLDivElement | null>(null);
const dealShow = () => {
  const go = window.go;
  const $ = go.GraphObject.make;
  var myDiagram = $(go.Diagram, mygoChart.value, {
    initialContentAlignment: go.Spot.Center, // 顶格显示
    'undoManager.isEnabled': true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
    'toolManager.hoverDelay': 100, //tooltip提示显示延时
    'toolManager.toolTipDuration': 10000, //tooltip持续显示时间
    //isReadOnly:true,//只读
    'grid.visible': false, //显示网格
    allowMove: true, //允许拖动
    allowDelete: false,
    allowCopy: false,
    allowClipboard: false,
    'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, //有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
    layout: $(go.TreeLayout, {
      angle: 90, //为0时流程图会水平放置，90的时候会垂直放置，也就是一个倾斜角度的问题，单位是度°
      layerSpacing: 35,
      alternateAngle: 90,
      alternateLayerSpacing: 35,
      alternateAlignment: go.TreeLayout.AlignmentBus,
      alternateNodeSpacing: 20,
    }),
  });
  // myDiagram.addDiagramListener('ObjectSingleClicked', function () {});
  //上颜色
  function colorBrushConverter(color: string) {
    if (color) return color;
    return 'orange';
  }
  myDiagram.nodeTemplate = $(
    go.Node,
    'Auto',
    {
      //节点模板样式设置
      isShadowed: true,
      shadowBlur: 1,
      shadowOffset: new go.Point(0, 1),
      shadowColor: 'rgba(0, 0, 0, .14)',
      selectionAdornmentTemplate: $(
        go.Adornment,
        'Auto',
        $(
          go.Shape,
          'RoundedRectangle',
          { fill: null, stroke: '#7986cb', strokeWidth: 3 }, //选中之后节点边框颜色
        ),
        $(go.Placeholder),
      ),
    },
    $(
      go.Shape,
      'RoundedRectangle',
      { fill: '#90CAF9', strokeWidth: 0 },
      new go.Binding('fill', 'color', colorBrushConverter),
    ),
    $(
      //Panel平板布局
      go.Panel,
      'Horizontal',
      { padding: 5 },
      $(
        go.Panel,
        'Vertical',
        $(
          go.Picture,
          { margin: 10, width: 50, height: 50 },
          new go.Binding('source', 'img'), //这里的img命名要和下面对应
        ),
      ),
      $(
        go.Panel,
        'Vertical',
        $(
          go.TextBlock,
          'Default Text',
          { margin: 12, stroke: '#fff', font: 'bold 16px sans-serif' },
          new go.Binding('text', 'name'), //这里的name命名要和下面对应
        ),
      ),
      {
        doubleClick: function () {
          //在Panel块，双击获取当前节点的信息
          // console.log("111", node.part.data);
        },
      },
    ),
  );
  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 15 }, //分开线的样式设置
    $(go.Shape, { strokeWidth: 2, stroke: '#66CCFF' }),
    $(go.Shape, { toArrow: 'Standard', fill: '#66CCFF', stroke: null }), //箭头
    $(go.TextBlock, { stroke: 'red', font: '20px' }, new go.Binding('text', 'linktext')),
    {
      toolTip: $(
        go.Adornment,
        'Auto',
        $(go.TextBlock, { margin: 4 }, new go.Binding('text', 'name')), //悬浮在线条时出现的提示框
      ),
    },
  );
  let myModel = $(go.TreeModel);
  myModel.nodeDataArray = [
    {
      key: '1',
      name: '总经理',
      color: '#70a1ff',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '2',
      parent: '1',
      name: '厂部',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '4',
      parent: '1',
      name: '财务部',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '5',
      parent: '2',
      name: '行政人事办',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '6',
      parent: '2',
      name: '采购',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '12',
      parent: '4',
      name: '会计',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '13',
      parent: '4',
      name: '出纳',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '14',
      parent: '5',
      name: '行政人事文员',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '15',
      parent: '5',
      name: '行政后勤',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '16',
      parent: '5',
      name: '包装设计',
      img: getAssetsFile('home/user.jpg'),
    },
    {
      key: '24',
      parent: '16',
      name: '工厂加工',
      img: getAssetsFile('home/user.jpg'),
    },
  ];
  myDiagram.model = myModel;
  myDiagram.commandHandler.zoomToFit(); //自适应，能看到流程图全部
};
onMounted(() => {
  dealShow();
});
</script>

<style scoped>
.mygoChart {
  height: calc(100vh - 120px);
  width: 100%;
}
</style>
