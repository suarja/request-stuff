// import {
//   RequestFolder,
//   Request,
//   RequestSubFolder,
// } from "@/features/request/domain/entities/request-types";

// // Mock data for FileSenderData
// type FileSenderData = {
//   senderName?: string;
//   senderEmail?: string;
//   message?: string;
//   uploadDate?: string;
// };

// // Mock data generation
// export const mockRequests: Request[] = [
//   {
//     id: "req123",
//     userId: "user001",
//     maxFileSize: 10240, // in KB
//     dateLimit: Date.now() + 86400000, // one day from now in milliseconds
//     name: "Project Documents",
//     description: "Important documents for the 2024 Project Plan.",
//     maxFiles: 5,
//     path: "/project-documents/",
//     url: "http://example.com/requests/project-documents",
//     uploads: [
//       {
//         userId: "user002",
//         fileUrl: "http://example.com/files/document1.pdf",
//         fileSenderData: {
//           senderName: "Alice Johnson",
//           senderEmail: "alice@example.com",
//           message: "Here are the requested project plan documents.",
//           uploadDate: "2023-04-23T12:00:00.000Z",
//         },
//       },
//     ],
//     numberOfUploads: 1,
//   },
//   {
//     id: "req124",
//     userId: "user003",
//     maxFileSize: 20480, // in KB
//     dateLimit: Date.now() + 172800000, // two days from now in milliseconds
//     name: "Marketing Materials",
//     description: "All marketing materials for the Q2 campaign.",
//     maxFiles: 10,
//     path: "/marketing-materials/",
//     url: "http://example.com/requests/marketing-materials",
//     uploads: [
//       {
//         userId: "user004",
//         fileUrl: "http://example.com/files/banner1.png",
//         fileSenderData: {
//           senderName: "Bob Smith",
//           senderEmail: "bob@example.com",
//           message: "Banner image for the new campaign.",
//           uploadDate: "2023-04-22T15:30:00.000Z",
//         },
//       },
//     ],
//     numberOfUploads: 1,
//   },
// ];

// export const mockRequestFolder: RequestFolder = {
//   title: "All Requests",
//   path: "/requests",
//   requests: mockRequests,
//   subFolders: [
//     {
//       title: "Project Documents",
//       path: "/requests/project-documents",
//     },
//     {
//       title: "Marketing Materials",
//       path: "/requests/marketing-materials",
//     },
//   ],
// };

// export const rootRequestFolderWithParams: RootRequestFolderWithParams = {
//   title: "Root Requests",
//   path: "/root-requests",
//   requests: [],
//   subFolders: [mockRequestFolder],
//   params: "filter=active",
// };

// export const mockRequestSubFolders: RequestSubFolder[] = [
//   {
//     title: "Financial Reports",
//     path: "/requests/financial-reports",
//   },
//   {
//     title: "HR Documents",
//     path: "/requests/hr-documents",
//   },
//   {
//     title: "Technical Specs",
//     path: "/requests/technical-specs",
//   },
//   {
//     title: "Marketing Campaigns",
//     path: "/requests/marketing-campaigns",
//   },
//   {
//     title: "Product Launches",
//     path: "/requests/product-launches",
//   },
//   {
//     title: "Legal Contracts",
//     path: "/requests/legal-contracts",
//   },
//   {
//     title: "Customer Feedback",
//     path: "/requests/customer-feedback",
//   },
//   {
//     title: "Internal Projects",
//     path: "/requests/internal-projects",
//   },
//   {
//     title: "External Collaborations",
//     path: "/requests/external-collaborations",
//   },
// ];
