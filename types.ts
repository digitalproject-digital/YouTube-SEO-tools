import React from 'react';

export enum ToolCategory {
  GENERATOR = 'AI Generators',
  EXTRACTOR = 'Extractors & Utilities',
  ANALYZER = 'Analysis & Planning',
}

export enum InputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  DROPDOWN = 'dropdown',
  URL = 'url',
  NUMBER = 'number',
  FILE = 'file' // For thumbnail resizer placeholder
}

export interface ToolInput {
  id: string;
  label: string;
  type: InputType;
  placeholder?: string;
  options?: string[]; // For dropdowns
  defaultValue?: string;
}

export interface ToolDef {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  icon: string;
  inputs: ToolInput[];
  systemPrompt?: string; // For AI tools
  utilityFunction?: (inputs: Record<string, string>) => Promise<string | React.ReactNode>; // For non-AI tools
}

export interface GenerationResult {
  text?: string;
  component?: React.ReactNode;
  error?: string;
}