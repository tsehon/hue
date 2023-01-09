import { storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

/**
 * @param {string} filename
 * @param {string} mediaPath - Local path to media to be uploaded
 * @returns {string} Download URL to uploaded media
 */
export default async function uploadMedia(filename, mediaPath) {
    const uploadRef = ref(storage, filename);

    return await new Promise(function(resolve, reject) {
        fetch(mediaPath)
        .then(response => response.blob())
        .then(blob => {
            const uploadTask = uploadBytesResumable(uploadRef, blob)
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Progress
                    console.log(snapshot.bytesTransferred + ' / ' + snapshot.totalBytes);
                },
                (error) => {
                    console.log('uploadMedia error: ' + error);
                    reject(error);
                },
                () => {
                    // Upload completed successfully, return the download URL
                    blob.close();
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) =>  resolve(downloadURL)
                    );
                    
                }
            )
        })
    });
}