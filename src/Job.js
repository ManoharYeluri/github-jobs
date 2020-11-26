import React from "react";
import "./Job.css";
import { Card, Badge, Button, Collapse } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

function Job({ job }) {
    const [open, setOpen] = useState(false);
    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} - <span className="text-muted font-weight-light">{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        <Badge variant="secondary" className="mb-3">{job.location}</Badge>
                        <div style={{ wordBreak: 'break-all' }}>
                            <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    <img className="d-sm-none d-md-block" height="50" style={{ maxWidth: "25%" }} src={job.company_logo} alt={job.company} />
                </div>
            </Card.Body>
            <Card.Text className="ml-3">
                <Button onClick={() => setOpen(!open)}>{open ? "Hide" : "View"} Details</Button>
            </Card.Text>
            <Collapse in={open}>
                <div style={{ paddingLeft: "7vmin", paddingRight: "7vmin" }}>
                    <ReactMarkdown source={job.description} />
                </div>
            </Collapse>
        </Card>
    )
}

export default Job;