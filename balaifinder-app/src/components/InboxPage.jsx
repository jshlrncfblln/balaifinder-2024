import React, { useState } from "react";

const InboxPage = () => {
    // Sample data for demonstration
    const [inboxItems, setInboxItems] = useState([
        {
            id: 1,
            subject: "Application Reviewing",
            message: "Your Application still reviewing by Pagibig.",
            status: "Pending",
        },
        {
            id: 2,
            subject: "Aprroved by Pagibig",
            message: "Your Status was Approve by Pagibig.",
            status: "Approve",
        },
        {
            id: 3,
            subject: "New Offer",
            message: "Ano pa ilalagay dito",
            status: "Pending",
        },
    ]);

    return (
        <div>
            <h1>Inbox</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {inboxItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.subject}</td>
                            <td>{item.message}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InboxPage;
