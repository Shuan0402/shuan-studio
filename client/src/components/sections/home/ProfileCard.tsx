import React from 'react';

interface ProfileCardProps {
  name: string;
  nameEn: string;
  imagePath: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, nameEn, imagePath }) => {
  return (
    <div className="flex flex-col items-center flex-none w-1/3 min-w-[300px]">
      <div className="relative group">
        <div className="w-64 h-64 rounded-full border-[0px] border-stone-800 flex items-center justify-center overflow-hidden bg-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
          <img 
            src={imagePath} 
            alt="Profile" 
            className="absolute w-full h-full object-cover rounded-full transition-opacity"
          />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h1 className="text-3xl font-black text-stone-800 tracking-tight">
          {name} <span className="text-stone-400 font-light text-2xl ml-2">({nameEn})</span>
        </h1>
      </div>
    </div>
  );
};

export default ProfileCard;