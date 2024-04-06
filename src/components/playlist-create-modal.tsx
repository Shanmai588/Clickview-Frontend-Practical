"use client";
import React, { useState } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { Playlist } from "@/interfaces/playlist";

interface Props {
  onCreatePlaylist: (playlist: Playlist) => void;
}

const PlaylistCreateModal = ({ onCreatePlaylist }: Props) => {
  const [show, setShow] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreatePlaylist = () => {
    const newPlaylist = {
      id: Math.random(),
      name: playlistName,
      description: description,
      videoIds: [],
    };
    onCreatePlaylist(newPlaylist);
    handleClose();
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Create Playlist
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCreatePlaylist}>
            Create Playlist
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PlaylistCreateModal;
