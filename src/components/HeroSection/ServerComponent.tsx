import Image from "next/image"
export const heading1 = <>
<h1 className="font-heading mb-6">
                    Explore my awesome designs!
            </h1>
            <p className="text:[#4a4a4a] dark:text-[#ffffea] mb-12 max-w-lg">
                Life is so much better when it is filled with beauty, these digital products will help
                you be more organized, more focused, and surrounded with positive vibes!
                check em out!
            </p>
            <button className="btn-primary">
                Get Started
            </button>
            </>
export const section2 = <>
    <div className="md:grid hidden gap-8 grid-cols-1">
            <div className="rounded-2xl overflow-hidden h-48">
                <Image
                src={'/images/hero3.jpg'}
                alt={'image3'}
                width={600}
                height={300}
                className="scale-animation"
                />
            </div>
            <div className="grid grid-cols-2 gap-8 h-48">
                <div className="rounded-2xl overflow-hidden">
                <Image
                src={'/images/hero1.png'}
                alt={'image1'}
                width={300}
                height={300}
                className="scale-animation"
                />
                </div>
                <div className="rounded-2xl overflow-hidden">
                <Image
                src={'/images/hero2.jpg'}
                alt={'image2'}
                width={300}
                height={300}
                className="scale-animation"
                />
                </div>
            </div>
        </div></>