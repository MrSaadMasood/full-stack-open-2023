```mermaid
sequenceDiagram
    participant Browser
    participant Server
    
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of Browser: 
      - On submit, the browser triggers an event listener, preventing the page from reloading.
      - The entered value is immediately displayed on the browser through DOM manipulation.
      - The form data is stored in an object along with its creation time.
      - An HTTP POST request is made, converting the object into JSON and sending it to the server.
    Server-->>Browser: Status Code (Response from Server)
```
