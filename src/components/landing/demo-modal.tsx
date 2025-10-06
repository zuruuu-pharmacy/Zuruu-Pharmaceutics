"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import "@/styles/design-system.css";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // 30 second demo video
  const [showCaptions, setShowCaptions] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Captions data for accessibility
  const captions = [
    { time: 0, text: "Welcome to Zuruu Pharmaceutics platform" },
    { time: 5, text: "Our AI predicts medication needs and prevents stockouts" },
    { time: 10, text: "Clinical decision support helps pharmacists make safe decisions" },
    { time: 15, text: "Students learn with interactive modules and simulations" },
    { time: 20, text: "Patients can access their health records and get emergency help" },
    { time: 25, text: "Join thousands of healthcare professionals using Zuruu" }
  ];

  const currentCaption = captions.find(caption => 
    currentTime >= caption.time && 
    (captions[captions.indexOf(caption) + 1]?.time > currentTime || !captions[captions.indexOf(caption) + 1])
  );

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black/95 backdrop-blur-sm border border-white/20">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-display font-bold text-white">
                Zuruu Pharmaceutics Demo
              </DialogTitle>
              <DialogDescription className="text-white/80 font-primary mt-2">
                See how Zuruu transforms pharmacy operations across industry, hospitals, and retail
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 px-6 pb-6">
          {/* Video Player Area */}
          <div className="relative bg-slate-900 rounded-lg overflow-hidden mb-4">
            {/* Working Video Element */}
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              poster="/assets/hero/poster.jpg"
              aria-label="Zuruu Pharmaceutics platform demonstration video"
            >
              <source src="/assets/hero/hero.webm" type="video/webm" />
              <source src="/assets/hero/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Fallback placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <motion.div
                className="text-center text-white"
                animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
              >
                <div className="w-20 h-20 bg-[#1F59FF]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Play className="w-8 h-8 text-[#1F59FF]" />
                </div>
                <p className="text-lg font-display font-semibold mb-2">Demo Video</p>
                <p className="text-sm text-white/70 font-primary">
                  {isPlaying ? 'Playing...' : 'Click play to start demo'}
                </p>
              </motion.div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>

                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-[#1F59FF] h-full rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>

                <span className="text-white text-sm font-mono min-w-[40px]">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMuteToggle}
                  className="text-white hover:bg-white/20"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCaptions(!showCaptions)}
                  className="text-white hover:bg-white/20"
                  aria-label={showCaptions ? "Hide captions" : "Show captions"}
                >
                  <span className="text-xs font-semibold">CC</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Live Captions Display */}
            {showCaptions && currentCaption && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-primary border border-white/20">
                {currentCaption.text}
              </div>
            )}
          </div>

          {/* Captions/Transcript */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <h3 className="text-lg font-display font-semibold text-white mb-3">
              Demo Transcript
            </h3>
            <div className="space-y-2 text-sm text-white/80 font-primary">
              <p>
                <span className="text-[#1F59FF] font-semibold">[0:00]</span> Welcome to Zuruu Pharmaceutics, the comprehensive platform for modern pharmacy operations.
              </p>
              <p>
                <span className="text-[#1F59FF] font-semibold">[0:05]</span> Our AI-powered system serves industry, hospitals, retail, and academia with intelligent solutions.
              </p>
              <p>
                <span className="text-[#1F59FF] font-semibold">[0:10]</span> Watch as we demonstrate real-time analytics, predictive restocking, and clinical decision support.
              </p>
              <p>
                <span className="text-[#1F59FF] font-semibold">[0:15]</span> See how our platform transforms inventory management and patient care across all pharmacy settings.
              </p>
              <p>
                <span className="text-[#1F59FF] font-semibold">[0:20]</span> Experience the future of pharmacy intelligence with Zuruu AI.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
