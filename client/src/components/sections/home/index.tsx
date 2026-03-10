import { forwardRef } from 'react';
import { profileData } from '../../../data/profile';
import ProfileCard from './ProfileCard';
import ContactIcons from './ContactIcons';
import SkillTags from './SkillTags';

interface SectionProps {
  id: string;
}

const Home = forwardRef<HTMLElement | null, SectionProps>((props, ref) => {
  return (
    <section 
      id={props.id} 
      ref={ref} 
      className="min-h-full w-full flex items-center justify-center relative px-6 md:px-10 py-16 md:py-0"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-20 w-full max-w-7xl">
        
        {/* 左側：個人卡片 */}
        <div className="w-full md:w-auto flex justify-center">
          <ProfileCard 
            name={profileData.name} 
            nameEn={profileData.nameEn} 
            imagePath="Shuan.jpg" 
          />
        </div>

        {/* 右側：詳細文字介紹區 */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-stone-800 text-3xl md:text-5xl font-black tracking-tighter">
              About Me
            </h2>
            
            <p className="text-blue-600 text-xl md:text-2xl font-extrabold tracking-tight leading-snug">
              {profileData.title}
            </p>
            
            <div className="max-w-2xl mx-auto md:mx-0 text-stone-500 leading-relaxed font-medium text-base md:text-lg space-y-2">
              {profileData.education.map((edu, i) => (
                <p key={i} className="flex flex-col sm:block">
                  <span className="text-stone-400 text-xs md:text-sm uppercase tracking-widest block md:inline md:mr-2">
                    {edu.status}
                  </span>
                  <span className="text-stone-900 font-bold block md:inline">
                    {edu.school} {edu.department}
                  </span>
                </p>
              ))}
              <p className="pt-2 text-stone-600">
                {profileData.bio}
              </p>
            </div>
          </div>

          {/* 聯絡資訊圖標 */}
          <div className="flex justify-center md:justify-start">
            <ContactIcons contact={profileData.contact} />
          </div>
          
          {/* 技能標籤區 */}
          <div className="flex justify-center md:justify-start">
            <SkillTags skills={profileData.skills} />
          </div>
        </div>
      </div>
    </section>
  );
});

Home.displayName = 'Home';
export default Home;