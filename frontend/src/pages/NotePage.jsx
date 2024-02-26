import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const NotePage = () => {
  const { id } = useParams(); // Use useParams hook to get URL parameters
  const [note, setNote] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    let getNote = async () => {
      try {
        let response = await fetch(`/api/notes/${id}`);
        let data = await response.json();
        if (isMounted) {
          setNote(data);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    getNote();

    // Cleanup function to abort fetch if component unmounts
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div>
      <p>{note?.body}</p>
    </div>
  );
};
