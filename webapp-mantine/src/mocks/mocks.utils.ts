export const mockHost = import.meta.env.VITE_MOCK_HOST;

// HTTP Codes https://restfulapi.net/http-methods/
//
// Idempotency essentially means that the effect of a successfully performed request on
// a server resource is independent of the number of times it is executed.
// https://restfulapi.net/wp-content/uploads/Idempotent-REST-API.png
//
// Safe means the operation does not alter the state of the server at all.
// So all READ ONLY operations are considered SAFE. All SAFE HTTP methods are Idempotent,
// but not all Idempotent methods are SAFE.
//
//   POST and PATCH are NOT idempotent.
//   GET, PUT, DELETE, HEAD, OPTIONS and TRACE are idempotent.
//
//   GET, HEAD are safe

export const HTTP_200_OK = 200; // (OK)

export const HTTP_201_CREATED = 201; // (Created)

export const HTTP_204_NO_CONTENT = 204; // (No Content)

/*
GET
  200 OK // Request is successful.
  400 Bad request // Request is invalid due to incorrect parameters in the request.
  404 Not Found // Request has failed due to non-existent resource.
  500 Internal Server Error // Request has failed due to an error in the switch.

POST
  200 OK // Command URI is successful.
  201 Created // Command URI is created.
  202 Accepted // Command URI is accepted.
  204 No Content // No content is returned for command URI.
  400 Bad Request // Request has failed due to incorrect parameters in the request.
  404 Not Found // Request is failed due to non-existent resource.
  405 Method Not Allowed // Request not supported on a resource.
  500 Internal Server Error // Request is failed due to an error in the switch.

DELETE
  204 No Content // Delete on a resource is successful.
  400 Bad Request // Invalid DELETE request [ some incorrect parameters in the request ].
  404 Not Found // Request has failed due to non-existent resource.
  405 Method Not Allowed // Not supported on a resource.
  500 Internal Server Error // Request is failed due to an error in the switch.

PUT
  200 OK // Resource is successful.
  400 Bad Request // Failed due to incorrect parameters in the request.
  404 Not Found // Failed due to non-existent resource.
  405 Method Not Allowed // Not supported on a resource.
  500 Internal Server Error // Failed due to an error in the switch.
*/
