import { createContext, ReactNode, useContext, useState } from "react";
import { AddDialog, DeleteDialog } from "../components/Dialogs";

type DialogContextType = {
  openDialog: (type: DialogType, id?: string) => void;
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
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

  const openDialog = (type: DialogType, id?: string) => {
    switch (type) {
      case DialogType.ADD:
        setAddDialogOpen(true);
        break;
      case DialogType.DELETE:
        if (!id) {
          throw "Provide id for the delete operation.";
        }
        setDeleteDialogOpen(true);
        setDeleteId(id);
        break;
    }
  };

  const closeDialog = () => {
    setAddDialogOpen(false);
    setDeleteDialogOpen(false);
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}

      <AddDialog isOpen={isAddDialogOpen} onCancel={closeDialog} />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onCancel={closeDialog}
        id={deleteId}
      />
    </DialogContext.Provider>
  );
}
