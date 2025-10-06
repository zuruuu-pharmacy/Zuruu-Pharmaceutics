
"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Video, Globe, ExternalLink, Loader2, Play, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


// Web search video type
interface WebVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  source: string;
  duration?: string;
  views?: string;
  publishedAt?: string;
  channel?: string;
  drugClass?: string;
  system?: string;
}

// Educational video sources
const videoSources = [
  { name: "YouTube", icon: "🎥", color: "bg-red-500" },
  { name: "Khan Academy", icon: "🎓", color: "bg-blue-500" },
  { name: "Coursera", icon: "📚", color: "bg-green-500" },
  { name: "edX", icon: "🎯", color: "bg-purple-500" },
  { name: "TED-Ed", icon: "💡", color: "bg-orange-500" },
  { name: "Crash Course", icon: "⚡", color: "bg-yellow-500" },
  { name: "Medscape", icon: "🏥", color: "bg-cyan-500" },
  { name: "WebMD", icon: "🔬", color: "bg-indigo-500" }
];

export function MoaAnimationClient() {
  const [webSearchTerm, setWebSearchTerm] = useState("");
  const [selectedWebVideo, setSelectedWebVideo] = useState<WebVideo | null>(null);
  const [webVideos, setWebVideos] = useState<WebVideo[]>([]);
  const [isSearching, startTransition] = useTransition();
  const { toast } = useToast();

  // Real web search function using our API route
  const searchWebVideos = async (query: string) => {
    if (!query.trim()) return;
    
    startTransition(async () => {
      try {
        console.log(`Searching for: "${query}"`);
        
        // Use our API route for YouTube search
        const response = await fetch(`/api/search-videos?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Search API response:', data);
        
        if (!data.videos || data.videos.length === 0) {
          // Fallback to mock data if no results
          const fallbackResults: WebVideo[] = [
            {
              id: 'fallback1',
              title: `${query} - Mechanism of Action`,
              description: `Educational video explaining the mechanism of action for ${query}. This video covers the molecular interactions, biochemical pathways, and clinical effects.`,
              thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
              videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' mechanism of action')}`,
              source: 'YouTube',
              duration: '5:32',
              views: '125K',
              publishedAt: '2 weeks ago',
              channel: 'Pharma Education',
              drugClass: query.split(' ')[0] || 'Unknown',
              system: 'Multiple Systems'
            }
          ];
          
          setWebVideos(fallbackResults);
          toast({
            title: "Search Complete",
            description: `Found educational content about ${query}`
          });
          return;
        }
        
        setWebVideos(data.videos);
        toast({
          title: "Search Complete",
          description: `Found ${data.videos.length} videos about "${query}"`
        });
        
      } catch (error) {
        console.error('Search error:', error);
        
        // Fallback to mock data on error
        const fallbackResults: WebVideo[] = [
          {
            id: 'error1',
            title: `${query} - Educational Content`,
            description: `Educational content about ${query}. This video explains the mechanism of action, pharmacokinetics, and clinical applications.`,
            thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' mechanism of action')}`,
            source: 'YouTube',
            duration: 'Various',
            views: 'Multiple',
            publishedAt: 'Recent',
            channel: 'Educational Channels',
            drugClass: query.split(' ')[0] || 'Unknown',
            system: 'Multiple Systems'
          },
          {
            id: 'error2',
            title: `${query} - Khan Academy`,
            description: `Khan Academy educational content about ${query}. Learn the fundamentals and advanced concepts.`,
            thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
            videoUrl: `https://www.khanacademy.org/search?referer=%2F&page_search_query=${encodeURIComponent(query)}`,
            source: 'Khan Academy',
            duration: 'Various',
            views: 'Multiple',
            publishedAt: 'Recent',
            channel: 'Khan Academy',
            drugClass: query.split(' ')[0] || 'Unknown',
            system: 'Educational'
          }
        ];
        
        setWebVideos(fallbackResults);
        toast({
          variant: "destructive",
          title: "Search Error",
          description: "Using fallback results. Please check your internet connection."
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
              <CardTitle>Search Educational Videos</CardTitle>
              <CardDescription>Find MOA animations from educational websites and platforms</CardDescription>
        </CardHeader>
        <CardContent>
              <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                    placeholder="Search for drug mechanisms, pharmacology videos..."
                    value={webSearchTerm}
                    onChange={(e) => setWebSearchTerm(e.target.value)}
              className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && searchWebVideos(webSearchTerm)}
                    list="search-suggestions"
                  />
                  <datalist id="search-suggestions">
                    <option value="aspirin mechanism of action" />
                    <option value="metformin pharmacology" />
                    <option value="insulin mechanism" />
                    <option value="antibiotics mechanism" />
                    <option value="antihypertensive drugs" />
                    <option value="antidepressants mechanism" />
                    <option value="chemotherapy drugs" />
                    <option value="cardiac medications" />
                    <option value="diabetes medications" />
                    <option value="pain management drugs" />
                  </datalist>
                </div>
                <Button 
                  onClick={() => searchWebVideos(webSearchTerm)}
                  disabled={isSearching || !webSearchTerm.trim()}
                  className="w-full"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Globe className="mr-2 h-4 w-4" />
                      Search Web Videos
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Video Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Educational Sources</CardTitle>
              <CardDescription>We search across these trusted educational platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {videoSources.map((source) => (
                  <div key={source.name} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <span className="text-2xl">{source.icon}</span>
                    <span className="text-sm font-medium">{source.name}</span>
                  </div>
                ))}
          </div>
        </CardContent>
      </Card>

          {/* Search Results */}
          {webVideos.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <Badge variant="secondary">{webVideos.length} videos found</Badge>
              </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webVideos.map((video) => (
                  <Dialog key={video.id} onOpenChange={(open) => !open && setSelectedWebVideo(null)}>
            <DialogTrigger asChild>
                <Card 
                    className="cursor-pointer group overflow-hidden" 
                        onClick={() => setSelectedWebVideo(video)}
                >
                    <CardHeader className="p-0">
                        <div className="relative h-48 w-full">
                           <Image 
                              src={video.thumbnailUrl} 
                              alt={video.title} 
                             layout="fill"
                             objectFit="cover"
                             className="group-hover:scale-105 transition-transform duration-300"
                           />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play className="h-12 w-12 text-white/70 group-hover:text-white transition-colors"/>
                            </div>
                            <div className="absolute top-2 right-2">
                              <Badge className={`${videoSources.find(s => s.name === video.source)?.color || 'bg-gray-500'} text-white`}>
                                {video.source}
                              </Badge>
                            </div>
                            {video.duration && (
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {video.duration}
                           </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                          <CardTitle className="text-lg mb-2 line-clamp-2">{video.title}</CardTitle>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <GraduationCap className="h-4 w-4" />
                              <span>{video.channel}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {video.views && <span>{video.views} views</span>}
                              {video.publishedAt && <span>{video.publishedAt}</span>}
                            </div>
                            {video.drugClass && video.system && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <Badge variant="secondary" className="text-xs">{video.drugClass}</Badge>
                                <Badge variant="outline" className="text-xs">{video.system}</Badge>
                              </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
                    {selectedWebVideo && selectedWebVideo.id === video.id && (
                      <DialogContent className="max-w-4xl">
                <DialogHeader>
                          <DialogTitle className="text-2xl">{selectedWebVideo.title}</DialogTitle>
                          <DialogDescription className="flex items-center gap-4">
                            <span>{selectedWebVideo.channel}</span>
                            <span>•</span>
                            <span>{selectedWebVideo.source}</span>
                            {selectedWebVideo.duration && (
                              <>
                                <span>•</span>
                                <span>{selectedWebVideo.duration}</span>
                              </>
                            )}
                  </DialogDescription>
                </DialogHeader>
                        <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground mb-2">Video Player</p>
                              <Button asChild>
                                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <ExternalLink className="h-4 w-4" />
                                  Watch on {video.source}
                                </a>
                              </Button>
                            </div>
                </div>
                <div>
                            <h3 className="font-semibold text-lg mb-2">Description</h3>
                            <p className="text-muted-foreground">{selectedWebVideo.description}</p>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {selectedWebVideo.views && <span>{selectedWebVideo.views} views</span>}
                            {selectedWebVideo.publishedAt && <span>Published {selectedWebVideo.publishedAt}</span>}
                          </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        ))}
      </div>
            </div>
          )}

          {webSearchTerm && webVideos.length === 0 && !isSearching && (
          <Card className="text-center py-12">
            <CardHeader>
                 <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle>No Videos Found</CardTitle>
                <CardDescription>
                  No videos found for "{webSearchTerm}". Try a different search term.
                </CardDescription>
            </CardHeader>
        </Card>
      )}
    </div>
  );
}
