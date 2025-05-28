import React, { useState } from "react";
import "./styles.css";

export function ServiceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = 1;
    try {
      const response = await fetch("http://localhost:5000/routes/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, price, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Service posted successfully!");
        setTitle("");
        setDescription("");
        setPrice("");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error posting service:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container flex flex-column">
      <h1>Post a New Service</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Service Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter service title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter service description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Service</button>
      </form>
    </div>
  );
}
