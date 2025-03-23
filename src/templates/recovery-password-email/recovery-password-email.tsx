import type * as React from 'react'

interface RecoveryPasswordEmailTemplateProps {
  url: string
  token: string
}

export const RecoveryPasswordEmailTemplate: React.FC<
  Readonly<RecoveryPasswordEmailTemplateProps>
> = ({ token, url }) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9fafb',
      color: '#374151',
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
        Password Recovery
      </h1>
      <p style={{ fontSize: '16px', marginTop: '10px' }}>
        You have requested a password recovery. Use the code below or click the
        button to reset your password:
      </p>
      <div
        style={{
          backgroundColor: '#e5e7eb',
          padding: '10px',
          borderRadius: '4px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          margin: '20px 0',
        }}
      >
        {token}
      </div>
      <a
        href={url}
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          borderRadius: '5px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Reset Password
      </a>
      <p style={{ fontSize: '14px', marginTop: '20px', color: '#6b7280' }}>
        If you did not request this change, please ignore this email.
      </p>
    </div>
  </div>
)
