import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

// Configure PDF.js worker from CDN to avoid Next.js bundling issues
if (typeof window !== 'undefined') {
  const version = pdfjsLib.version || '3.11.174';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
}

/**
 * Format bytes into a human-readable string (e.g. 1.2 MB)
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

interface CompressionStats {
  originalSize: string;
  compressedSize: string;
  ratio: string;
}

interface CompressionResult {
  pdfBlob: Blob;
  pdfFile: File;
  stats: CompressionStats;
}

/**
 * Compresses a PDF file client-side by rasterizing pages into compressed JPEGs
 */
export async function compressPdf(
  file: File,
  quality = 0.85,
  scale = 2.2,
  onProgress?: (pageNum: number, totalPages: number) => void
): Promise<CompressionResult> {
  const originalSizeBytes = file.size;
  
  // 1. Read PDF file into ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  
  // 2. Load PDF using PDF.js
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;
  
  // 3. Create a new PDF document using pdf-lib
  const outPdfDoc = await PDFDocument.create();
  
  // 4. Process page by page
  for (let i = 1; i <= numPages; i++) {
    if (onProgress) {
      onProgress(i, numPages);
    }
    
    const page = await pdfDoc.getPage(i);
    
    // Render page to canvas at specified scale (high resolution, sharp text)
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error(`Failed to get canvas 2D context for page ${i}`);
    }
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;
    
    // Extract canvas as compressed JPEG base64 string
    const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
    
    // Convert base64 data to arrayBuffer
    const base64Data = imgDataUrl.split(',')[1];
    const rawBinary = window.atob(base64Data);
    const rawBinaryLength = rawBinary.length;
    const imgBytes = new Uint8Array(rawBinaryLength);
    for (let j = 0; j < rawBinaryLength; j++) {
      imgBytes[j] = rawBinary.charCodeAt(j);
    }
    
    // Embed the JPEG page image into pdf-lib doc
    const embeddedImage = await outPdfDoc.embedJpg(imgBytes);
    const { width, height } = embeddedImage.scale(1.0);
    
    const newPage = outPdfDoc.addPage([width, height]);
    newPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }
  
  // 5. Save the output PDF
  const compressedPdfBytes = await outPdfDoc.save();
  const compressedBlob = new Blob([compressedPdfBytes as any], { type: 'application/pdf' });
  const compressedSizeBytes = compressedBlob.size;
  
  // Create File object
  const compressedFile = new File([compressedBlob], file.name, {
    type: 'application/pdf',
    lastModified: Date.now()
  });
  
  // Calculate compression statistics
  const ratioVal = ((1 - (compressedSizeBytes / originalSizeBytes)) * 100).toFixed(0);
  const ratio = parseInt(ratioVal) > 0 ? `${ratioVal}%` : '0%';
  
  return {
    pdfBlob: compressedBlob,
    pdfFile: compressedFile,
    stats: {
      originalSize: formatBytes(originalSizeBytes),
      compressedSize: formatBytes(compressedSizeBytes),
      ratio
    }
  };
}
