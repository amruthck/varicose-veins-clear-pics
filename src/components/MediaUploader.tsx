import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Video, Trash2, Eye, X, Play, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface UploadedMediaItem {
  id: string;
  type: 'image' | 'video';
  name: string;
  size: string;
  dataUrl: string;
  timestamp: string;
}

interface MediaUploaderProps {
  mediaItems: UploadedMediaItem[];
  onAddMedia: (item: UploadedMediaItem) => void;
  onRemoveMedia: (id: string) => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  mediaItems,
  onAddMedia,
  onRemoveMedia,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [activePreview, setActivePreview] = useState<UploadedMediaItem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const images = mediaItems.filter(m => m.type === 'image');
  const videos = mediaItems.filter(m => m.type === 'video');

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleImageFiles = (files: FileList | null) => {
    if (!files) return;
    setErrorMsg(null);

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Please select valid image files (JPG, PNG, WebP).');
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg('Image file size exceeds 15MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onAddMedia({
            id: 'img-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
            type: 'image',
            name: file.name,
            size: formatFileSize(file.size),
            dataUrl: e.target.result as string,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoFiles = (files: FileList | null) => {
    if (!files) return;
    setErrorMsg(null);

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('video/')) {
        setErrorMsg('Please select valid video files (MP4, WebM, MOV).');
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setErrorMsg('Video file size exceeds 50MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onAddMedia({
            id: 'vid-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
            type: 'video',
            name: file.name,
            size: formatFileSize(file.size),
            dataUrl: e.target.result as string,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-white border border-[#1B2430]/15 rounded-[4px] p-5 sm:p-6 shadow-xs">
      
      {/* Header and Guidelines */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1B2430]/10 gap-2 mb-4">
        <div>
          <h4 className="font-serif text-base font-bold text-[#1B2430] flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#2E6E62]" />
            <span>Attach Visual Evidence (Photos &amp; Video Clips)</span>
          </h4>
          <p className="text-xs text-[#707E94] mt-0.5">
            Add images of leg varicosities or a brief standing video to contextualize your doctor consultation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#707E94]">
          <span className="bg-[#EFF1EA] px-2 py-0.5 rounded-[2px]">{images.length} Photos</span>
          <span>·</span>
          <span className="bg-[#EFF1EA] px-2 py-0.5 rounded-[2px]">{videos.length} Videos</span>
        </div>
      </div>

      {/* Error alert if any */}
      {errorMsg && (
        <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-[3px] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Dual Upload Triggers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        
        {/* Photo Upload Trigger */}
        <div
          onClick={() => imageInputRef.current?.click()}
          className="border-2 border-dashed border-[#1B2430]/20 hover:border-[#2E6E62] bg-[#F7F8F4] hover:bg-[#E4ECE8]/30 rounded-[3px] p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center group"
        >
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleImageFiles(e.target.files)}
            multiple
            accept="image/*"
            className="hidden"
          />
          <div className="w-9 h-9 rounded-full bg-white border border-[#1B2430]/15 flex items-center justify-center text-[#2E6E62] mb-2 group-hover:scale-105 transition-transform">
            <ImageIcon className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-[#1B2430]">
            Upload Leg / Vein Photos
          </span>
          <span className="text-[11px] text-[#707E94] mt-0.5">
            Select multiple PNG, JPG, or WebP
          </span>
        </div>

        {/* Video Upload Trigger */}
        <div
          onClick={() => videoInputRef.current?.click()}
          className="border-2 border-dashed border-[#1B2430]/20 hover:border-[#6B2737] bg-[#F7F8F4] hover:bg-[#F7ECEF]/40 rounded-[3px] p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center group"
        >
          <input
            type="file"
            ref={videoInputRef}
            onChange={(e) => handleVideoFiles(e.target.files)}
            multiple
            accept="video/*"
            className="hidden"
          />
          <div className="w-9 h-9 rounded-full bg-white border border-[#1B2430]/15 flex items-center justify-center text-[#6B2737] mb-2 group-hover:scale-105 transition-transform">
            <Video className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-[#1B2430]">
            Upload Standing / Walking Video
          </span>
          <span className="text-[11px] text-[#707E94] mt-0.5">
            Short clip showing calves/ankles (MP4, WebM)
          </span>
        </div>

      </div>

      {/* Uploaded Media Gallery */}
      {mediaItems.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-[#1B2430] mb-3 flex items-center justify-between">
            <span>Attached Media ({mediaItems.length})</span>
            <span className="text-[11px] text-[#707E94]">Click preview to inspect or remove</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {mediaItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#EFF1EA] border border-[#1B2430]/15 rounded-[3px] overflow-hidden flex flex-col"
              >
                {/* Thumbnail container */}
                <div className="h-28 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                  {item.type === 'image' ? (
                    <img
                      src={item.dataUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                      <video
                        src={item.dataUrl}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white">
                        <Play className="w-4 h-4 translate-x-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setActivePreview(item)}
                      className="p-1.5 bg-white/90 hover:bg-white text-[#1B2430] rounded-full text-xs"
                      title="Inspect preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveMedia(item.id)}
                      className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Caption Info */}
                <div className="p-2 text-[10px] text-[#4A5563] bg-white flex items-center justify-between border-t border-[#1B2430]/10">
                  <span className="truncate max-w-[100px] font-medium text-[#1B2430]" title={item.name}>
                    {item.name}
                  </span>
                  <span className="text-[#707E94] shrink-0 font-mono">{item.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photography Guide Note */}
      <div className="mt-4 pt-3 border-t border-[#1B2430]/10 flex items-start gap-2 text-[11px] text-[#707E94]">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6E62] shrink-0 mt-0.5" />
        <span>
          <strong>Photography tip:</strong> Stand upright against a plain background in bright, indirect light. Take one photo of the front of your legs, one from behind showing the calves, and one close-up of any prominent bulges or skin discoloration.
        </span>
      </div>

      {/* Modal Lightbox for Media Preview */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-white rounded-[4px] max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="p-3 bg-[#1B2430] text-white flex items-center justify-between text-xs font-semibold">
              <span className="truncate">{activePreview.name}</span>
              <button
                onClick={() => setActivePreview(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-black flex items-center justify-center max-h-[70vh]">
              {activePreview.type === 'image' ? (
                <img
                  src={activePreview.dataUrl}
                  alt={activePreview.name}
                  className="max-h-[60vh] max-w-full object-contain"
                />
              ) : (
                <video
                  src={activePreview.dataUrl}
                  controls
                  autoPlay
                  className="max-h-[60vh] max-w-full"
                />
              )}
            </div>

            <div className="p-3 bg-[#EFF1EA] flex items-center justify-between text-xs">
              <span className="text-[#707E94]">Size: {activePreview.size}</span>
              <button
                onClick={() => {
                  onRemoveMedia(activePreview.id);
                  setActivePreview(null);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-[2px] font-semibold flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove From Assessment</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
