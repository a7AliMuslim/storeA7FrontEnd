import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from './r2Config.js';

export default async function fetchImageBlob(path) {
  const [bucketFromPath, ...rest] = path.split('/');
  const bucket = process.env.REACT_APP_bucketName; // or bucketFromPath if intended
  const key = rest.join('/');
  
  
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  
  try {
    const response = await s3.send(command);
    
    // If in a browser, convert the stream to an ArrayBuffer first:
    const arrayBuffer = await response.Body.transformToByteArray();
    const blob = new Blob([arrayBuffer],{type: response.ContentType}); // Optionally specify type if known, e.g., { type: 'image/jpeg' }
    
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error("Error fetching file:", err);
    return null;
  }
}
