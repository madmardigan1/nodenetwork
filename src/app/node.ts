export interface Node {
    id: number;
    borderWidth?: number;
    color?: {
      background?: string;
      border?: string;
    }
    label: string;
    quality?: number;
    font?: {
      color: string;
    };
    time: number;
    size: number; 
    // Add other properties as needed...
  }
  