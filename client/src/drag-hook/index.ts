import { RefObject, useEffect, useRef } from "react";
import {
  bindDragEvents,
  bindDropEvents,
  DataType,
  NativeData,
} from "../drag-dom";

function serilize(data: Record<string, any>) {
  return JSON.stringify(data);
}

function deserilize(data: string) {
  return JSON.parse(data);
}

export function useDraggable<
  T extends HTMLElement,
  K extends Record<keyof K, unknown>,
>(
  ref: RefObject<T>,
  data: K,
) {
  const dragTargetRef = useRef<EventTarget>(null);

  const nativeData: NativeData = {
    type: DataType.JSON,
    value: serilize(data),
  };

  useEffect(() => {
    if (!ref || !ref.current || !(ref.current instanceof HTMLElement)) {
      throw "useDraggable requires valid ElementRef";
    }

    const { elementRef, unbind } = bindDragEvents(
      ref.current,
      nativeData,
    );

    const newRef = { current: elementRef };

    Object.assign(dragTargetRef, newRef);
    return () => unbind();
  }, [ref]);
}

export function useDropzone<
  T extends HTMLElement,
  K,
>(
  ref: RefObject<T>,
  acceptedDataType: DataType,
  onDrop: (data: K) => void,
) {
  const dragTargetRef = useRef<EventTarget>(null);

  const setDragAttribute = (value: boolean) => {
    (dragTargetRef.current as HTMLUListElement).setAttribute(
      "data-drag-over",
      value.toString(),
    );
  };

  const catchData = (data: NativeData) => {
    try {
      const deserilizedData = deserilize(data.value);
      onDrop(deserilizedData);
      setDragAttribute(false);
    } catch (error) {
      console.error(error, "Cannot deserilize data!");
    }
  };

  const onDragOver = () => {
    setDragAttribute(true);
  };

  const onDragLeave = () => {
    setDragAttribute(false);
  };

  useEffect(() => {
    if (!ref || !ref.current || !(ref.current instanceof HTMLElement)) {
      throw "useDropzone requires valid ElementRef";
    }

    const { elementRef, unbind } = bindDropEvents({
      element: ref.current,
      onDrop: catchData,
      dataType: acceptedDataType,
      onDragOver,
      onDragLeave,
    });

    const newRef = { current: elementRef };

    Object.assign(dragTargetRef, newRef);
    return () => unbind();
  }, [ref]);
}
