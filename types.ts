export interface Service {
  id: number;
  title: string;
  items: string[];
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum AppView {
  LANDING = 'LANDING',
  AI_CHAT = 'AI_CHAT',
  AI_ANALYZE = 'AI_ANALYZE',
  AI_GENERATE = 'AI_GENERATE',
  AI_VIDEO = 'AI_VIDEO'
}

export interface ImageSizeOption {
  label: string;
  value: "1K" | "2K" | "4K";
}
