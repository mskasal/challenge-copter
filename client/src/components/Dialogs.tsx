import { FormEvent, useRef } from "react";
import { useFlightAdd, useFlightDelete } from "../hooks";

import { FlatButton } from "./Buttons";
import { FlightTypePreview } from "../models";

interface DialogProps {
  isOpen: boolean;
  onCancel: VoidFunction;
  id?: string;
}

export function DeleteDialog({ isOpen, onCancel, id }: DialogProps) {
  const { deleteFlight, loading, error } = useFlightDelete();
  const onSubmit = () => {
    deleteFlight(id!);
    console.log(id);
  };

  return (
    <dialog open={isOpen}>
      <h3>
        DELETE - <span>Mission</span>
      </h3>
      <div className="btn-group">
        <FlatButton onClick={onCancel} text="Cancel" autoFocus />
        <FlatButton disabled={loading} onClick={onSubmit} text="Submit" />
      </div>
      {error && <p>{error?.message}</p>}
    </dialog>
  );
}

export function AddDialog({ isOpen, onCancel }: DialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
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

  return (
    <dialog open={true || isOpen}>
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
        <div className="btn-group">
          <FlatButton onClick={onCancel} text="Cancel" type="button" />
          <FlatButton
            disabled={loading}
            text="Create"
            type="submit"
          />
        </div>
        {error && <p>{error.message}</p>}
      </form>
    </dialog>
  );
}
