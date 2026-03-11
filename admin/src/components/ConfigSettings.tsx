import React from 'react';
import { Box, Typography } from '@strapi/design-system';
import { Pencil, Check } from '@strapi/icons';

type SettingType = 'key' | 'domain' | 'contact';

interface ConfigSettingsProps {
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
        borderBottom: isLast ? 'none' : '1px solid rgb(234,234,239)',
        background: editing === type ? '#fafaff' : '#fff',
        transition: 'background 0.2s ease',
      }}
    >
      {/* LEFT */}
      <Box style={{ width: '168px', flexShrink: 0 }}>
        <Typography
          variant="omega"
          fontWeight="600"
          textColor="#32324d"
          style={{ fontSize: '13px', display: 'block', marginBottom: '2px' }}
        >
          {title}
        </Typography>

        <Typography
          variant="pi"
          textColor="#8E8EA9"
          style={{ lineHeight: 1.4, fontSize: '11px' }}
        >
          {description}
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box style={{ flex: 1 }}>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {editing === type ? (
            <>
              <input
                autoFocus
                type="text"
                placeholder={
                  type === 'domain'
                    ? 'https://your-domain.com'
                    : type === 'contact'
                    ? 'https://your-domain.com/contact'
                    : 'sk-…'
                }
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                }}
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  outline: 'none',
                  border: '1.5px solid #4945FF',
                  fontSize: '13px',
                  color: '#32324D',
                  background: '#fff',
                  boxShadow: '0 0 0 3px rgba(73,69,255,0.1)',
                }}
              />

              <button
                onClick={handleSave}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: '#4945FF',
                  color: '#fff',
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
                  border: '1px solid #ddd',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {/* VALUE */}
              {value ? (
                <Typography
                  variant="omega"
                  textColor={type === 'key' ? '#8E8EA9' : '#4945FF'}
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
                    background: '#FCECEA',
                  }}
                >
                  <Typography
                    variant="pi"
                    textColor="#D02B20"
                    fontWeight="600"
                    style={{ fontSize: '11px', letterSpacing: '0.04em' }}
                  >
                    NOT CONFIGURED
                  </Typography>
                </Box>
              )}

              {/* SAVED MESSAGE */}
              {saved === type && (
                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginLeft: '4px',
                  }}
                >
                  <Check width={12} height={12} fill="#328048" />

                  <Typography
                    variant="pi"
                    style={{
                      color: '#328048',
                      fontSize: '12px',
                      fontWeight: 500,
                    }}
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
                border: '1px solid #4945ff',
                color: '#4945FF',
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

const ConfigSettings = ({
  openaiKey,
  baseDomain,
  contactLink,
  onManage,
}: ConfigSettingsProps) => {
  const [hovered, setHovered] = React.useState<SettingType | null>(null);
  const [editing, setEditing] = React.useState<SettingType | null>(null);
  const [saved, setSaved] = React.useState<SettingType | null>(null);
  const [tempValue, setTempValue] = React.useState('');

  return (
    <Box
      style={{
        background: '#fff',
        border: '1px solid #dcdce4',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'rgba(33,33,52,0.04) 0px 1px 4px',
        marginBottom: '24px',
      }}
    >
      {/* HEADER */}
      <Box
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgb(234,234,239)',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'rgb(50,50,77)',
              margin: 0,
            }}
          >
            Basic Settings
          </h2>

          <p
            style={{
              fontSize: '12px',
              color: 'rgb(102,102,135)',
              marginTop: '3px',
              lineHeight: 1.5,
              marginBottom: 0,
            }}
          >
            Core identity and access configuration for your chatbot.
          </p>
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

export default ConfigSettings;