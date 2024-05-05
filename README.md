# RequestStuff

RequestStuff simplifies the process of requesting and sharing files through unique, secure links. It allows users to generate customizable requests for files, which can be fulfilled easily by others using the provided links.

## Features

- **File Request Generation**: Create unique, secure links for requesting files.
- **Customizable Requests**: Specify file size limits, the number of files, and deadlines.
- **Ease of Use**: Intuitive user interface for both creating requests and uploading files.
- **Security**: Ensures that all file transfers are secure and encrypted.


firestore rules:

service cloud.firestore {
  match /databases/{database}/documents {

    // Match any document in the 'requests' collection
    match /requests/{requestId} {
      // Allow anyone to read documents in the 'requests' collection
      allow read: if true;
      // Optionally, restrict write access to authenticated users or specific conditions
      allow write: if request.auth != null;
    }

    // Match documents in the 'users/{userId}/requests/{requestId}' path
    match /users/{userId}/requests/{requestId} {
      // Allow read/write access only if the authenticated user's ID matches the userId in the path
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
