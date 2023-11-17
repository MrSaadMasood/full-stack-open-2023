```mermaid
sequenceDiagram
    participant Browser
    participant Server
    
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note\nData: {NoteContent}
    activate Server
    Note right of Browser: Browser sends HTML file to the server on save
    Server-->>Browser: Status Code: 302 (Redirect)
    deactivate Server
    Note right of Server: Code causes the browser to redirect
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Note right of Browser: Browser reloads and makes a GET request for notes
    Server-->>-Browser: HTML Document (Notes)
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Note right of Browser: Browser makes a GET request for CSS file
    Server-->>-Browser: main.css
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Note right of Browser: Browser makes a GET request for main JS file
    Server-->>-Browser: main.js
    Note right of Browser: Browser starts executing JS code
    Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Note right of Browser: Browser makes a GET request for JSON file
    Server-->>-Browser: JSON Object (Data)
    Note right of Browser: Browser executes event listener to render data on the page
