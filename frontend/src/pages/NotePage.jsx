import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

export const NotePage = ({ match }) => {
  const { id } = useParams(); // Use useParams hook to get URL parameters
  const [note, setNote] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

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

  let updateNote = async () => {
    try {
      await fetch(`/api/notes/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      // Optionally, you can perform some action upon successful update
      console.log("Note updated successfully!");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  let handleSubmit = () => {
    updateNote();
    navigate("/"); // Use navigate function to navigate to "/"
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};
