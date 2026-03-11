import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Typography } from '@strapi/design-system';
import { CheckCircle,  CrossCircle } from '@strapi/icons'; // Added Dot import

const ZapIcon = ({ width = 15, height = 15, color = 'rgb(73, 69, 255)' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
);

const ProgressContainer = styled(Box)`
  border-radius: 12px;
  border: 1px solid rgb(220, 220, 228);
  box-shadow: rgba(33, 33, 52, 0.04) 0px 1px 4px;
  background: white;
  margin-bottom: 24px;
  overflow: hidden;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background: rgb(234, 234, 239);
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ percent: number; isFull: boolean }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  /* Switches to Blue when not full, Green Gradient when full */
  background: ${({ isFull }) => (isFull 
    ? 'linear-gradient(90deg, rgb(50, 128, 72), rgb(74, 222, 128))' 
    : 'linear-gradient(90deg,rgb(73, 69, 255),rgb(124, 120, 255))')};
  transition: width 0.5s ease-in-out;
  border-radius: 999px;
`;

const StatusTag = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  
  /* Matches the muted lavender/grey look in your screenshot for disabled state */
  background: ${({ active }) => (active ? 'rgb(234, 251, 231)' : '#F6F6F9')};
  border: 1px solid ${({ active }) => (active ? 'rgb(198, 240, 194)' : '#EAEAEF')};
  color: ${({ active }) => (active ? 'rgb(50, 128, 72)' : '#8E8EA9')};

  svg {
    width: 11px;
    height: 11px;
  }
`;

const CountBadge = styled.span<{ isFull: boolean }>`
  /* Switches to Blue theme when not full */
  background: ${({ isFull }) => (isFull ? 'rgb(234, 251, 231)' : '#F0F0FF')};
  color: ${({ isFull }) => (isFull ? 'rgb(50, 128, 72)' : '#4945FF')};
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
`;

interface SetupProgressProps {
  baseDomain: string;
  openaiKey: string;
  contactLink: string;
  collections: any[];
  questions: string[];
  instructions: boolean;
}

const SetupProgress = ({ baseDomain, openaiKey, contactLink, collections, questions, instructions }: SetupProgressProps) => {
  const tasks = [
    { label: 'Base Domain', done: !!baseDomain && baseDomain !== '' },
    { label: 'OpenAI API Key', done: !!openaiKey && openaiKey !== '' },
    { label: 'Contact Link', done: !!contactLink && contactLink !== '' },
    { label: 'Collections', done: collections.length > 0 },
    { label: 'Suggested Questions', done: questions.length > 0 },
    { label: 'AI Instructions', done: instructions },
  ];

  const completedCount = tasks.filter((t) => t.done).length;
  const isFull = completedCount === tasks.length;
  const percentage = (completedCount / tasks.length) * 100;

  return (
    <ProgressContainer>
      <Box padding={6}>
        <Flex justifyContent="space-between" alignItems="flex-start" marginBottom={3}>
          <Box>
            <Flex gap={2} alignItems="center">
              <ZapIcon />
              <Typography variant="delta" fontWeight="bold" textColor="neutral800" style={{ fontSize: '14px' }}>
                Setup Progress
              </Typography>
            </Flex>
            <Typography variant="pi" textColor="neutral600" style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {isFull 
                ? '🎉 Your chatbot is fully configured and ready to go!' 
                : "Configure your AI chatbot's identity, data, and behaviour."}
            </Typography>
          </Box>
          <CountBadge isFull={isFull}>{completedCount}/{tasks.length}</CountBadge>
        </Flex>

        <ProgressBarWrapper>
          <ProgressBar percent={percentage} isFull={isFull} />
        </ProgressBarWrapper>

        <Flex gap={2} wrap="wrap" marginTop={4}>
          {tasks.map((task, i) => (
            <StatusTag key={i} active={task.done}>
              {/* Uses CheckCircle if done, Dot if not done */}
              {task.done ? <CheckCircle /> : <CrossCircle />}
              {task.label}
            </StatusTag>
          ))}
        </Flex>
      </Box>
    </ProgressContainer>
  );
};

export default SetupProgress;