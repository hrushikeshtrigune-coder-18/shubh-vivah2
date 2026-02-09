import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const generateAndSharePDF = async (details, templateImage, customStyle) => {
    try {
        // Resolve image asset
        let imageUri = '';
        if (typeof templateImage === 'number') {
            const asset = Asset.fromModule(templateImage);
            await asset.downloadAsync();

            // Read file and convert to base64 for reliable rendering in HTML
            const base64 = await FileSystem.readAsStringAsync(asset.localUri || asset.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            imageUri = `data:image/jpeg;base64,${base64}`;
        } else {
            imageUri = templateImage.uri;
        }

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: ${customStyle?.fontFamily === 'serif' ? 'serif' : 'sans-serif'};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #f0f0f0;
                    }
                    .card {
                        position: relative;
                        width: 800px; /* Adjust as needed for PDF aspect ratio */
                        height: 1200px; /* Adjust as needed */
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        overflow: hidden;
                        background-color: white;
                    }
                    .background-image {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        z-index: 0;
                    }
                    .overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background-color: rgba(0, 0, 0, 0.1); /* Slight overlay */
                        z-index: 1;
                        padding: 40px;
                        box-sizing: border-box;
                        text-align: center;
                    }
                    .title {
                        font-size: 48px;
                        font-weight: bold;
                        color: ${customStyle?.textColor || '#000'};
                        margin-bottom: 20px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                    }
                    .couple-names {
                        font-size: 64px;
                        font-weight: bold;
                        color: #A70002; /* Kumkum color */
                        margin-bottom: 20px;
                        font-family: ${customStyle?.fontFamily === 'serif' ? 'serif' : 'sans-serif'};
                    }
                    .host {
                        font-size: 24px;
                        color: ${customStyle?.textColor || '#333'};
                        margin-bottom: 30px;
                        font-style: italic;
                    }
                    .divider {
                        width: 100px;
                        height: 2px;
                        background-color: #A70002;
                        margin: 20px auto;
                    }
                    .date-time {
                        font-size: 32px;
                        font-weight: 600;
                        color: ${customStyle?.textColor || '#333'};
                        margin-bottom: 10px;
                    }
                    .venue {
                        font-size: 28px;
                        color: ${customStyle?.textColor || '#555'};
                        max-width: 80%;
                        line-height: 1.4;
                    }
                    .message {
                         font-size: 20px;
                        color: ${customStyle?.textColor || '#555'};
                        margin-top: 20px;
                         max-width: 80%;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <img src="${imageUri}" class="background-image" alt="Background">
                    <div class="overlay">
                        <div class="title">${details.title}</div>
                        <div class="couple-names">${details.names}</div>
                        <div class="host">${details.host}</div>
                        <div class="divider"></div>
                        <div class="date-time">${details.date} | ${details.time}</div>
                        <div class="venue">${details.venue}</div>
                         <div class="message">${details.message}</div>
                    </div>
                </div>
            </body>
            </html>
        `;

        const { uri } = await Print.printToFileAsync({
            html: htmlContent,
            base64: false,
        });

        await Sharing.shareAsync(uri);

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
    }
};
