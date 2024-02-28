import { FormEvent, MutableRefObject, RefObject, useRef } from "react";
import { useFlightAdd, useFlightDelete } from "../hooks";

import { FlatButton } from "./Buttons";
import { FlightTypePreview } from "../models";
import { useFlights } from "../contexts/Flights.context";

interface DialogProps {
  onCancel: VoidFunction;
  id?: string;
  dialogRef: RefObject<HTMLDialogElement>;
}

export function DeleteDialog({ onCancel, id, dialogRef }: DialogProps) {
  const { fetchFlights } = useFlights();
  const { deleteFlight, loading, error } = useFlightDelete();

  const onSubmit = () => {
    deleteFlight(id!, {
      onSuccess: () => {
        dialogRef.current!.close();
        fetchFlights();
      },
    });
  };

  return (
    <dialog ref={dialogRef}>
      <h3>
        DELETE - <span>Mission</span>
      </h3>
      <p>Are you sure? You can't undo this afterwards.</p>
      {error && <p className="error">{error.message}</p>}
      <div className="btn-group">
        <FlatButton onClick={onCancel} text="Cancel" />
        <FlatButton
          className="btn flat-btn primary"
          disabled={loading}
          onClick={onSubmit}
          text="Delete"
          autoFocus
        />
      </div>
      {error && <p>{error?.message}</p>}
    </dialog>
  );
}

export function AddDialog({ onCancel, dialogRef }: DialogProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { fetchFlights } = useFlights();

  const { addFlight, loading, error } = useFlightAdd();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formRef.current && formRef.current.checkValidity()) {
      const formData = new FormData(formRef.current);
      const newFlight: FlightTypePreview = {
        title: formData.get("title")!.toString(),
        description: formData.get("description")!.toString(),
        status: "pre",
      };

      addFlight(newFlight, {
        onSuccess: () => {
          dialogRef.current!.close();
          formRef.current?.reset();
          fetchFlights();
        },
      });
    }
  };

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

        <label htmlFor="description">
          Description:
          <input id="description" name="description" type="text" />
        </label>
        {error && <p className="error">{error.message}</p>}
        <div className="btn-group">
          <FlatButton onClick={onCancel} text="Cancel" type="button" />
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
