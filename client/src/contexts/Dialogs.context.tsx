import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { AddDialog, DeleteDialog } from "../components/Dialogs";

type DialogContextType = {
  openDialog: (type: DialogType, id?: string) => void;
  closeDialog: VoidFunction;
};

export enum DialogType {
  ADD = "add",
  DELETE = "delete",
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw "Missing Provider: DialogProvider";
  }
  return context;
}

interface DialogProviderProps {
  children: ReactNode;
}

export default function DialogProvider({ children }: DialogProviderProps) {
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const addRef = useRef<HTMLDialogElement>();
  const deleteRef = useRef<HTMLDialogElement>();

  const openDialog = (type: DialogType, id?: string) => {
    switch (type) {
      case DialogType.ADD:
        addRef.current && addRef.current.showModal();
        break;
      case DialogType.DELETE:
        if (!id) {
          throw "Provide id for the delete operation.";
        }
        deleteRef.current && deleteRef.current.showModal();
        setDeleteId(id);
        break;
    }
  };

  const closeDialog = () => {
    addRef.current && addRef.current.close();
    deleteRef.current && deleteRef.current.close();
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      <AddDialog onCancel={closeDialog} dialogRef={addRef} />
      <DeleteDialog
        onCancel={closeDialog}
        id={deleteId}
        dialogRef={deleteRef}
      />
    </DialogContext.Provider>
  );
}
