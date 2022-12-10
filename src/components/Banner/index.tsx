

interface BannerProps {
  position: string;
  img: string;
  textStrong: string,
  textThin: string,
}

export default function Banner ({ position, img, textStrong, textThin } : BannerProps) {

  return (
    <div 
      className={`flex items-center justify-center gap-4 my-10 
        ${position === 'left' ? 'sm:flex-row' : 
          position === 'right' ? 'sm:flex-row-reverse' :
          position === 'top' ? 'sm:flex-col' :
          position === 'bottom' ? 'sm:flex-col-reverse' : 'sm:flex-row'
        } flex-col`}>
      <img src={img} className="w-[250px] h-[300px]"/>
      <h1 className="text-left text-3xl"><span className="font-bold">{textStrong}</span> <br/><span className="font-thin">{textThin}</span></h1>
    </div> 
  )
  
  
}