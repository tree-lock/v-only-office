import { ref } from "vue";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
/** 新建Rect */
const rectItemInit = (config: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const rect = new Konva.Rect({
    ...config,
    draggable: true,
    fill: `#ffffff33`,
    stroke: "#2d3137",
    strokeWidth: 2,
    name: "rect",
  });
  rect.on("transform", () => {
    rect.setAttrs({
      width: Math.max(rect.width() * rect.scaleX(), 5),
      height: Math.max(rect.height() * rect.scaleY(), 5),
      scaleX: 1,
      scaleY: 1,
    });
  });
  return rect;
};
/** 新建框 */
const selectionRectInit = (
  stage: Konva.Stage,
  layer: Konva.Layer,
  tr: Konva.Transformer
) => {
  const selectionRectangle = new Konva.Rect({
    fill: "rgba(0,0,255,0.5)",
    visible: false,
  });
  let x1: number, y1: number, x2: number, y2: number;
  stage.on("mousedown touchstart", (e: KonvaEventObject<MouseEvent>) => {
    // do nothing if we mousedown on any shape
    if (e.target !== stage || !e.evt.ctrlKey) {
      return;
    }
    e.evt.preventDefault();
    const position = stage.getPointerPosition();
    if (position) {
      x1 = position.x;
      y1 = position.y;
      x2 = position.x;
      y2 = position.y;
    }

    selectionRectangle.visible(true);
    selectionRectangle.width(0);
    selectionRectangle.height(0);
  });

  stage.on("mousemove touchmove", (e: KonvaEventObject<MouseEvent>) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    const position = stage.getPointerPosition();
    if (position) {
      x2 = position.x;
      y2 = position.y;
    }

    selectionRectangle.setAttrs({
      x: Math.min(x1, x2) / stage.scaleX(),
      y: Math.min(y1, y2) / stage.scaleY(),
      width: Math.abs(x2 - x1) / stage.scaleX(),
      height: Math.abs(y2 - y1) / stage.scaleY(),
    });
  });
  stage.on("mouseup touchend", (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectangle.visible(false);
    });
    const rect = rectItemInit({
      x: selectionRectangle.x(),
      y: selectionRectangle.y(),
      width: selectionRectangle.width(),
      height: selectionRectangle.height(),
    });

    layer.add(rect);
  });

  // clicks should select/deselect shapes
  stage.on("click tap", function (e: KonvaEventObject<MouseEvent>) {
    // if we are selecting with rect, do nothing
    if (selectionRectangle.visible()) {
      return;
    }
    // if click on empty area - remove all selections
    if (e.target === stage) {
      tr.nodes([]);
      return;
    }
    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName("rect")) {
      return;
    }
    tr.nodes([e.target]);
  });

  return selectionRectangle;
};

const initWindowDrag = (stage: Konva.Stage, selectionRectangle: Konva.Rect) => {
  let draggingWindow: boolean = false;
  const draggingContext = {
    x: 0,
    y: 0,
    scrollTop: 0,
    scrollLeft: 0,
  };
  stage.on("mousedown", (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === stage && !e.evt.ctrlKey) {
      // 鼠标拖拽滑动窗口
      draggingWindow = true;
      stage.container().style.cursor = "grab";
      draggingContext.x = e.evt.screenX;
      draggingContext.y = e.evt.screenY;
      const targetElement = (stage.container() as HTMLDivElement)
        .parentNode as HTMLDivElement;
      draggingContext.scrollTop = targetElement.scrollTop;
      draggingContext.scrollLeft = targetElement.scrollLeft;
      return;
    }
  });

  let timer: NodeJS.Timeout | null;
  stage.on("mousemove", (e: KonvaEventObject<MouseEvent>) => {
    if (!selectionRectangle.visible()) {
      if (draggingWindow) {
        if (timer) {
          return;
        }
        const offsetX = e.evt.screenX - draggingContext.x;
        const offsetY = e.evt.screenY - draggingContext.y;
        const targetElement = (stage.container() as HTMLDivElement)
          .parentNode as HTMLDivElement;
        targetElement.scrollTop = draggingContext.scrollTop - offsetY;
        targetElement.scrollLeft = draggingContext.scrollLeft - offsetX;
        timer = setTimeout(() => {
          timer = null;
        }, 5);
      }
      return;
    }
  });

  stage.on("mouseup touchend", (e) => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
      // 结束鼠标拖拽滑动窗口
      draggingWindow = false;
      stage.container().style.cursor = "default";
    }
  });
};

