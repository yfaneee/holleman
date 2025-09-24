/**
 * Utility functions for text formatting
 */

/**
 * Convert markdown-style bold text (**text**) to HTML bold tags
 * @param text - The text to convert
 * @returns The text with markdown bold converted to HTML
 */
export const convertMarkdownBold = (text: string): string => {
  // Replace **text** with <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

/**
 * Convert markdown-style formatting to HTML
 * Supports: **bold**, *italic*
 * @param text - The text to convert
 * @returns The text with markdown converted to HTML
 */
export const convertBasicMarkdown = (text: string): string => {
  let formattedText = text;
  
  // Convert **bold** to <strong>bold</strong>
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em>italic</em> (but only single asterisks that aren't part of double)
  formattedText = formattedText.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');
  
  return formattedText;
};

/**
 * Process a paragraph with markdown formatting and line breaks
 * @param paragraph - The paragraph text to process
 * @returns The processed HTML string
 */
export const processParagraphFormatting = (paragraph: string): string => {
  // First convert markdown formatting
  let processed = convertBasicMarkdown(paragraph);
  
  // Then handle <br/> tags
  processed = processed.replace(/<br\/?>/g, '<br />');
  
  return processed;
};

