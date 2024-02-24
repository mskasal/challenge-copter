interface NativeDragBindings {
  elementRef: HTMLElement;
  unbind: VoidFunction;
}

export enum DataType {
  JSON = "apllication/json",
}

export interface NativeData {
  type: DataType;
  value: string;
}

export function bindDragEvents(
  element: HTMLElement,
  data: NativeData,
): NativeDragBindings {
  const _dragStartListener: EventListener = (event: Event) => {
    (event as DragEvent).dataTransfer?.setData(data.type, data.value);
  };

  const _dragendListener: EventListener = (event: Event) => {
    (event as DragEvent).dataTransfer?.clearData();
  };

  element.addEventListener(
    "dragstart",
    _dragStartListener,
  );

  element.addEventListener(
    "dragend",
    _dragendListener,
  );

  const unbind = () => {
    element.removeEventListener("dragstart", _dragStartListener);
    element.removeEventListener("draggend", _dragendListener);
  };

  return {
    elementRef: element,
    unbind,
  };
}

export function bindDropEvents(
  element: HTMLElement,
  onDrop: (data: NativeData) => void,
  dataType: DataType,
): NativeDragBindings {
  const _dropListener: EventListener = (event: Event) => {
    const data = (event as DragEvent).dataTransfer?.getData(dataType);

    if (data) {
      const nativeData: NativeData = {
        type: dataType,
        value: data,
      };
      onDrop(nativeData);
    } else {
      console.log("No data found!");
    }
  };

  const _dragOverListener: EventListener = (event: Event) => {
    event.preventDefault();
  };

  element.addEventListener(
    "drop",
    _dropListener,
  );

  element.addEventListener(
    "dragover",
    _dragOverListener,
  );

  const unbind = () => {
    element.removeEventListener("drop", _dropListener);
    element.removeEventListener("dragged", _dragOverListener);
  };

  return {
    elementRef: element,
    unbind,
  };
}
