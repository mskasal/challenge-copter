import { FormEvent, useEffect, useRef } from "react";
import { useFlightAdd, useFlightDelete } from "../hooks";

import { FlatButton } from "./Buttons";
import { FlightTypePreview } from "../models";

interface DialogProps {
  isOpen: boolean;
  onCancel: VoidFunction;
  id?: string;
}

export function DeleteDialog({ isOpen, onCancel, id }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { deleteFlight, loading, error } = useFlightDelete();
  const onSubmit = () => {
    deleteFlight(id!);
    console.log(id);
  };

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current?.showModal();
    }
    if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen, dialogRef]);

  return (
    <dialog ref={dialogRef}>
      <h3>
        DELETE - <span>Mission</span>
      </h3>
      <p>
        Are you sure? You can't undo this afterwards.
      </p>
      {error && <p className="error">{error.message}</p>}
      <div className="btn-group">
        <FlatButton onClick={onCancel} text="Cancel" autoFocus />
        <FlatButton
          disabled={loading}
          onClick={onSubmit}
          text="Delete"
          className="btn flat-btn primary"
        />
      </div>
      {error && <p>{error?.message}</p>}
    </dialog>
  );
}

export function AddDialog({ isOpen, onCancel }: DialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { addFlight, loading, error } = useFlightAdd();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formRef.current && formRef.current.checkValidity()) {
      const formData = new FormData(formRef.current);
      const newFlight: FlightTypePreview = {
        title: formData.get("title")!.toString(),
        desc: formData.get("desc")!.toString(),
        status: "pre",
      };

      addFlight(newFlight);
    }
  };

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current?.showModal();
    }
    if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
      formRef.current?.reset();
    }
  }, [isOpen, dialogRef]);

  return (
    <dialog ref={dialogRef}>
      <h3>
        ADD - <span>Mission</span>
      </h3>
      <form
        onSubmit={onSubmit}
        ref={formRef}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="title">
          Title*:
          <input id="title" name="title" type="text" required autoFocus />
        </label>

        <label htmlFor="desc">
          Description:
          <input id="desc" name="desc" type="text" />
        </label>
        {error && <p className="error">{error.message}</p>}
        <div className="btn-group">
          <FlatButton
            onClick={onCancel}
            text="Cancel"
            type="button"
          />
          <FlatButton
            disabled={loading}
            text="Create"
            type="submit"
            className="btn flat-btn primary"
          />
        </div>
      </form>
    </dialog>
  );
}
