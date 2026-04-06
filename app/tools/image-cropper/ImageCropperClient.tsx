'use client';

import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { ArrowLeft, Upload, Download, RefreshCw, Settings2, ShieldCheck, Crop as CropIcon, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

import ToolSEOSection from "@/components/ToolSEOSection";
import ToolHeader from "@/components/ToolHeader";
import { toolSEOData } from "@/data/toolSEOContent";

export default function ImageCropperClient() {
  const seoData = toolSEOData["image-cropper"];
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [aspectRatioName, setAspectRatioName] = useState<string>('Square (1:1)');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ASPECT_RATIOS = [
    { label: 'Free', value: 0 },
    { label: 'Square (1:1)', value: 1 },
    { label: 'Landscape (16:9)', value: 16 / 9 },
    { label: 'Portrait (9:16)', value: 9 / 16 },
    { label: 'Classic (4:3)', value: 4 / 3 },
    { label: 'Instagram (4:5)', value: 4 / 5 },
    { label: 'Twitter Header (3:1)', value: 3 / 1 },
  ];

  const handleFile = (selectedFile: File) => {
    setError(null);
    setCroppedImage(null);

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/heic'].includes(selectedFile.type)) {
      setError('Please upload a valid image (PNG, JPG, WEBP).');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || null));
    reader.readAsDataURL(selectedFile);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onCropComplete = useCallback((croppedArea: any, currentCroppedAreaPixels: any) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);

  const getCroppedImg = async (imageSrc: string, pixelCrop: any, rot = 0): Promise<string | null> => {
    const createImage = (url: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
      });

    function getRadianAngle(degreeValue: number) {
      return (degreeValue * Math.PI) / 180;
    }

    const rotateSize = (width: number, height: number, rot: number) => {
      const rotRad = getRadianAngle(rot);
      return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
      };
    };

    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const rotRad = getRadianAngle(rot);
      const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rot);

      canvas.width = bBoxWidth;
      canvas.height = bBoxHeight;

      ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
      ctx.rotate(rotRad);
      ctx.translate(-image.width / 2, -image.height / 2);

      ctx.drawImage(image, 0, 0);

      const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      ctx.putImageData(data, 0, 0);

      return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
          if (!file) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(URL.createObjectURL(file));
        }, 'image/png', 1);
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleDisplayCrop = async () => {
    if (!imgSrc || !croppedAreaPixels) return;
    try {
      const croppedImageUrl = await getCroppedImg(imgSrc, croppedAreaPixels, rotation);
      if (croppedImageUrl) {
        setCroppedImage(croppedImageUrl);
      }
    } catch (e) {
      setError('Failed to crop image.');
    }
  };

  const downloadCroppedImage = () => {
    if (!croppedImage) return;
    const link = document.createElement('a');
    link.download = `cropped-${file?.name || 'image.png'}`;
    link.href = croppedImage;
    link.click();
  };

  const resetAll = () => {
    setImgSrc(null);
    setFile(null);
    setCroppedImage(null);
    setError(null);
    setZoom(1);
    setRotation(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const cardBaseClass = "rounded-3xl border border-white/10 backdrop-blur-sm bg-[#111111]/80 p-6 flex flex-col gap-4 shadow-xl";
  const btnPrimaryClass = "w-full py-3 px-4 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-10 py-12 text-white min-h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-6">

       
        {/* Header Block */}
        <ToolHeader 
          title="Image Cropper"
          description="Fast, secure, client-side image cropping tool. Frame your photos exactly how you need them with predefined formats without uploading your data to any server."
          icon={<CropIcon className="text-cyan-400" size={32} />}
          gradient={{ from: "cyan-400", to: "blue-500" }}
        />

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
            <ShieldCheck className="w-5 h-5" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Working Area */}
          <div className={`lg:col-span-2 ${cardBaseClass} min-h-[600px] flex flex-col`}>
            
            {!imgSrc ? (
              // Empty Upload State
              <div 
                className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 transition-all cursor-pointer ${
                  isDragging ? 'border-cyan-500 bg-cyan-500/10 scale-[1.02]' : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleChange}
                  className="hidden"
                />
                
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center mb-6 shadow-inner border border-white/10">
                  <Upload className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Drag & Drop Image</h3>
                <p className="text-gray-400 text-sm text-center mb-8 max-w-sm">
                  Upload a photo to start cropping it instantly in your browser. Formats supported: PNG, JPG, WEBP.
                </p>
                <button className="py-3 px-8 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95">
                  Browse Files
                </button>
              </div>
            ) : !croppedImage ? (
              // Cropping Interface
              <div className="flex flex-col h-full gap-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between px-2">
                   <h3 className="text-xl font-bold flex items-center gap-2"><CropIcon size={20} className="text-cyan-400"/> Adjust Frame</h3>
                   <button onClick={resetAll} className="text-sm font-medium text-gray-400 hover:text-white flex items-center gap-2 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg">
                      <RefreshCw className="w-4 h-4" /> Reset
                   </button>
                </div>
                
                <div className="relative w-full flex-1 min-h-[450px] bg-black/60 rounded-2xl overflow-hidden border border-white/10 shadow-inner group">
                  <Cropper
                    image={imgSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={aspectRatio === 0 ? undefined : aspectRatio}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    objectFit="contain"
                    showGrid={true}
                    style={{ containerStyle: { background: 'transparent' } }}
                  />
                </div>
                
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <span className="text-sm font-semibold text-gray-300 min-w-[50px]">Zoom</span>
                      <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.05}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full sm:w-48 accent-cyan-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <button 
                      onClick={handleDisplayCrop} 
                      className="w-full sm:w-auto py-3 px-8 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CropIcon className="w-5 h-5" /> Crop Image
                    </button>
                </div>
              </div>
            ) : (
              // Result View
              <div className="flex flex-col items-center justify-center flex-1 py-8 space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                <div className="relative max-w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/50 p-2">
                  <img src={croppedImage} alt="Cropped result" className="rounded-xl max-h-[450px] w-auto object-contain bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAM0lEQVQ4T2P8z8Dwn5GMwMRgNBwwIhiNhgNGwmA0HDAiHDCgRxhQ8sEoOIyGw2hwAAAPgQk/e9XnGwAAAABJRU5ErkJggg==')]" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mt-6">
                  <button onClick={downloadCroppedImage} className="flex-1 py-3.5 px-6 rounded-xl font-bold bg-white text-black hover:bg-gray-200 shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-95">
                    <Download size={20} /> Download
                  </button>
                  <button onClick={() => setCroppedImage(null)} className="flex-1 py-3.5 px-6 rounded-xl font-bold border-2 border-white/20 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2 active:scale-95 text-center">
                    Back to Edit
                  </button>
                </div>
              </div>
            )}
            
          </div>

          {/* Settings Column */}
          <div className="flex flex-col gap-6">
            
            <div className={cardBaseClass}>
              <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                <Settings2 size={20} className="text-cyan-400" /> Presets
              </h3>
              
              <div className="space-y-4">
                 <div className="p-5 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 flex flex-col gap-4">
                    <label className="text-sm font-semibold text-gray-300">Aspect Ratios</label>
                    <div className="grid grid-cols-2 gap-2">
                      {ASPECT_RATIOS.map((ratio) => (
                         <button 
                           key={ratio.label} 
                           onClick={() => {
                             setAspectRatio(ratio.value);
                             setAspectRatioName(ratio.label);
                           }}
                           className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                             aspectRatioName === ratio.label 
                             ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-inner' 
                             : 'bg-black/40 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
                           }`}
                         >
                           {ratio.label}
                         </button>
                      ))}
                    </div>
                 </div>

                 <div className="p-5 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 flex flex-col gap-4">
                    <div className="flex justify-between items-center group">
                       <label className="text-sm font-semibold text-gray-300">Rotation Degrees</label>
                       <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded-md text-cyan-400">{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full accent-cyan-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>
              </div>
            </div>

            {/* Information Card */}
            <div className={`${cardBaseClass} bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/20`}>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-1 text-cyan-100">
                <ImageIcon size={18} className="text-cyan-400" /> Secure Processing
              </h3>
              <p className="text-sm text-cyan-100/70 leading-relaxed">
                Your images never leave your device. All operations are done entirely in your browser using the HTML5 Canvas API. This ensures maximum privacy and blazingly fast processing times!
              </p>
            </div>

          </div>

        </div>
        <div className="w-full bg-[#0a0a0a] mt-12">
          <ToolSEOSection {...seoData} />
        </div>
      </div>
    </div>
  );
}