const initDelete = (stage: Konva.Stage, tr: Konva.Transformer) => {
  stage.container().tabIndex = 1;
  stage.container().addEventListener(
    "keyup",
    function (e: KeyboardEvent) {
      e.preventDefault();
      if (e.key === "Delete") {
        tr.nodes().forEach((ele) => {
          ele.destroy();
        });
        tr.nodes([]);
      }
    },
    true
  );
};

const konvaInit = (width: number, height: number) => {
  const stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  const tr = new Konva.Transformer({
    nodes: [],
    // ignore stroke in size calculations
    ignoreStroke: true,
    // manually adjust size of transformer
    padding: 1,
    keepRatio: false,
    anchorCornerRadius: 4,
  });
  layer.add(tr);
  // 新建框
  const selectionRectangle = selectionRectInit(stage, layer, tr);
  layer.add(selectionRectangle);

  initWindowDrag(stage, selectionRectangle);
  initDelete(stage, tr);

  return stage;
};

const rebuildContainer = (container: HTMLDivElement) => {
  const newElement = container.cloneNode(true);
  container.parentNode?.replaceChild(newElement, container);
  return newElement;
};

const getAllRectWithPoints = (allRects: Array<Konva.Rect>) => {
  const res = allRects.map((item) => ({
    ...item,
    A: { x: item.x(), y: item.y() },
    B: {
      x: item.x() + item.width() * Math.cos((item.rotation() * Math.PI) / 180),
      y: item.y() + item.width() * Math.sin((item.rotation() * Math.PI) / 180),
    },
    C: {
      x:
        item.x() +
        item.width() * Math.cos((item.rotation() * Math.PI) / 180) -
        item.height() * Math.sin((item.rotation() * Math.PI) / 180),
      y:
        item.y() +
        item.width() * Math.sin((item.rotation() * Math.PI) / 180) +
        item.height() * Math.cos((item.rotation() * Math.PI) / 180),
    },
    D: {
      x: item.x() - item.height() * Math.sin((item.rotation() * Math.PI) / 180),
      y: item.y() + item.height() * Math.cos((item.rotation() * Math.PI) / 180),
    },
  }));
  return res;
};

export default function InitStage() {
  const imgRef = ref<HTMLImageElement>();

  let imgWidth: number;

  let times = 4;
  /** 放大 */
  const zoomIn = () => {
    if (times <= 8 && imgWidth * (times / 4) <= 4000) {
      times *= 2;
    }
    imgResize();
  };
  /** 缩小 */
  const zoomOut = () => {
    if (times >= 2) {
      times /= 2;
    }
    imgResize();
  };
  let stage: Konva.Stage;
  /** 放大缩小后调整img和konva的宽高 */
  const imgResize = () => {
    const img = imgRef.value as HTMLImageElement;
    img.width = imgWidth * (times / 4);
    // const reatSet = new Set(getAllRect());
    // clear();
    // stage = konvaInit(img.width, img.height);
    stage.width(img.width);
    stage.height(img.height);
    stage.scale({
      x: times / 4,
      y: times / 4,
    });
  };
  /** 图片加载完成后的回调 */
  const handleLoad = () => {
    const img = imgRef.value as HTMLImageElement;
    imgWidth = img.width;
    stage = konvaInit(img.width, img.height);
  };
  const clear = () => {
    if (stage) {
      const container = stage.container();
      rebuildContainer(container);
      stage.destroy();
    }
  };
  const getAllRect = () => {
    const rects = stage.find(".rect") as Array<Konva.Rect>;
    return getAllRectWithPoints(rects);
  };
  const getItemById = (id: number) => {
    const rects = stage.find(".rect") as Array<Konva.Rect>;
    return rects.find((item) => item._id === id);
  };
  return {
    clear,
    zoomIn,
    zoomOut,
    handleLoad,
    getAllRect,
    getItemById,
    imgRef,
  };
}
