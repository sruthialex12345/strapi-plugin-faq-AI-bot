import React, { useState } from 'react';
import { Box, Typography, Textarea } from '@strapi/design-system';
import { Information } from '@strapi/icons';
const tonePrompts: Record<string, string> = {
  friendly: `Respond in a friendly and warm tone. Be conversational and approachable.`,
  professional: `Respond in a professional and formal tone. Keep responses structured and respectful.`,
  concise: `Respond concisely and directly. Avoid unnecessary details.`,
};
interface InstructionsSectionProps {
  systemInstructions: string;
  responseInstructions: string;
  onUpdateSystem: (val: string) => void;
  onUpdateResponse: (val: string) => void;
}
const InstructionsSection = ({
  systemInstructions,
  responseInstructions,
  onUpdateSystem,
  onUpdateResponse,
}: InstructionsSectionProps) => {
  const [tone, setTone] = useState<'friendly' | 'professional' | 'concise'>('friendly');
  const selectTone = (t: 'friendly' | 'professional' | 'concise') => {
    setTone(t);
    onUpdateResponse(tonePrompts[t]); // still sends text to backend
  };
  const pillStyle = (active: boolean) => ({
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    transition: 'all .15s',
    cursor: 'pointer',
    border: active ? '1.5px solid rgb(73,69,255)' : '1.5px solid rgb(220,220,228)',
    background: active ? 'rgb(234,233,254)' : '#fff',
    color: active ? 'rgb(73,69,255)' : 'rgb(102,102,135)',
    fontWeight: active ? 600 : 400,
  });
  return (
    <>
      {/* CONTENT */}
      <Box style={{ padding: '16px 24px 20px' }}>
        {/* SYSTEM INSTRUCTIONS */}
        <Box style={{ marginBottom: '20px' }}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgb(50,50,77)',
              }}
            >
              System Instructions
            </span>
            <Information width={13} height={13} fill="#8e8ea9" color="#8e8ea9" />
          </Box>
          <p
            style={{
              fontSize: '11px',
              color: 'rgb(142,142,169)',
              marginBottom: '8px',
            }}
          >
            Each line is a separate instruction. Changes auto-save when you click elsewhere.
          </p>
          <Box
            style={{
              border: '1.5px solid rgb(220,220,228)',
              borderRadius: '8px',
              padding: '8px',
              background: '#fff',
              transition: 'border-color .15s, box-shadow .15s',
            }}
            onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
              e.currentTarget.style.border = '1.5px solid rgb(99,91,255)';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(99,91,255,0.15)';
            }}
            onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
              e.currentTarget.style.border = '1.5px solid rgb(220,220,228)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Box
              as="textarea"
              value={systemInstructions}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onUpdateSystem(e.target.value)
              }
              placeholder={`Replace Madras with Chennai
Always respond in English
Don't mention competitor airlines`}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '10px 12px',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                fontSize: '13px',
                color: 'rgb(50,50,77)',
                lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
                background: '#fff',
              }}
            />
          </Box>
        </Box>
        {/* RESPONSE TONE */}
        <Box
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid rgb(234,234,239)',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgb(50,50,77)',
              marginBottom: '6px',
            }}
          >
            Response Tone
          </div>
          <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button style={pillStyle(tone === 'friendly')} onClick={() => selectTone('friendly')}>
              Friendly & Warm
            </button>
            <button
              style={pillStyle(tone === 'professional')}
              onClick={() => selectTone('professional')}
            >
              Professional
            </button>
            <button style={pillStyle(tone === 'concise')} onClick={() => selectTone('concise')}>
              Concise
            </button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default InstructionsSection;