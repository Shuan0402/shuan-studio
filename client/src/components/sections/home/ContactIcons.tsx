import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

interface ContactIconsProps {
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
}

const ContactLink = ({ href, icon, tooltip, colorClass = "hover:text-blue-600" }: { 
  href: string; 
  icon: any; 
  tooltip: string;
  colorClass?: string;
}) => (
  <div className="relative group/item">
    <a 
      href={href} 
      target={href.startsWith('http') ? "_blank" : undefined}
      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
      className={`${colorClass} transition-colors duration-300`}
    >
      <FontAwesomeIcon icon={icon} />
    </a>
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/item:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-stone-800 text-white text-[11px] py-1.5 px-3 rounded shadow-xl translate-y-2 group-hover/item:translate-y-0">
      {tooltip}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-800"></div>
    </div>
  </div>
);

const ContactIcons: React.FC<ContactIconsProps> = ({ contact }) => {
  return (
    <div className="flex space-x-6 text-2xl text-stone-700 items-center">
      <ContactLink 
        href={`mailto:${contact.email}`} 
        icon={faEnvelope} 
        tooltip={contact.email} 
      />
      
      <ContactLink 
        href={`tel:${contact.phone}`} 
        icon={faPhone} 
        tooltip={contact.phone} 
      />
      
      <ContactLink 
        href={contact.github} 
        icon={faGithub} 
        tooltip="GitHub / Shuan0402" 
        colorClass="hover:text-stone-900"
      />
      
      <ContactLink 
        href={contact.linkedin} 
        icon={faLinkedin} 
        tooltip="LinkedIn / 穎宣 何" 
        colorClass="hover:text-[#0077b5]"
      />
    </div>
  );
};

export default ContactIcons;