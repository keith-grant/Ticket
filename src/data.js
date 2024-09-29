export const tickets = [
    {
        ticket_id: "1",
        fields: {
            title: {
                type: "string",
                value: "Login Issue"
            },
            status: {
                type: "string",
                value: "Open"
            },
            priority: {
                type: "string",
                value: "High"
            },
            reported_date: {
                type: "date",
                value: "2024-09-28T14:48:00.000Z" // ISO date string
            },
            affected_users: {
                type: "number",
                value: 5
            },
            description: {
                type: "markdown",
                value: " # User is unable to log in with correct credentials. \n Requires urgent attention."
            }
        },
        comments: [
            {
                comment_id: "c1",
                user: "Alice",
                timestamp: "2024-09-28T14:48:00.000Z",
                content: "I'm unable to log in with my account.",
                replies: [
                    {
                        comment_id: "c1-1",
                        user: "Bob",
                        timestamp: "2024-09-28T15:00:00.000Z",
                        content: "Can you try resetting your password?",
                        replies: []
                    }
                ]
            },
            {
                comment_id: "c2",
                user: "Charlie",
                timestamp: "2024-09-28T16:30:00.000Z",
                content: "I am also facing the same issue.",
                replies: []
            }
        ],
        history: [
            {
                timestamp: "2024-09-28T14:50:00.000Z",
                changed_by: "Admin",
                changes: {
                    status: {
                        old_value: "New",
                        new_value: "Open"
                    }
                }
            }
        ]
    }
];
