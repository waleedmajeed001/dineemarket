import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"; // ✅ Import the image builder

export const client = createClient({
  projectId: "spfbeted", // Replace with your actual project ID
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false, // Set to true for faster performance
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source).url(); // ✅ Convert to string
}
