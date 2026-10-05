import { Linkedin, MessageCircle, Instagram } from "lucide-react"
import { useState } from "react"
import useMediaQuery from './components/useMediaQuery'

export const SOCIAL_LINKS = [

    {
      id: "whatsapp",
      icon: MessageCircle,
      href: "https://wa.me/542966305853?text=Hola%21%20Tengo%20inter%C3%A9s%20en%20trabajar%20con%20ustedes%20y%20quer%C3%ADa%20saber%20c%C3%B3mo%20podemos%20avanzar.",
      label: "WhatsApp",
      color: "from-emerald-500 to-emerald-600",
      hoverColor: "from-emerald-600 to-emerald-700",
    },
    {
      id: "instagram",
      icon: Instagram,
      href: "https://www.instagram.com/thecave.ar/",
      label: "Instagram",
      color: "from-pink-500 via-rose-500 to-orange-500",
      hoverColor: "from-pink-600 via-rose-600 to-orange-600",
    },
        {
      id: "linkedin",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/thecaves-a/?viewAsMember=true",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
      hoverColor: "from-blue-700 to-blue-800",
    },
  ]

export function SocialButtons({ inline = false, compact = false }) {
  const [hoveredButton, setHoveredButton] = useState(null)
  const isMobile = useMediaQuery('(max-width: 900px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isInline = inline || compact || isMobile

  const containerStyle = compact
    ? { position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', gap: 20, padding: '0 16px', alignItems: 'center' }
    : isInline
      ? { position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, padding: '24px 16px 40px', alignItems: 'center' }
      : { position: 'fixed', right: 16, bottom: 32, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 12 }

  const size = 56

  return (
    <div className="social-buttons" style={containerStyle}>
      {SOCIAL_LINKS.map((button, index) => {
        const Icon = button.icon
        const isHovered = !reducedMotion && hoveredButton === button.id

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
              animation: reducedMotion ? 'none' : `slideIn 0.3s ease-out ${index * 0.1}s both`,
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
                background: isHovered ? 'linear-gradient(135deg, #022163, #021041)' : 'linear-gradient(135deg, #042c6c, #021743)',
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
                display: isInline ? 'none' : 'block',
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

      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateX(0);} }`}</style>
    </div>
  )
}

export default SocialButtons
