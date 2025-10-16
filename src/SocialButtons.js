import { Linkedin, MessageCircle, Instagram } from "lucide-react"
import { useState } from "react"

export function SocialButtons({ inline = false }) {
  const [hoveredButton, setHoveredButton] = useState(null)

  const buttons = [
    {
      id: "linkedin",
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
      hoverColor: "from-blue-700 to-blue-800",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      href: "https://wa.me/",
      label: "WhatsApp",
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "from-emerald-600 to-emerald-700",
    },
    {
      id: "instagram",
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
      color: "from-pink-500 via-rose-500 to-orange-500",
      hoverColor: "from-pink-600 via-rose-600 to-orange-600",
    },
  ]

  const containerStyle = inline
    ? { position: 'relative', display: 'flex', flexDirection: 'row', gap: 20, marginTop: 28, alignItems: 'center' }
    : { position: 'fixed', right: 16, bottom: 32, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 12 }

  const size = inline ? 64 : 56

  return (
    <div style={containerStyle}>
      {buttons.map((button, index) => {
        const Icon = button.icon
        const isHovered = hoveredButton === button.id

        return (
          <a
            key={button.id}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={button.label}
            onMouseEnter={() => setHoveredButton(button.id)}
            onMouseLeave={() => setHoveredButton(null)}
            className="group"
            style={{
              animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
              position: 'relative',
              display: 'inline-block'
            }}
          >
            {/* Glow effect */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 12,
                filter: 'blur(12px)',
                opacity: isHovered ? 0.6 : 0,
                transition: 'opacity 300ms',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9))'
              }}
            />

            {/* Button */}
            <div
              style={{
                position: 'relative',
                height: size,
                width: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                boxSizing: 'border-box',
                border: '5px solid #031927',
                background: isHovered ? 'linear-gradient(135deg, #2563eb, #1e40af)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                transition: 'all 300ms',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <Icon style={{ height: size * 0.55, width: size * 0.55, color: '#fff', transition: 'transform 300ms', transform: isHovered ? 'scale(1.05)' : 'scale(1)' }} />
            </div>

            {/* Label tooltip */}
            <div
              style={{
                position: 'absolute',
                right: '100%',
                top: '50%',
                marginRight: 12,
                transform: `translateY(-50%) ${isHovered ? 'translateX(0)' : 'translateX(8px)'}`,
                whiteSpace: 'nowrap',
                borderRadius: 8,
                background: '#111827',
                padding: '8px 10px',
                color: '#fff',
                fontSize: 14,
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                opacity: isHovered ? 1 : 0,
                pointerEvents: isHovered ? 'auto' : 'none',
                transition: 'all 300ms'
              }}
            >
              {button.label}
              <div style={{ position: 'absolute', right: -6, top: '50%', height: 8, width: 8, transform: 'translateY(-50%) rotate(45deg)', background: '#111827' }} />
            </div>
          </a>
        )
      })}

      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(100px);} to { opacity: 1; transform: translateX(0);} }`}</style>
    </div>
  )
}

export default SocialButtons
