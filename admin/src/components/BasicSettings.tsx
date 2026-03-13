import React from 'react';
import { Box, Typography } from '@strapi/design-system';
import { Pencil, Check, Eye, EyeStriked } from '@strapi/icons';
import { useTheme } from 'styled-components';

type SettingType = 'key' | 'domain' | 'contact';

interface BasicSettingsProps {
  openaiKey: string;
  baseDomain: string;
  contactLink: string;
  onManage: (type: SettingType, value?: string) => void;
}

interface SettingRowProps {
  title: string;
  description: string;
  value: string;
  type: SettingType;
  hovered: SettingType | null;
  editing: SettingType | null;
  saved: SettingType | null;
  tempValue: string;
  setHovered: (v: SettingType | null) => void;
  setEditing: (v: SettingType | null) => void;
  setSaved: (v: SettingType | null) => void;
  setTempValue: (v: string) => void;
  onManage: (type: SettingType, value?: string) => void;
  isLast?: boolean;
}

const SettingRow = ({
  title,
  description,
  value,
  type,
  hovered,
  editing,
  saved,
  tempValue,
  setHovered,
  setEditing,
  setSaved,
  setTempValue,
  onManage,
  isLast = false,
}: SettingRowProps) => {
  const [showKey, setShowKey] = React.useState(false);
  const theme = useTheme();

  const handleSave = () => {
    onManage(type, tempValue);
    setEditing(null);
    setSaved(type);

    setTimeout(() => {
      setSaved(null);
    }, 2000);
  };

  return (
    <Box
      onMouseEnter={() => setHovered(type)}
      onMouseLeave={() => setHovered(null)}
      style={{
        display: 'flex',
        gap: '16px',
        padding: '16px 24px',
        borderBottom: isLast ? 'none' : `1px solid ${theme.colors.neutral150}`,
        background: editing === type ? theme.colors.primary100 : theme.colors.neutral0,
        transition: 'background 0.2s ease',
        alignItems: 'center',
      }}
    >
      {/* LEFT */}
      <Box style={{ width: '168px', flexShrink: 0 }}>
        <Typography
          variant="omega"
          fontWeight="600"
          textColor="neutral800"
          style={{ fontSize: '13px', display: 'block', marginBottom: '2px' }}
        >
          {title}
        </Typography>

        <Typography variant="pi" textColor="neutral500" style={{ lineHeight: 1.4, fontSize: '11px' }}>
          {description}
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box style={{ flex: 1 }}>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {editing === type ? (
            <>
              {/* NEW WRAPPER FOR INPUT + EYE ICON */}
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '360px',
                  borderRadius: '8px',
                  border: `1.5px solid ${theme.colors.primary600}`,
                  background: theme.colors.neutral0,
                  // boxShadow: `0 0 0 3px ${theme.colors.primary100}`,
                  overflow: 'hidden',
                }}
              >
                <input
                  autoFocus
                  type={type === 'key' && !showKey ? 'password' : 'text'}
                  placeholder={
                    type === 'domain'
                      ? 'https://your-domain.com'
                      : type === 'contact'
                        ? 'https://your-domain.com/contact'
                        : 'sk-…'
                  }
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '13px',
                    color: theme.colors.neutral800,
                    background: 'transparent',
                  }}
                />

                {/* EYE ICON TOGGLE */}
                {type === 'key' && (
                  <button
                    onClick={() => setShowKey(!showKey)}
                    style={{
                      paddingRight: '12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showKey ? (
                      <Eye width={16} height={16} fill={theme.colors.neutral500} />
                    ) : (
                      <EyeStriked width={16} height={16} fill={theme.colors.neutral500} />
                    )}
                  </button>
                )}
              </Box>

              <button
                onClick={handleSave}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: theme.colors.primary600,
                  color: theme.colors.neutral0,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                Save
              </button>

              <button
                onClick={() => setEditing(null)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.neutral200}`,
                  background: theme.colors.neutral0,
                  color: theme.colors.neutral800,
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {value ? (
                <Typography
                  variant="omega"
                  textColor={type === 'key' ? "neutral500" : "primary600"}
                  style={{
                    fontSize: '13px',
                    maxWidth: '320px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {type === 'key' ? '••••••••••••' : value}
                </Typography>
              ) : (
                <Box
                  style={{
                    padding: '2px 10px',
                    borderRadius: '999px',
                    background: theme.colors.danger100,
                  }}
                >
                  <Typography
                    variant="pi"
                    textColor="danger600"
                    fontWeight="600"
                    style={{ fontSize: '11px', letterSpacing: '0.04em' }}
                  >
                    NOT CONFIGURED
                  </Typography>
                </Box>
              )}

              {saved === type && (
                <Box
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '4px' }}
                >
                  <Check width={12} height={12} fill={theme.colors.success600} />
                  <Typography
                    variant="pi"
                    textColor="success600"
                    style={{ fontSize: '12px', fontWeight: 500 }}
                  >
                    Saved
                  </Typography>
                </Box>
              )}
            </>
          )}

          {/* EDIT BUTTON */}
          {editing !== type && (
            <button
              onClick={() => {
                setEditing(type);
                setTempValue(value);
              }}
              style={{
                marginLeft: saved === type ? '8px' : '0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.primary600}`,
                color: theme.colors.primary600,
                fontSize: '11px',
                fontWeight: 600,
                background: 'transparent',
                cursor: 'pointer',
                opacity: hovered === type || saved === type ? 1 : 0,
                transition: 'all 0.2s ease',
              }}
            >
              <Pencil width={11} height={11} />
              Edit
            </button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const BasicSettings = ({ openaiKey, baseDomain, contactLink, onManage }: BasicSettingsProps) => {
  const [hovered, setHovered] = React.useState<SettingType | null>(null);
  const [editing, setEditing] = React.useState<SettingType | null>(null);
  const [saved, setSaved] = React.useState<SettingType | null>(null);
  const [tempValue, setTempValue] = React.useState('');
  const theme = useTheme();

  return (
    <Box
      style={{
        background: theme.colors.neutral0,
        border: `1px solid ${theme.colors.neutral200}`,
        borderRadius: '12px',
        overflow: 'hidden',
        // boxShadow: `${theme.colors.neutral900} 0px 1px 4px`,
        marginBottom: '24px',
      }}
    >
      {/* HEADER */}
      <Box
        style={{
          padding: '16px 24px',
          borderBottom: `1px solid ${theme.colors.neutral150}`,
        }}
      >
        <div>
          <Typography
            as="h2"
            textColor="neutral800"
            style={{
              fontSize: '14px',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Basic Settings
          </Typography>

          <Typography
            as="p"
            textColor="neutral600"
            style={{
              fontSize: '12px',
              marginTop: '3px',
              lineHeight: 1.5,
              marginBottom: 0,
            }}
          >
            Core identity and access configuration for your chatbot.
          </Typography>
        </div>
      </Box>

      <SettingRow
        type="domain"
        title="Base Domain"
        description="Root URL used to scope chatbot context"
        value={baseDomain}
        hovered={hovered}
        editing={editing}
        saved={saved}
        tempValue={tempValue}
        setHovered={setHovered}
        setEditing={setEditing}
        setSaved={setSaved}
        setTempValue={setTempValue}
        onManage={onManage}
      />

      <SettingRow
        type="key"
        title="OpenAI API Key"
        description="Stored encrypted — never exposed to users"
        value={openaiKey}
        hovered={hovered}
        editing={editing}
        saved={saved}
        tempValue={tempValue}
        setHovered={setHovered}
        setEditing={setEditing}
        setSaved={setSaved}
        setTempValue={setTempValue}
        onManage={onManage}
      />

      <SettingRow
        type="contact"
        title="Contact Link"
        description="Shown as 'Talk to Support' in the chatbot"
        value={contactLink}
        hovered={hovered}
        editing={editing}
        saved={saved}
        tempValue={tempValue}
        setHovered={setHovered}
        setEditing={setEditing}
        setSaved={setSaved}
        setTempValue={setTempValue}
        onManage={onManage}
        isLast
      />
    </Box>
  );
};

export default BasicSettings;