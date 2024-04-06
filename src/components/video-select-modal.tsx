"use client";
import { Video } from "@/interfaces/video";
import React, { useState } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import VideoItem from "./video-item";

interface Props {
  videos: Video[];
  onVideoSelect: (videoId: number) => void;
}

const VideoSelectModal = ({ videos, onVideoSelect }: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add more videos
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Video list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {videos.map((video) => (
            <Row key={video.id} className="align-items-center mt-3">
              <Col>
                <VideoItem video={video} />
              </Col>
              <Col xs="auto">
                <Button
                  variant="success"
                  onClick={() => onVideoSelect(video.id)}
                >
                  Add This
                </Button>
              </Col>
            </Row>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoSelectModal;
