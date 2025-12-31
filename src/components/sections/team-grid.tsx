import React from 'react';
import Image from 'next/image';

const ManSVG = () => (
  <div className="w-full h-full bg-slate-50 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 text-slate-400" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  </div>
);

const WomanSVG = () => (
  <div className="w-full h-full bg-slate-50 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 text-slate-400" fill="currentColor">
      <path d="M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 10c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zM12 11c-2.5 0-4.5-2-4.5-4.5S9.5 2 12 2s4.5 2 4.5 4.5S14.5 11 12 11z" opacity="0.1" />
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      <path d="M12 13c-2 0-3.5-1.5-3.5-3.5S10 6 12 6s3.5 1.5 3.5 3.5S14 13 12 13z" fill="currentColor" opacity="0.3" />
    </svg>
  </div>
);

const TeamGrid = () => {
  const teamMembers = [
    {
      name: "Mr. ASIM",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/WhatsApp_Image_2025-11-01_at_9.41.48_AM-1767031510531.webp?width=8000&height=8000&resize=contain",
      content: (
        <>
          <p className="mb-4">The Owner of <a href="/catalog" className="text-[#002b5c] hover:underline">LAPZEN</a></p>
          <p className="mb-4">A Tech Enthusiast</p>
          <p className="mb-4">Founder of LAPZEN</p>
          <p>
            <strong>Any Query,</strong><br />
            Feel Free to contact us at <a href="https://wa.me/+923090009022" className="text-[#002b5c] hover:underline">Whatsapp</a>
          </p>
        </>
      )
    },
    {
      name: "Mr. KASHIF",
      isSVG: true,
      svg: <ManSVG />,
      content: (
        <>
          <p className="mb-4">The Developer of the store.</p>
          <p>Maintaining the Live Store <a href="/catalog" className="text-[#002b5c] hover:underline">LAPZEN</a> for our valuable Customers.</p>
        </>
      )
    },
    {
      name: "Mrs. NIBA",
      isSVG: true,
      svg: <WomanSVG />,
      content: (
        <>
          <p className="mb-4">
            Co-Founder of <a href="/about" className="text-[#002b5c] hover:underline">LAPZEN</a><br />
            The Marketing Mastermind of Team <a href="/catalog" className="text-[#002b5c] hover:underline">LAPZEN</a>
          </p>
          <p className="mb-4">Digital Marketing Manager</p>
          <p>Social Media Marketer</p>
        </>
      )
    }
  ];

    return (
      <section className="relative z-10 bg-white rounded-t-[5rem] md:rounded-t-[8rem] shadow-[0_-40px_80px_rgba(0,0,0,0.1)] -mt-20">
          {/* Rich Text Intro Section */}
          <div className="pt-24 pb-12 px-5 bg-white rounded-t-[5rem] md:rounded-t-[8rem]">
            <div className="max-w-[1200px] mx-auto text-center">
              <h2 className="text-[48px] md:text-[84px] font-black italic uppercase leading-[0.85] mb-8 text-navy tracking-tighter">
                TEAM LAPZEN
              </h2>
              <div className="text-[14px] md:text-base text-slate-400 font-bold tracking-[0.4em] uppercase">
                <p>Introducing the tech team</p>
              </div>
            </div>
          </div>

      {/* Team Grid Section */}
      <div className="pb-[100px] px-5 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] md:gap-[60px]">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="flex flex-col group"
              >
                <div className="relative w-full aspect-square overflow-hidden mb-8 rounded-[2.5rem] shadow-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl ring-1 ring-slate-100">
                  {member.isSVG ? (
                    member.svg
                  ) : (
                    <Image
                      src={member.image!}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className="flex flex-col items-start px-2">
                  <h3 className="text-[32px] font-black mb-4 leading-tight text-navy tracking-tight">
                    {member.name}
                  </h3>
                  <div className="text-[17px] leading-[1.6] text-slate-600 font-medium">
                    {member.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
