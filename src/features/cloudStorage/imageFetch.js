import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from './r2Config.js';

export default async function fetchImageBlob(path){
    const [bucketFromPath, ...rest]=path.split('/');
    const bucket=process.env.REACT_APP_bucketName;
    const key=rest.join('/');
    
    console.log(bucketFromPath,'--',bucket,'--',key);
    
    const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
    });
    
    try {
        const response = await s3.send(command);
        //const blob = await response.Body.transformToByteArray();
        console.log(response);
        console.log(response.data);
        const blob=new Blob([response.data])
        return URL.createObjectURL(blob); 
    } catch (err) {
        console.error("Error fetching file:", err);
        return null;
    }
    
}