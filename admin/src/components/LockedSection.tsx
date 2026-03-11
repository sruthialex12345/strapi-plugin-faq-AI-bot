import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Typography } from '@strapi/design-system';
import { Lock } from '@strapi/icons';

const Container = styled(Box)`
  border-radius: 14px;
  border: 1px solid #DCDCE4;
  box-shadow: 0px 1px 4px 0px #2121340A;
  background: white;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const LockBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgb(246, 246, 249);
  border: 1px solid rgb(220, 220, 228);

  span {
    font-size: 11px;
    color: rgb(142, 142, 169);
    font-weight: 500;
  }

  svg {
    color: rgb(142, 142, 169);
  }
`;

const BlurOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(246, 246, 249, 0.88);
  backdrop-filter: blur(2px);
`;

const LockCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgb(234, 233, 254);

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 8px;

  svg {
    color: rgb(73, 69, 255);
  }
`;

const HeaderBox = styled(Box)`
  padding: 16px 24px 18px 24px;
  border-bottom: 1px solid #DCDCE4;
`;

interface LockedSectionProps {
  title: string;
  description: string;
  isLocked: boolean;
  children: React.ReactNode;
}

const LockedSection = ({
  title,
  description,
  isLocked,
  children,
}: LockedSectionProps) => {
  return (
    <Container marginBottom={6}>
      {/* HEADER - Always visible and above the blur */}
      <HeaderBox>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
                variant="delta"
                fontWeight="bold"
                style={{
                    fontSize: '14px',
                    color: isLocked ? 'rgb(142, 142, 169)' : '#32324D',
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="pi"
                style={{
                    fontSize: '12px',
                    marginTop: '4px',
                    display: 'block',
                    color: isLocked ? 'rgb(192, 192, 207)' : '#666687',
                }}
            >
                {description}
            </Typography>
          </Box>

          {isLocked && (
            <LockBadge>
              <Lock width={11} />
              <span>Complete Basic Settings to unlock</span>
            </LockBadge>
          )}
        </Flex>
      </HeaderBox>

      {/* CONTENT AREA */}
      <Box position="relative"> 
        {/* The overlay is now INSIDE this box, covering only the children */}
        {isLocked && (
          <BlurOverlay>
            <Flex direction="column" alignItems="center" gap={2}>
              <LockCircle>
                <Lock width={16} />
              </LockCircle>

              <Typography
                variant="omega"
                style={{ fontSize: '13px', color: 'rgb(102, 102, 135)', textAlign: 'center' }}
              >
                Fill in <b style={{ color: '#32324D' }}>Base Domain</b>,{' '}
                <b style={{ color: '#32324D' }}>OpenAI API Key</b> and{' '}
                <b style={{ color: '#32324D' }}>Contact Link</b> first.
              </Typography>
            </Flex>
          </BlurOverlay>
        )}

        <Box
          style={{
            opacity: isLocked ? 0.35 : 1,
            pointerEvents: isLocked ? 'none' : 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default LockedSection;