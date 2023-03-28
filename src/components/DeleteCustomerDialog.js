import React, { useState } from "react";

function DeleteCustomer({ customerId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/CustomerDeleteController/${customerId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Unable to delete customer");
      }
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      {isDeleting ? (
        <span>Deleting...</span>
      ) : (
        <button onClick={handleDelete}>Delete Customer</button>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default DeleteCustomer;
