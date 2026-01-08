export async function applyWatermark(file: File, logoUrl: string = '/logo.png'): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Set canvas dimensions to image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Load logo
      const logo = new Image();
      logo.src = logoUrl;
      logo.onload = () => {
        // Calculate logo size (e.g., 15% of image width)
        const logoWidth = canvas.width * 0.15;
        const logoHeight = (logo.height / logo.width) * logoWidth;

        // Position: Top Left with some padding
        const padding = canvas.width * 0.02;
        const x = padding;
        const y = padding;

        // Apply some transparency for the watermark
        ctx.globalAlpha = 0.6;
        ctx.drawImage(logo, x, y, logoWidth, logoHeight);
        ctx.globalAlpha = 1.0;

        // Optional: Center watermark too if needed for stronger protection
        /*
        const centerX = (canvas.width - logoWidth) / 2;
        const centerY = (canvas.height - logoHeight) / 2;
        ctx.globalAlpha = 0.2;
        ctx.drawImage(logo, centerX, centerY, logoWidth, logoHeight);
        ctx.globalAlpha = 1.0;
        */

        // Convert back to file
        canvas.toBlob((blob) => {
          if (blob) {
            const watermarkedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(watermarkedFile);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, file.type);
        
        URL.revokeObjectURL(img.src);
      };
      logo.onerror = () => {
        // If logo fails to load, resolve with original file but log error
        console.error('Failed to load watermark logo');
        resolve(file);
      };
    };
    img.onerror = () => reject(new Error('Failed to load image'));
  });
}
